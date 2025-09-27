# Pyth Entropy Migration Documentation

## Overview
This document tracks the migration from Yellow SDK VRF and Chainlink VRF to Pyth Entropy for random number generation in the APT Casino project.

## Migration Goals
- Remove all Yellow SDK VRF and Chainlink VRF dependencies
- Implement Pyth Entropy for provably fair random number generation
- Add Entropy Explorer transaction links to game results
- Maintain game functionality while improving randomness source

## Files to Remove
### VRF Services
- `src/services/VRFManagerService.js`
- `src/services/VRFStorageService.js`
- `src/services/VRFPregenerationService.js`
- `src/services/VRFLoggingService.js`
- `src/services/VRFErrorHandler.js`
- `src/services/VRFAutoRefillService.js`
- `src/services/ChainlinkVRFService.js`
- `src/services/VRFProofService.js`

### VRF Components
- `src/components/VRF/VRFStatusModal.js`
- `src/components/VRF/VRFProofRequiredModal.js`
- `src/components/VRF/VRFPregenerationModal.js`

### VRF Hooks
- `src/hooks/useVRFPregeneration.js`

### VRF Configuration
- `src/config/vrf.js`

### VRF API Routes
- `src/pages/api/vrf/`
- `src/app/api/vrf-log/route.js`

### VRF Scripts
- `scripts/` (all VRF-related scripts)

### VRF Contract
- `contracts/CasinoVRFConsumer.sol`

### Yellow Network Services
- `src/services/YellowNetworkService.js`
- `src/services/YellowCasinoService.js`
- `src/config/yellowCanaryChain.js`
- `src/config/yellowCanaryTokens.js`
- `src/config/arbitrumSepoliaConfig.js`

### Yellow Network Components
- `src/components/YellowNetwork/`
- `src/components/YellowNetworkStatus.jsx`
- `src/components/YellowNetworkBadge.jsx`

### Yellow Network Hooks
- `src/hooks/useYellowNetwork.js`

## Files to Create/Update
### Pyth Entropy Services
- `src/services/PythEntropyService.js` - Main Pyth Entropy integration
- `src/config/pythEntropy.js` - Pyth Entropy configuration
- `src/services/EntropyExplorerService.js` - Entropy Explorer integration

### Updated Game Processors
- Update all game processors to use Pyth Entropy instead of VRF
- Add Entropy Explorer transaction links to results

### Updated Game Components
- Update game components to show Entropy Explorer links
- Remove VRF status indicators

## Migration Steps
1. ✅ Analyze current VRF implementation
2. 🔄 Remove VRF-related files
3. ⏳ Implement Pyth Entropy service
4. ⏳ Update game contracts
5. ⏳ Update frontend components
6. ⏳ Add Entropy Explorer integration
7. ⏳ Update documentation

## Pyth Entropy Integration Details
- Use Pyth Entropy for all random number generation
- Support multiple EVM chains (Arbitrum, Base, etc.)
- Generate Entropy Explorer links for transparency
- Maintain provably fair gaming mechanics

## Testing
- Test all games with Pyth Entropy
- Verify Entropy Explorer links work correctly
- Ensure game results are deterministic and verifiable
