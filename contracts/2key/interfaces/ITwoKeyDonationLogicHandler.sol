pragma solidity ^0.4.24;

contract ITwoKeyDonationLogicHandler {
    function getReferrers(address customer) public view returns (address[]);

    function updateRefchainRewards(
        uint256 _maxReferralRewardETHWei,
        address _converter,
        uint _conversionId,
        uint totalBounty2keys
    )
    public;

    function getReferrerPlasmaTotalEarnings(address _referrer) public view returns (uint);
    function checkAllRequirementsForConversionAndTotalRaised(address converter, uint conversionAmount) external returns (bool);
}
