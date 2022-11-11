import { task } from "hardhat/config";
import ConfigControllerAbi from '../../configController.abi.json';
import Addresses from '../../addresses.json';
import UserList from '../../user_list.json';

import { BigNumber } from 'ethers';

task("cc-bulk-role-add", "Add All Users to the following role on CC")
    .addParam("userList", "Path to the file with an array of addresses")
    .setAction(async(taskArgs: any, { ethers, userConfig }) => {
    
        const keys: string[] = Object.keys(UserList);

        if (!keys.includes(taskArgs.userList)) throw new Error("Invalid User List");
        
        const addresses: string[] = (UserList as any)[taskArgs.userList];

        const [ signer ] = await ethers.getSigners();
       
        const contract = new ethers.Contract(Addresses.configController,ConfigControllerAbi, signer);

        const DEPLOYER_ROLE: string = ethers.utils.id('DEPLOYER_ROLE');
        
        for (const userAddress of addresses) {
            
            if (ethers.utils.isAddress(userAddress)) {
                if (!(await contract.callStatic.hasRole(DEPLOYER_ROLE, userAddress))) {
                    const res = await contract.grantRole(DEPLOYER_ROLE, userAddress);
                    if (res.wait('ok')) {
                        await signer.sendTransaction({
                            to: userAddress,
                            value: ethers.utils.parseEther("0.005")
                        })
                    }
                }
            }

        }
    })

task("cc-bulk-role-revoke", "Remove All Users to the following role on CC")
    .addParam("userList", "Path to the file with an array of addresses")
    .setAction(async(taskArgs: any, { ethers, userConfig }) => {
    
        const keys: string[] = Object.keys(UserList);

        if (!keys.includes(taskArgs.userList)) throw new Error("Invalid User List");
        
        const addresses: string[] = (UserList as any)[taskArgs.userList];

        const [ signer ] = await ethers.getSigners();
       
        const contract = new ethers.Contract(Addresses.configController,ConfigControllerAbi, signer);

        const DEPLOYER_ROLE: string = ethers.utils.id('DEPLOYER_ROLE');
        
        for (const userAddress of addresses) {
            
            if (ethers.utils.isAddress(userAddress)) {
                if ((await contract.callStatic.hasRole(DEPLOYER_ROLE, userAddress))) {
                    const res = await contract.revokeRole(DEPLOYER_ROLE, userAddress);
                }
            }

        }
    })

