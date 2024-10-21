// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;


contract Drive {

    struct Access {
        address user;
        bool access;
    }

    mapping (address => string[]) value;
    mapping (address => Access[]) accessList; 
    mapping (address => mapping (address => bool)) ownership;
    mapping (address => mapping (address => bool)) prevData;

    function add (address _user, string memory url) external {
        value[_user].push(url);
    }

    function allow (address user) external {
        ownership[msg.sender][user] = true;
        if(prevData[msg.sender][user]){
            
            for(uint i =0; i<accessList[msg.sender].length; i++){
                if(accessList[msg.sender][i].user == user){
                    accessList[msg.sender][i].access = true;
                }
            }
        }else{
            accessList[msg.sender].push(Access(user, true));
            prevData[msg.sender][user] = true;
        }
    }


    function disAllow(address user ) public  {
        ownership[msg.sender][user] =false;
        for(uint i =0; i<accessList[msg.sender].length; i++){
            if(accessList[msg.sender][i].user == user){
                accessList[msg.sender][i].access = false;
            }
        }
    }

    function display(address _user) external view returns (string[] memory){
        require(msg.sender == _user || ownership[_user][msg.sender], "You Don't Access");
        return value[_user];
    }

    function shareAccess() public  view returns (Access[] memory){
        return accessList[msg.sender];
    }


}
