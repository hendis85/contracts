/**
 * Interface to represent all the methods from the airdrop campaign
 */
export interface ITwoKeyAirDropCampaign {

}

/**
 * Interface to represent constructor of the AirDrop Campaign
 */
export interface IAirDropCampaignConstructor {
    inventoryAmount: number,
    erc20ContractAddress: string,
    campaignStartTime: number,
    campaignEndTime: number,
    numberOfTokensPerConverterAndReferralChain: number
}