import { Request, Response } from 'express';
import { erc721Approve, erc721MintBurn } from '../types';
import { erc_721 } from '../utils/contracts';
import getProvider from '../utils/getProvider';
import erc_721_abi from '../utils/abi/erc721';
import { AbiItem } from 'web3-utils';

const nftBytecode =
  '60806040523480156200001157600080fd5b506040518060400160405280600981526020017f54657374546f6b656e00000000000000000000000000000000000000000000008152506040518060400160405280600481526020017f546573740000000000000000000000000000000000000000000000000000000081525081600090816200008f919062000412565b508060019081620000a1919062000412565b505050620000c4620000b8620000ca60201b60201c565b620000d260201b60201c565b620004f9565b600033905090565b6000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200021a57607f821691505b60208210810362000230576200022f620001d2565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026200029a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200025b565b620002a686836200025b565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620002f3620002ed620002e784620002be565b620002c8565b620002be565b9050919050565b6000819050919050565b6200030f83620002d2565b620003276200031e82620002fa565b84845462000268565b825550505050565b600090565b6200033e6200032f565b6200034b81848462000304565b505050565b5b8181101562000373576200036760008262000334565b60018101905062000351565b5050565b601f821115620003c2576200038c8162000236565b62000397846200024b565b81016020851015620003a7578190505b620003bf620003b6856200024b565b83018262000350565b50505b505050565b600082821c905092915050565b6000620003e760001984600802620003c7565b1980831691505092915050565b6000620004028383620003d4565b9150826002028217905092915050565b6200041d8262000198565b67ffffffffffffffff811115620004395762000438620001a3565b5b62000445825462000201565b6200045282828562000377565b600060209050601f8311600181146200048a576000841562000475578287015190505b620004818582620003f4565b865550620004f1565b601f1984166200049a8662000236565b60005b82811015620004c4578489015182556001820191506020850194506020810190506200049d565b86831015620004e45784890151620004e0601f891682620003d4565b8355505b6001600288020188555050505b505050505050565b612a1480620005096000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c8063715018a6116100a2578063a22cb46511610071578063a22cb465146102cb578063b88d4fde146102e7578063c87b56dd14610303578063e985e9c514610333578063f2fde38b1461036357610116565b8063715018a6146102695780638da5cb5b1461027357806395d89b4114610291578063a1448194146102af57610116565b806323b872dd116100e957806323b872dd146101b557806342842e0e146101d157806342966c68146101ed5780636352211e1461020957806370a082311461023957610116565b806301ffc9a71461011b57806306fdde031461014b578063081812fc14610169578063095ea7b314610199575b600080fd5b61013560048036038101906101309190611c12565b61037f565b6040516101429190611c5a565b60405180910390f35b610153610461565b6040516101609190611d05565b60405180910390f35b610183600480360381019061017e9190611d5d565b6104f3565b6040516101909190611dcb565b60405180910390f35b6101b360048036038101906101ae9190611e12565b610539565b005b6101cf60048036038101906101ca9190611e52565b610650565b005b6101eb60048036038101906101e69190611e52565b6106b0565b005b61020760048036038101906102029190611d5d565b6106d0565b005b610223600480360381019061021e9190611d5d565b61072c565b6040516102309190611dcb565b60405180910390f35b610253600480360381019061024e9190611ea5565b6107b2565b6040516102609190611ee1565b60405180910390f35b610271610869565b005b61027b61087d565b6040516102889190611dcb565b60405180910390f35b6102996108a7565b6040516102a69190611d05565b60405180910390f35b6102c960048036038101906102c49190611e12565b610939565b005b6102e560048036038101906102e09190611f28565b61094f565b005b61030160048036038101906102fc919061209d565b610965565b005b61031d60048036038101906103189190611d5d565b6109c7565b60405161032a9190611d05565b60405180910390f35b61034d60048036038101906103489190612120565b610a2f565b60405161035a9190611c5a565b60405180910390f35b61037d60048036038101906103789190611ea5565b610ac3565b005b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061044a57507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b8061045a575061045982610b46565b5b9050919050565b6060600080546104709061218f565b80601f016020809104026020016040519081016040528092919081815260200182805461049c9061218f565b80156104e95780601f106104be576101008083540402835291602001916104e9565b820191906000526020600020905b8154815290600101906020018083116104cc57829003601f168201915b5050505050905090565b60006104fe82610bb0565b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006105448261072c565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036105b4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105ab90612232565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff166105d3610bfb565b73ffffffffffffffffffffffffffffffffffffffff1614806106025750610601816105fc610bfb565b610a2f565b5b610641576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610638906122c4565b60405180910390fd5b61064b8383610c03565b505050565b61066161065b610bfb565b82610cbc565b6106a0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161069790612356565b60405180910390fd5b6106ab838383610d51565b505050565b6106cb83838360405180602001604052806000815250610965565b505050565b6106e16106db610bfb565b82610cbc565b610720576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161071790612356565b60405180910390fd5b6107298161104a565b50565b60008061073883611198565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036107a9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107a0906123c2565b60405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610822576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161081990612454565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6108716111d5565b61087b6000611253565b565b6000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6060600180546108b69061218f565b80601f01602080910402602001604051908101604052809291908181526020018280546108e29061218f565b801561092f5780601f106109045761010080835404028352916020019161092f565b820191906000526020600020905b81548152906001019060200180831161091257829003601f168201915b5050505050905090565b6109416111d5565b61094b8282611319565b5050565b61096161095a610bfb565b8383611337565b5050565b610976610970610bfb565b83610cbc565b6109b5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109ac90612356565b60405180910390fd5b6109c1848484846114a3565b50505050565b60606109d282610bb0565b60006109dc6114ff565b905060008151116109fc5760405180602001604052806000815250610a27565b80610a0684611516565b604051602001610a179291906124b0565b6040516020818303038152906040525b915050919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b610acb6111d5565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610b3a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b3190612546565b60405180910390fd5b610b4381611253565b50565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b610bb9816115e4565b610bf8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bef906123c2565b60405180910390fd5b50565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16610c768361072c565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600080610cc88361072c565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480610d0a5750610d098185610a2f565b5b80610d4857508373ffffffffffffffffffffffffffffffffffffffff16610d30846104f3565b73ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff16610d718261072c565b73ffffffffffffffffffffffffffffffffffffffff1614610dc7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dbe906125d8565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610e36576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e2d9061266a565b60405180910390fd5b610e438383836001611625565b8273ffffffffffffffffffffffffffffffffffffffff16610e638261072c565b73ffffffffffffffffffffffffffffffffffffffff1614610eb9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610eb0906125d8565b60405180910390fd5b6004600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4611045838383600161162b565b505050565b60006110558261072c565b9050611065816000846001611625565b61106e8261072c565b90506004600083815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055506002600083815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905581600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a461119481600084600161162b565b5050565b60006002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6111dd610bfb565b73ffffffffffffffffffffffffffffffffffffffff166111fb61087d565b73ffffffffffffffffffffffffffffffffffffffff1614611251576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611248906126d6565b60405180910390fd5b565b6000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b611333828260405180602001604052806000815250611631565b5050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036113a5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161139c90612742565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516114969190611c5a565b60405180910390a3505050565b6114ae848484610d51565b6114ba8484848461168c565b6114f9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114f0906127d4565b60405180910390fd5b50505050565b606060405180602001604052806000815250905090565b60606000600161152584611813565b01905060008167ffffffffffffffff81111561154457611543611f72565b5b6040519080825280601f01601f1916602001820160405280156115765781602001600182028036833780820191505090505b509050600082602001820190505b6001156115d9578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a85816115cd576115cc6127f4565b5b04945060008503611584575b819350505050919050565b60008073ffffffffffffffffffffffffffffffffffffffff1661160683611198565b73ffffffffffffffffffffffffffffffffffffffff1614159050919050565b50505050565b50505050565b61163b8383611966565b611648600084848461168c565b611687576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161167e906127d4565b60405180910390fd5b505050565b60006116ad8473ffffffffffffffffffffffffffffffffffffffff16611b83565b15611806578373ffffffffffffffffffffffffffffffffffffffff1663150b7a026116d6610bfb565b8786866040518563ffffffff1660e01b81526004016116f89493929190612878565b6020604051808303816000875af192505050801561173457506040513d601f19601f8201168201806040525081019061173191906128d9565b60015b6117b6573d8060008114611764576040519150601f19603f3d011682016040523d82523d6000602084013e611769565b606091505b5060008151036117ae576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117a5906127d4565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161491505061180b565b600190505b949350505050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008310611871577a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008381611867576118666127f4565b5b0492506040810190505b6d04ee2d6d415b85acef810000000083106118ae576d04ee2d6d415b85acef810000000083816118a4576118a36127f4565b5b0492506020810190505b662386f26fc1000083106118dd57662386f26fc1000083816118d3576118d26127f4565b5b0492506010810190505b6305f5e1008310611906576305f5e10083816118fc576118fb6127f4565b5b0492506008810190505b612710831061192b576127108381611921576119206127f4565b5b0492506004810190505b6064831061194e5760648381611944576119436127f4565b5b0492506002810190505b600a831061195d576001810190505b80915050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036119d5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119cc90612952565b60405180910390fd5b6119de816115e4565b15611a1e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a15906129be565b60405180910390fd5b611a2c600083836001611625565b611a35816115e4565b15611a75576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a6c906129be565b60405180910390fd5b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4611b7f60008383600161162b565b5050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b611bef81611bba565b8114611bfa57600080fd5b50565b600081359050611c0c81611be6565b92915050565b600060208284031215611c2857611c27611bb0565b5b6000611c3684828501611bfd565b91505092915050565b60008115159050919050565b611c5481611c3f565b82525050565b6000602082019050611c6f6000830184611c4b565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611caf578082015181840152602081019050611c94565b60008484015250505050565b6000601f19601f8301169050919050565b6000611cd782611c75565b611ce18185611c80565b9350611cf1818560208601611c91565b611cfa81611cbb565b840191505092915050565b60006020820190508181036000830152611d1f8184611ccc565b905092915050565b6000819050919050565b611d3a81611d27565b8114611d4557600080fd5b50565b600081359050611d5781611d31565b92915050565b600060208284031215611d7357611d72611bb0565b5b6000611d8184828501611d48565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611db582611d8a565b9050919050565b611dc581611daa565b82525050565b6000602082019050611de06000830184611dbc565b92915050565b611def81611daa565b8114611dfa57600080fd5b50565b600081359050611e0c81611de6565b92915050565b60008060408385031215611e2957611e28611bb0565b5b6000611e3785828601611dfd565b9250506020611e4885828601611d48565b9150509250929050565b600080600060608486031215611e6b57611e6a611bb0565b5b6000611e7986828701611dfd565b9350506020611e8a86828701611dfd565b9250506040611e9b86828701611d48565b9150509250925092565b600060208284031215611ebb57611eba611bb0565b5b6000611ec984828501611dfd565b91505092915050565b611edb81611d27565b82525050565b6000602082019050611ef66000830184611ed2565b92915050565b611f0581611c3f565b8114611f1057600080fd5b50565b600081359050611f2281611efc565b92915050565b60008060408385031215611f3f57611f3e611bb0565b5b6000611f4d85828601611dfd565b9250506020611f5e85828601611f13565b9150509250929050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611faa82611cbb565b810181811067ffffffffffffffff82111715611fc957611fc8611f72565b5b80604052505050565b6000611fdc611ba6565b9050611fe88282611fa1565b919050565b600067ffffffffffffffff82111561200857612007611f72565b5b61201182611cbb565b9050602081019050919050565b82818337600083830152505050565b600061204061203b84611fed565b611fd2565b90508281526020810184848401111561205c5761205b611f6d565b5b61206784828561201e565b509392505050565b600082601f83011261208457612083611f68565b5b813561209484826020860161202d565b91505092915050565b600080600080608085870312156120b7576120b6611bb0565b5b60006120c587828801611dfd565b94505060206120d687828801611dfd565b93505060406120e787828801611d48565b925050606085013567ffffffffffffffff81111561210857612107611bb5565b5b6121148782880161206f565b91505092959194509250565b6000806040838503121561213757612136611bb0565b5b600061214585828601611dfd565b925050602061215685828601611dfd565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806121a757607f821691505b6020821081036121ba576121b9612160565b5b50919050565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b600061221c602183611c80565b9150612227826121c0565b604082019050919050565b6000602082019050818103600083015261224b8161220f565b9050919050565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60008201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c000000602082015250565b60006122ae603d83611c80565b91506122b982612252565b604082019050919050565b600060208201905081810360008301526122dd816122a1565b9050919050565b7f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560008201527f72206f7220617070726f76656400000000000000000000000000000000000000602082015250565b6000612340602d83611c80565b915061234b826122e4565b604082019050919050565b6000602082019050818103600083015261236f81612333565b9050919050565b7f4552433732313a20696e76616c696420746f6b656e2049440000000000000000600082015250565b60006123ac601883611c80565b91506123b782612376565b602082019050919050565b600060208201905081810360008301526123db8161239f565b9050919050565b7f4552433732313a2061646472657373207a65726f206973206e6f74206120766160008201527f6c6964206f776e65720000000000000000000000000000000000000000000000602082015250565b600061243e602983611c80565b9150612449826123e2565b604082019050919050565b6000602082019050818103600083015261246d81612431565b9050919050565b600081905092915050565b600061248a82611c75565b6124948185612474565b93506124a4818560208601611c91565b80840191505092915050565b60006124bc828561247f565b91506124c8828461247f565b91508190509392505050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000612530602683611c80565b915061253b826124d4565b604082019050919050565b6000602082019050818103600083015261255f81612523565b9050919050565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b60006125c2602583611c80565b91506125cd82612566565b604082019050919050565b600060208201905081810360008301526125f1816125b5565b9050919050565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b6000612654602483611c80565b915061265f826125f8565b604082019050919050565b6000602082019050818103600083015261268381612647565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60006126c0602083611c80565b91506126cb8261268a565b602082019050919050565b600060208201905081810360008301526126ef816126b3565b9050919050565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b600061272c601983611c80565b9150612737826126f6565b602082019050919050565b6000602082019050818103600083015261275b8161271f565b9050919050565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b60006127be603283611c80565b91506127c982612762565b604082019050919050565b600060208201905081810360008301526127ed816127b1565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600081519050919050565b600082825260208201905092915050565b600061284a82612823565b612854818561282e565b9350612864818560208601611c91565b61286d81611cbb565b840191505092915050565b600060808201905061288d6000830187611dbc565b61289a6020830186611dbc565b6128a76040830185611ed2565b81810360608301526128b9818461283f565b905095945050505050565b6000815190506128d381611be6565b92915050565b6000602082840312156128ef576128ee611bb0565b5b60006128fd848285016128c4565b91505092915050565b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b600061293c602083611c80565b915061294782612906565b602082019050919050565b6000602082019050818103600083015261296b8161292f565b9050919050565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b60006129a8601c83611c80565b91506129b382612972565b602082019050919050565b600060208201905081810360008301526129d78161299b565b905091905056fea26469706673582212203bc843a1a5cde87aab470a8df86287147768b8b4d2ed9fc51a0e76478e6f6e1b64736f6c63430008120033';

