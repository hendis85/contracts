import '../../constants/polifils';
import {expect} from 'chai';
import availableUsers from "../../constants/availableUsers";
import {IPrivateMetaInformation} from "../../../src/acquisition/interfaces";


export default function checkCampaign(campaignParams, storage, userKey) {
  it('validate non singleton hash', async () => {
    const {protocol} = availableUsers[userKey];
    const {campaignAddress} = storage;
    const nonSingletonHash = await protocol.CampaignValidator.getCampaignNonSingletonsHash(
      campaignAddress
    );
    expect(nonSingletonHash).to.be.equal(protocol.AcquisitionCampaign.getNonSingletonsHash());
  });

  // campaignData.isFiatOnly === true
  // TODO: Recheck with Nicola, probably should be for two different test cases
  // why `1` ether?
  // when value > 0
  // when amount > 0
  if (campaignParams.isFiatOnly) {
    it('should reserve amount for fiat conversion rewards', async () => {
      const {protocol, web3: {address: from}} = availableUsers[userKey];
      const {campaignAddress} = storage;

      let value = parseFloat(protocol.Utils.toWei(1, 'ether').toString());
      let txHash = await protocol.AcquisitionCampaign.specifyFiatConversionRewards(
        campaignAddress,
        value,
        campaignParams.amount,
        from,
      );
      await protocol.Utils.getTransactionReceiptMined(txHash);
    }).timeout(60000);
  }

  it('check is campaign validated', async () => {
    const {protocol} = availableUsers[userKey];
    const {campaignAddress} = storage;

    const isValidated = await protocol.CampaignValidator.isCampaignValidated(campaignAddress);

    expect(isValidated).to.be.equal(true);
  }).timeout(60000);

  it('should get campaign public meta from IPFS', async () => {
    const {protocol, web3: {address: from}} = availableUsers[userKey];
    const {campaignAddress} = storage;

    const campaignMeta = await protocol.AcquisitionCampaign.getPublicMeta(campaignAddress, from);

    expect(campaignMeta.meta.assetContractERC20).to.be.equal(campaignParams.assetContractERC20);
  }).timeout(120000);

  it('should transfer assets to campaign', async () => {
    const {protocol, web3: {address: from}} = availableUsers[userKey];
    const {campaignAddress} = storage;

    const txHash = await protocol.transfer2KEYTokens(
      campaignAddress,
      protocol.Utils.toWei(campaignParams.campaignInventory, 'ether'),
      from,
    );
    await protocol.Utils.getTransactionReceiptMined(txHash);
    const balance = protocol.Utils.fromWei(
      await protocol.AcquisitionCampaign.checkInventoryBalance(campaignAddress, from)
    ).toString();

    expect(parseFloat(balance)).to.be.equal(campaignParams.campaignInventory);
  }).timeout(600000);


  it('should make campaign active', async () => {
    const {protocol, web3: {address: from}} = availableUsers[userKey];
    const {campaignAddress} = storage;

    const txHash = await protocol.AcquisitionCampaign.activateCampaign(campaignAddress, from);

    await protocol.Utils.getTransactionReceiptMined(txHash);

    const isActivated = await protocol.AcquisitionCampaign.isCampaignActivated(campaignAddress);

    expect(isActivated).to.be.equal(true);
  }).timeout(600000);

  it('should get campaign public link', async () => {
    const {protocol, web3: {address: from}} = availableUsers[userKey];
    const {campaignAddress} = storage;

    const publicLink = await protocol.AcquisitionCampaign.getPublicLinkKey(campaignAddress, from);

    expect(parseInt(publicLink, 16)).to.be.greaterThan(0);
  }).timeout(10000);

  it('should get and decrypt ipfs hash', async () => {
    const {protocol, web3: {address: from}} = availableUsers[userKey];
    const {campaignAddress, links: {[userKey]: {link}}} = storage;

    let data: IPrivateMetaInformation = await protocol.AcquisitionCampaign.getPrivateMetaHash(
      campaignAddress, from);

    expect(data.campaignPublicLinkKey).to.be.equal(link);
  }).timeout(120000);

  it('check available tokens', async () => {
    const {protocol, web3: {address: from}} = availableUsers[userKey];
    const {campaignAddress} = storage;

    const availableAmountOfTokens = await protocol.AcquisitionCampaign.getCurrentAvailableAmountOfTokens(campaignAddress, from);

    // TODO: when isFiatOnly=true return `1235666.6666666667` instead of 1234000. WHY?
    expect(availableAmountOfTokens).to.be
      .equal(campaignParams.campaignInventory - campaignParams.amount);
  }).timeout(60000);
}
