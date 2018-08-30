/* GENERATED BY TYPECHAIN VER. 0.2.7 */
/* tslint:disable */

import { BigNumber } from "bignumber.js";
import * as TC from "./typechain-runtime";

export class TwoKeyCampaign extends TC.TypeChainContract {
  public readonly rawWeb3Contract: any;

  public constructor(web3: any, address: string | BigNumber) {
    const abi = [
      {
        constant: false,
        inputs: [
          { name: "_spender", type: "address" },
          { name: "_value", type: "uint256" }
        ],
        name: "approve",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_to", type: "address" },
          { name: "_value", type: "uint256" }
        ],
        name: "transferQuota",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_from", type: "address" },
          { name: "_to", type: "address" },
          { name: "_value", type: "uint256" }
        ],
        name: "transferFrom",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "", type: "address" }],
        name: "received_from",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_from", type: "address" },
          { name: "_to", type: "address" },
          { name: "_value", type: "uint256" }
        ],
        name: "transferFromQuota",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_from", type: "address" },
          { name: "_maxReward", type: "uint256" }
        ],
        name: "transferRewardsTwoKeyToken",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_spender", type: "address" },
          { name: "_subtractedValue", type: "uint256" }
        ],
        name: "decreaseApproval",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_to", type: "address" },
          { name: "_value", type: "uint256" }
        ],
        name: "transfer",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "quota",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_spender", type: "address" },
          { name: "_addedValue", type: "uint256" }
        ],
        name: "increaseApproval",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [
          { name: "_owner", type: "address" },
          { name: "_spender", type: "address" }
        ],
        name: "allowance",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "", type: "address" }],
        name: "conversions",
        outputs: [
          { name: "from", type: "address" },
          { name: "payout", type: "uint256" },
          { name: "converter", type: "address" },
          { name: "isFulfilled", type: "bool" },
          { name: "isCancelled", type: "bool" },
          { name: "tokenID", type: "uint256" },
          { name: "assetContract", type: "address" },
          { name: "indexOrAmount", type: "uint256" },
          { name: "campaignType", type: "uint8" },
          { name: "openingTime", type: "uint256" },
          { name: "closingTime", type: "uint256" }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          { name: "_eventSource", type: "address" },
          { name: "_economy", type: "address" },
          { name: "_whitelistInfluencer", type: "address" },
          { name: "_whitelistConverter", type: "address" },
          { name: "_twoKeyCampaignInventory", type: "address" },
          { name: "_contractor", type: "address" },
          { name: "_moderator", type: "address" },
          { name: "_openingTime", type: "uint256" },
          { name: "_closingTime", type: "uint256" },
          { name: "_expiryConversion", type: "uint256" },
          { name: "_escrowPercentage", type: "uint256" },
          { name: "_rate", type: "uint256" },
          { name: "_maxPi", type: "uint256" }
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "owner", type: "address" },
          { indexed: true, name: "spender", type: "address" },
          { indexed: false, name: "value", type: "uint256" }
        ],
        name: "Approval",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "from", type: "address" },
          { indexed: true, name: "to", type: "address" },
          { indexed: false, name: "value", type: "uint256" }
        ],
        name: "Transfer",
        type: "event"
      },
      {
        constant: false,
        inputs: [],
        name: "addAdminRolesAndBalancesAfterDeployed",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_tokenID", type: "uint256" },
          { name: "_assetContract", type: "address" },
          { name: "_assetTokenIDOrAmount", type: "uint256" },
          { name: "_type", type: "uint8" }
        ],
        name: "transferAssetTwoKeyToken",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_converter", type: "address" },
          { name: "_tokenID", type: "uint256" },
          { name: "_assetContract", type: "address" },
          { name: "_assetTokenIDOrAmount", type: "uint256" },
          { name: "_type", type: "uint8" }
        ],
        name: "cancelAssetTwoKey",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_converter", type: "address" },
          { name: "_tokenID", type: "uint256" },
          { name: "_assetContract", type: "address" },
          { name: "_assetTokenIDOrAmount", type: "uint256" },
          { name: "_type", type: "uint8" }
        ],
        name: "expireEscrow",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_tokenID", type: "uint256" },
          { name: "_assetContract", type: "address" },
          { name: "_pricePerUnit", type: "uint256" }
        ],
        name: "setPriceFungible",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_tokenID", type: "uint256" },
          { name: "_assetContract", type: "address" },
          { name: "_index", type: "uint256" },
          { name: "_pricePerUnit", type: "uint256" }
        ],
        name: "setPriceNonFungible",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [{ name: "_amount", type: "uint256" }],
        name: "redeemTwoKeyToken",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_from", type: "address" },
          { name: "_tokenID", type: "uint256" },
          { name: "_assetContract", type: "address" },
          { name: "_amountOrIndex", type: "uint256" },
          { name: "_campaignType", type: "uint8" }
        ],
        name: "buyFromWithTwoKey",
        outputs: [],
        payable: true,
        stateMutability: "payable",
        type: "function"
      }
    ];
    super(web3, address, abi);
  }

  static async createAndValidate(
    web3: any,
    address: string | BigNumber
  ): Promise<TwoKeyCampaign> {
    const contract = new TwoKeyCampaign(web3, address);
    const code = await TC.promisify(web3.eth.getCode, [address]);

    // in case of missing smartcontract, code can be equal to "0x0" or "0x" depending on exact web3 implementation
    // to cover all these cases we just check against the source code length — there won't be any meaningful EVM program in less then 3 chars
    if (code.length < 4) {
      throw new Error(`Contract at ${address} doesn't exist!`);
    }
    return contract;
  }

  public get totalSupply(): Promise<BigNumber> {
    return TC.promisify(this.rawWeb3Contract.totalSupply, []);
  }

  public get quota(): Promise<BigNumber> {
    return TC.promisify(this.rawWeb3Contract.quota, []);
  }

  public received_from(arg0: BigNumber | string): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.received_from, [arg0.toString()]);
  }

  public balanceOf(_owner: BigNumber | string): Promise<BigNumber> {
    return TC.promisify(this.rawWeb3Contract.balanceOf, [_owner.toString()]);
  }

  public allowance(
    _owner: BigNumber | string,
    _spender: BigNumber | string
  ): Promise<BigNumber> {
    return TC.promisify(this.rawWeb3Contract.allowance, [
      _owner.toString(),
      _spender.toString()
    ]);
  }

  public conversions(
    arg0: BigNumber | string
  ): Promise<
    [
      string,
      BigNumber,
      string,
      boolean,
      boolean,
      BigNumber,
      string,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber
    ]
  > {
    return TC.promisify(this.rawWeb3Contract.conversions, [arg0.toString()]);
  }

  public approveTx(
    _spender: BigNumber | string,
    _value: BigNumber | number
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(this, "approve", [
      _spender.toString(),
      _value.toString()
    ]);
  }
  public transferQuotaTx(
    _to: BigNumber | string,
    _value: BigNumber | number
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "transferQuota",
      [_to.toString(), _value.toString()]
    );
  }
  public transferFromTx(
    _from: BigNumber | string,
    _to: BigNumber | string,
    _value: BigNumber | number
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "transferFrom",
      [_from.toString(), _to.toString(), _value.toString()]
    );
  }
  public transferFromQuotaTx(
    _from: BigNumber | string,
    _to: BigNumber | string,
    _value: BigNumber | number
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "transferFromQuota",
      [_from.toString(), _to.toString(), _value.toString()]
    );
  }
  public transferRewardsTwoKeyTokenTx(
    _from: BigNumber | string,
    _maxReward: BigNumber | number
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "transferRewardsTwoKeyToken",
      [_from.toString(), _maxReward.toString()]
    );
  }
  public decreaseApprovalTx(
    _spender: BigNumber | string,
    _subtractedValue: BigNumber | number
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "decreaseApproval",
      [_spender.toString(), _subtractedValue.toString()]
    );
  }
  public transferTx(
    _to: BigNumber | string,
    _value: BigNumber | number
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(this, "transfer", [
      _to.toString(),
      _value.toString()
    ]);
  }
  public increaseApprovalTx(
    _spender: BigNumber | string,
    _addedValue: BigNumber | number
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "increaseApproval",
      [_spender.toString(), _addedValue.toString()]
    );
  }
  public addAdminRolesAndBalancesAfterDeployedTx(): TC.DeferredTransactionWrapper<
    TC.ITxParams
  > {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "addAdminRolesAndBalancesAfterDeployed",
      []
    );
  }
  public transferAssetTwoKeyTokenTx(
    _tokenID: BigNumber | number,
    _assetContract: BigNumber | string,
    _assetTokenIDOrAmount: BigNumber | number,
    _type: BigNumber | number
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "transferAssetTwoKeyToken",
      [
        _tokenID.toString(),
        _assetContract.toString(),
        _assetTokenIDOrAmount.toString(),
        _type.toString()
      ]
    );
  }
  public cancelAssetTwoKeyTx(
    _converter: BigNumber | string,
    _tokenID: BigNumber | number,
    _assetContract: BigNumber | string,
    _assetTokenIDOrAmount: BigNumber | number,
    _type: BigNumber | number
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "cancelAssetTwoKey",
      [
        _converter.toString(),
        _tokenID.toString(),
        _assetContract.toString(),
        _assetTokenIDOrAmount.toString(),
        _type.toString()
      ]
    );
  }
  public expireEscrowTx(
    _converter: BigNumber | string,
    _tokenID: BigNumber | number,
    _assetContract: BigNumber | string,
    _assetTokenIDOrAmount: BigNumber | number,
    _type: BigNumber | number
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "expireEscrow",
      [
        _converter.toString(),
        _tokenID.toString(),
        _assetContract.toString(),
        _assetTokenIDOrAmount.toString(),
        _type.toString()
      ]
    );
  }
  public setPriceFungibleTx(
    _tokenID: BigNumber | number,
    _assetContract: BigNumber | string,
    _pricePerUnit: BigNumber | number
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "setPriceFungible",
      [_tokenID.toString(), _assetContract.toString(), _pricePerUnit.toString()]
    );
  }
  public setPriceNonFungibleTx(
    _tokenID: BigNumber | number,
    _assetContract: BigNumber | string,
    _index: BigNumber | number,
    _pricePerUnit: BigNumber | number
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "setPriceNonFungible",
      [
        _tokenID.toString(),
        _assetContract.toString(),
        _index.toString(),
        _pricePerUnit.toString()
      ]
    );
  }
  public redeemTwoKeyTokenTx(
    _amount: BigNumber | number
  ): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(
      this,
      "redeemTwoKeyToken",
      [_amount.toString()]
    );
  }
  public buyFromWithTwoKeyTx(
    _from: BigNumber | string,
    _tokenID: BigNumber | number,
    _assetContract: BigNumber | string,
    _amountOrIndex: BigNumber | number,
    _campaignType: BigNumber | number
  ): TC.DeferredTransactionWrapper<TC.IPayableTxParams> {
    return new TC.DeferredTransactionWrapper<TC.IPayableTxParams>(
      this,
      "buyFromWithTwoKey",
      [
        _from.toString(),
        _tokenID.toString(),
        _assetContract.toString(),
        _amountOrIndex.toString(),
        _campaignType.toString()
      ]
    );
  }

  public ApprovalEvent(eventFilter: {
    owner?: BigNumber | string | Array<BigNumber | string>;
    spender?: BigNumber | string | Array<BigNumber | string>;
  }): TC.DeferredEventWrapper<
    {
      owner: BigNumber | string;
      spender: BigNumber | string;
      value: BigNumber | number;
    },
    {
      owner?: BigNumber | string | Array<BigNumber | string>;
      spender?: BigNumber | string | Array<BigNumber | string>;
    }
  > {
    return new TC.DeferredEventWrapper<
      {
        owner: BigNumber | string;
        spender: BigNumber | string;
        value: BigNumber | number;
      },
      {
        owner?: BigNumber | string | Array<BigNumber | string>;
        spender?: BigNumber | string | Array<BigNumber | string>;
      }
    >(this, "Approval", eventFilter);
  }
  public TransferEvent(eventFilter: {
    from?: BigNumber | string | Array<BigNumber | string>;
    to?: BigNumber | string | Array<BigNumber | string>;
  }): TC.DeferredEventWrapper<
    {
      from: BigNumber | string;
      to: BigNumber | string;
      value: BigNumber | number;
    },
    {
      from?: BigNumber | string | Array<BigNumber | string>;
      to?: BigNumber | string | Array<BigNumber | string>;
    }
  > {
    return new TC.DeferredEventWrapper<
      {
        from: BigNumber | string;
        to: BigNumber | string;
        value: BigNumber | number;
      },
      {
        from?: BigNumber | string | Array<BigNumber | string>;
        to?: BigNumber | string | Array<BigNumber | string>;
      }
    >(this, "Transfer", eventFilter);
  }
}
