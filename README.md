# Administrative Scripts for SKALE

## Overview

This repo was created to address a limitation of utilizing multi-signature wallets in consistent scripting.
Due to the permissive nature of SKALE Chains, EOAs can be temporarily granted with rights in order to fire off complex 
scripts and then revoked afterwords.

## Available Scripts

### FileStorage

```bash
  npx hardhat fs-reserve --to <eth_address> --amount <num_megabytes> --network <network>
```

### Config Controller

** Note for both of this, manually add addresses to the **user list** variable found (here)[./tasks/config_controller/bulk_role.ts]

Bulk Role Assignment/Revoke

```bash
  npx hardhat add-deployer-role --network <network>
```

Bulk Role Removal
```bash
   npx hardhat revoke-deployer-role --network <network>
```
