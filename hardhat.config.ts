import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';
import "./tasks/reserve_space";

dotenv.config();



const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    testnet: {
        accounts: [(process.env.PRIVATE_KEY) as string],
        url: "https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar"
    }
  }
};

export default config;
