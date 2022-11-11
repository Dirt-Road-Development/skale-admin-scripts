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

Bulk Role Assignment/Revoke

```bash
  npx hardhat cc-bulk-role-add --userList <key> --network <network>
```

Bulk Role Removal
```bash
   npx hardhat cc-bulk-role-remove --userList <key>  --network <network>
```