export const approve721 = async (req: Request, res: Response) => {
  try {
    const request: erc721Approve = req.body;
    const provider = getProvider();
    const contract = erc_721(request.nftAddress, provider);
    const accounts = await provider.eth.getAccounts();
    const account = request.accountIndex
      ? accounts[request.accountIndex]
      : request.from;
    const txReceipt = !request.all
      ? await contract.methods
          .approve(accounts[request.to], request.tokenId)
          .send({ from: account, gasLimit: 500000 })
      : await contract.methods
          .setApprovalForAll(accounts[request.to], true)
          .send({ from: account, gasLimit: 500000 });
    res.status(200).json({ block: txReceipt['blockNumber'] }).send();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        message: 'Internal server error',
        error: String(err),
      })
      .send();
  }
};

export const transfer721 = async (req: Request, res: Response) => {
  try {
    const request: erc721Approve = req.body;
    const provider = getProvider();
    const contract = erc_721(request.nftAddress, provider);
    const accounts = await provider.eth.getAccounts();
    const account = request.accountIndex
      ? accounts[request.accountIndex]
      : request.from;
    const txReceipt = await contract.methods
      .safeTransferFrom(account, accounts[request.to], request.tokenId)
      .send({ from: account, gasLimit: 500000 });
    res.status(200).json({ block: txReceipt['blockNumber'] }).send();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        message: 'Internal server error',
        error: String(err),
      })
      .send();
  }
};

export const deploy721 = async (req: Request, res: Response) => {
  try {
    const provider = getProvider();
    const contract = new provider.eth.Contract(erc_721_abi as AbiItem[]);
    const account = (await provider.eth.getAccounts())[0];
    await contract
      .deploy({ data: nftBytecode })
      .send({ from: account, gas: 3454486 })
      .on('receipt', function (receipt) {
        res
          .status(200)
          .json({ contractAddress: receipt.contractAddress })
          .send();
      });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        message: 'Internal server error',
        error: String(err),
      })
      .send();
  }
};

export const mintBurn721 = async (req: Request, res: Response) => {
  try {
    const request: erc721MintBurn = req.body;
    const provider = getProvider();
    const contract = erc_721(request.nftAddress, provider);
    const accounts = await provider.eth.getAccounts();

    const tx = request.mint
      ? await contract.methods.safeMint(accounts[request.to], request.tokenId)
      : await contract.methods.burn(request.tokenId);
    const txReceipt = tx.send({ from: accounts[0], gas: 500000 });

    res.status(200).json({ block: txReceipt['blockNumber'] }).send();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        message: 'Internal server error',
        error: String(err),
      })
      .send();
  }
};
