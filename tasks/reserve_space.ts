import { task } from "hardhat/config";
import FileStorageAbi from '../fs.abi.json';
import { BigNumber } from 'ethers';

task("reserve", "Reserve Space in File Storage")
    .addParam("to", "The Address Receving the Space")
    .addParam("amount", "The amount of megabytes of space to reserve them")
    .setAction(async(taskArgs: any, { ethers, userConfig }) => {
        // console.log(1);
        // // console.log(1);

        const [ signer ] = await ethers.getSigners();
        
        const fs = new ethers.Contract("0xD3002000000000000000000000000000000000d3", FileStorageAbi, signer);
        
        const ALLOCATOR_ROLE: string = ethers.utils.id("ALLOCATOR_ROLE");
        
        const hasRole: boolean = await fs.callStatic.hasRole(ALLOCATOR_ROLE, signer.address);

        if (!hasRole) {
            throw new Error("You should have the ALLOCATOR_ROLE to call this task");
        }

        const to: string = taskArgs.to;

        if (!ethers.utils.isAddress(to)) {
            throw new Error("To is not a valid eth address");
        }
        
        const MEGABYTE: BigNumber = ethers.BigNumber.from(2).pow(ethers.BigNumber.from(20))
        
        const amount: number = Number(taskArgs.amount);

        const currentReservedAmount: BigNumber = await fs.callStatic.getOccupiedSpace(to);

        const total: BigNumber = (BigNumber.from(amount).mul(MEGABYTE)).add(currentReservedAmount);

        const reserveResult = await fs.reserveSpace(to, total);
        
        const res = await reserveResult.wait("ok");

        console.log("RES: ", res);
    })

