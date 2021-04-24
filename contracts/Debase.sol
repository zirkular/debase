// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

import "hardhat/console.sol";

contract Debase {

    struct Project {
        string name;
    }

    Project[] private projects;
    mapping(string => bool) projectNames;

    event ProjectAdded(address _from, Project value);
    
    function getProjects() public view returns(Project[] memory) {
        return projects;
    }

    function addProject(string memory _name) public {
        require(projectNames[_name] == false, "Project with that name already exists.");
        Project storage p = projects.push();
        p.name = _name;
        projectNames[_name] = true;

        emit ProjectAdded(msg.sender, p);
    }
}
