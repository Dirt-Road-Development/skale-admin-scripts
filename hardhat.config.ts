import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';
import "./tasks/filestorage/reserve_space";
import "./tasks/config_controller/bulk_role";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    "calypso-staging-v2": {
        accounts: [(process.env.PRIVATE_KEY) as string],
        url: "https://staging-v2.skalenodes.com/v1/actual-secret-cebalrai"
    },
    "calypso-staging-v3": {
        accounts: [(process.env.PRIVATE_KEY) as string],
        url: "https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar"
    },
    "calypso-mainnet": {
        accounts: [(process.env.PRIVATE_KEY) as string],
        url: "https://mainnet.skalenodes.com/v1/honorable-steel-rasalhague"
    }
  }
};

export default config;
