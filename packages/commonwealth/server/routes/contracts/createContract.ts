import type { ContractType } from 'common-common/src/types';
import { AppError } from 'common-common/src/errors';
import type { DB } from '../../models';
import type {
  ContractAttributes,
  ContractInstance,
} from '../../models/contract';
import type { ChainNodeAttributes } from '../../models/chain_node';
import type { TypedRequestBody, TypedResponse } from '../../types';
import { success } from '../../types';
import validateAbi from '../../util/abiValidation';
import type { ContractAbiInstance } from 'server/models/contract_abi';
import validateRoles from '../../util/validateRoles';

export const Errors = {
  NoType: 'Must provide contract type',
  NoBase: 'Must provide chain base',
  NoNodeUrl: 'Must provide node url',
  InvalidAddress: 'Address is invalid',
  InvalidNodeUrl: 'Node url must begin with http://, https://, ws://, wss://',
  InvalidNode: 'Node url returned invalid response',
  InvalidABI: 'Invalid ABI passed in',
  NoAbiNickname: 'Must provide ABI nickname',
  MustBeWs: 'Node must support websockets on ethereum',
  InvalidBalanceType: 'Must provide balance type',
  InvalidChainId: 'Ethereum chain ID not provided or unsupported',
  InvalidChainIdOrUrl:
    'Could not determine a valid endpoint for provided chain',
  InvalidDecimal: 'Invalid decimal',
  ContractAddressExists: 'The address already exists',
  ChainIDExists:
    'The id for this chain already exists, please choose another id',
  ChainNameExists:
    'The name for this chain already exists, please choose another name',
  NotAdmin: 'Must be admin',
};

export type CreateContractReq = ContractAttributes &
  Omit<ChainNodeAttributes, 'id'> & {
    address: string;
    abi?: string;
    abiNickname?: string;
    contractType: ContractType;
    chain_id: string;
  };

export type CreateContractResp = {
  contract: ContractAttributes;
};

// TODO what about those fields:
// - community
// - contractType
// - symbol
// - token_name
// - decimals
// - balance_type
// 1. There are not required in model but there is a validation against those fields
// 2. Also null/undefined values are not allowed when calling Contract.findOrCreate and CommunityContract.create
// For now I commented out validation and added default values to not break things but should we retrieve those info from the app
// and send them to the backend or this "createContract" function should be changed to omit those values?

const createContract = async (
  models: DB,
  req: TypedRequestBody<CreateContractReq>,
  res: TypedResponse<CreateContractResp>
) => {
  const {
    address,
    contractType = '',
    abi,
    abiNickname,
    balance_type,
    eth_chain_id = 1,
    symbol = '',
    token_name = '',
    decimals = 0,
    chain_node_id,
    chain_id,
  } = req.body;

  if (!req.user) {
    throw new AppError('Not logged in');
  }

  const isAdmin = await validateRoles(models, req.user, 'admin', chain_id);
  if (!isAdmin) throw new AppError('Must be admin');

  const Web3 = (await import('web3-utils')).default;
  if (!Web3.isAddress(address)) {
    throw new AppError(Errors.InvalidAddress);
  }

  if (!chain_node_id) {
    throw new AppError(Errors.NoNodeUrl);
  }

  let abiAsRecord: Array<Record<string, unknown>>;
  if (abi) {
    if ((Object.keys(abi) as Array<string>).length === 0) {
      throw new AppError(Errors.InvalidABI);
    }

    abiAsRecord = validateAbi(abi);
  }

  const oldContract = await models.Contract.findOne({
    where: { address },
  });

  if (oldContract && oldContract.address === address) {
    // contract already exists so attempt to add it to the community if it's not already there
    await models.CommunityContract.findOrCreate({
      where: {
        chain_id,
        contract_id: oldContract.id,
      },
    });
    return success(res, { contract: oldContract.toJSON() });
  }

  // override provided URL for eth chains (typically ERC20) with stored, unless none found
  const node = await models.ChainNode.findOne({
    where: {
      eth_chain_id,
    },
  });

  if (!node) {
    throw new AppError(Errors.InvalidNodeUrl);
  }

  let contract: ContractInstance;
  let contract_abi: ContractAbiInstance;
  if (abi) {
    // transactionalize contract creation
    await models.sequelize.transaction(async (t) => {
      contract_abi = await models.ContractAbi.findOne({
        where: {
          abi: JSON.stringify(abiAsRecord),
        },
        transaction: t,
      });

      if (!contract_abi) {
        contract_abi = await models.ContractAbi.create(
          {
            abi: JSON.stringify(abiAsRecord),
          },
          { transaction: t }
        );
      }

      [contract] = await models.Contract.findOrCreate({
        where: {
          address,
          chain_node_id: node.id,
          token_name,
          abi_id: contract_abi.id,
          symbol,
          decimals,
          type: contractType,
        },
        transaction: t,
      });

      await models.CommunityContract.create(
        {
          chain_id,
          contract_id: contract.id,
        },
        { transaction: t }
      );
    });
    return success(res, { contract: contract.toJSON() });
  } else {
    // transactionalize contract creation
    await models.sequelize.transaction(async (t) => {
      [contract] = await models.Contract.findOrCreate({
        where: {
          address,
          token_name,
          symbol,
          decimals,
          type: contractType,
          chain_node_id: node.id,
        },
        transaction: t,
      });
      await models.CommunityContract.create(
        {
          chain_id,
          contract_id: contract.id,
        },
        { transaction: t }
      );
    });
    return success(res, { contract: contract.toJSON() });
  }
};

export default createContract;
