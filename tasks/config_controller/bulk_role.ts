import { task } from "hardhat/config";
import ConfigControllerAbi from '../../configController.abi.json';
import Addresses from '../../addresses.json';

task('gas', "Give gas")
    .setAction(async(taskArgs: any, { ethers }) => {
        const users: string[] = [];

        const [ signer ] = await ethers.getSigners();

        for (const user of users) {
            await signer.sendTransaction({
                to: user,
                value: ethers.utils.parseEther("0.005")
            });
        }
    })

task("add-deployer-role", "Add All Users to the following role on CC")
    .setAction(async(taskArgs: any, { ethers }) => {
    
        const addresses: string[] = [];

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

task("revoke-deployer-role", "Remove All Users to the following role on CC")
    .setAction(async(taskArgs: any, { ethers, userConfig }) => {
    
        const addresses: string[] = [];

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

