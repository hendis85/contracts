pragma solidity ^0.4.24;

import "../libraries/SafeERC20.sol";

contract IKyberNetworkProxy {
    function swapEtherToToken(ERC20 token, uint minConversionRate) external payable returns(uint);
    function getExpectedRate(ERC20 src, ERC20 dest, uint srcQty) external view
    returns (uint expectedRate, uint slippageRate);
}
