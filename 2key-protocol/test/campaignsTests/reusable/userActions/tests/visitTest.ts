import functionParamsInterface from "../typings/functionParamsInterface";
import availableUsers from "../../../../constants/availableUsers";
import {expect} from "chai";

export default function visitTest(
  {
    storage,
    userKey,
    secondaryUserKey,
    campaignContract,
  }: functionParamsInterface,
) {
  it(`should visit campaign as ${userKey}`, async () => {
    const {web3: {address}} = availableUsers[secondaryUserKey];
    const {protocol} = availableUsers[userKey];
    const {campaignAddress, campaign: {contractor}} = storage;
    const referralUser = storage.getUser(secondaryUserKey);

    expect(referralUser.link).to.be.a('object');

    await protocol[campaignContract]
      .visit(campaignAddress, referralUser.link.link, referralUser.link.fSecret);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const linkOwnerAddress = await protocol.PlasmaEvents.getVisitedFrom(
      campaignAddress, contractor, protocol.plasmaAddress,
    );
    expect(linkOwnerAddress).to.be.eq(address);
  }).timeout(60000);
}
