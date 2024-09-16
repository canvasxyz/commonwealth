import { commonProtocol } from '@hicommonwealth/shared';
import { useMutation } from '@tanstack/react-query';
import LaunchpadBondingCurve from 'helpers/ContractHelpers/Launchpad';

interface LaunchTokenProps {
  chainRpc: string;
  ethChainId: number;
  name: string;
  symbol: string;
  walletAddress: string;
}

const launchToken = async ({
  ethChainId,
  chainRpc,
  name,
  symbol,
  walletAddress,
}: LaunchTokenProps) => {
  const launchPad = new LaunchpadBondingCurve(
    '',
    commonProtocol.factoryContracts[ethChainId].factory,
    chainRpc,
  );

  return await launchPad.launchToken(name, symbol, walletAddress);
};

const useLaunchTokenMutation = () => {
  return useMutation({
    mutationFn: launchToken,
  });
};

export default useLaunchTokenMutation;
