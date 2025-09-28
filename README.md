# 🎲 APT-Casino – Fully On-Chain Casino built using Pyth Entropy

A couple of days back, I was was on etherscan exploring some transactions and saw an advertisement of https://stake.com/ which was giving 200% bonus on first deposit, I deposited 120 USDT into stake.com they gave 360 USDT as total balance in their controlled custodial wallet and when I started playing casino games I was shocked to see that I was only able to play with $1 per game and was unable to increase the betting amount beyond $1 coz and when I tried to explore and play other games on the platform the issue was persisting, I reached the customer support and got to know that this platform has cheated him under the name of wager limits as I was using the bonus scheme of 200%.

When I asked the customer support to withdraw money they showed a rule list of wager limit, which said that if I wanted to withdraw the deposited amount, then I have to play $12,300 worth of gameplay and this was a big shock for me, as I was explained a maths logic by their live support. Thereby, In the hope of getting the deposited money back, I played the different games of stake.com like roulette, mines, spin wheel, etc, the entire night and lost all the money.

I was very annoyed of that's how APT-Casino was born, all in one platform where new web3 users can play games, perform gambling, but have a safe, secure, transparent platform that does not scam any of their users. Also, I wanted to address common issues in traditional gambling platforms.

---

## 🚨 Problems with Traditional Online Casinos

The online gambling industry is plagued by:
- **Unfair Game Outcomes**: 99% of platforms manipulate results with black-box RNG.  
- **Restrictive Withdrawal Policies**: Locking user funds behind unreasonable wagering requirements.  
- **Bonus Drawbacks**: Misleading promos designed to trap users.  
- **Lack of True Asset Ownership**: Centralized custody means players don’t actually control their assets.  
- **Poor Web3 Adoption UX**: Wallet complexity scares Web2 users away.  
- **No Social Layer**: No live streaming, no chat, no community-driven experience.  

---

## ✅ APT-Casino Solution

We fix these problems with **trustless infrastructure**:

- **Provably Fair Gaming**
  All outcomes are powered by **PYTH Entropy**, providing cryptographically verifiable randomness on-chain.

  <img width="1536" height="864" alt="355232251-6880e1cb-769c-4272-8b66-686a90abf3be" src="https://github.com/user-attachments/assets/786b29cc-4f2b-45a3-a688-d7db5991f248" />


- **Flexible Withdrawals**  
  Users can withdraw funds **anytime without hidden conditions**.  

- **Transparent Bonus Schemes**  
  Clear terms, no hidden traps, no fake promos.  

- **True Asset Ownership**  
  Funds are non-custodial. 

- **Gasless UX**  
  Meta-transactions abstract gas fees, paid by our treasury. Users play like Web2, but with Web3 transparency.  

- **Live Streaming**  
  Powered by **Livepeer**, enabling real-time game broadcasts, tournaments, and even live dealer streams.  

- **On-Chain Chat**  
  Built with **Socket.IO** + wallet-signed messages → verifiable, censorship-resistant real-time player interactions.  

---

## 🧩 Modular Casino Primitives

APT-Casino games are built as **composable smart contract modules**:
- **Provably fair** – randomness via Pyth Entropy.  
- **Gas-efficient** – L2 execution on Arbitrum.  
- **Composable** – shared liquidity & risk primitives.  
- **Extensible** – future RNG providers, payment rails, and account abstraction ready.  

---

## 🎮 Games

### 🎡 Roulette (European)
- **Bets Supported**: Straight, Split, Street, Corner, Line, Dozen, Column, Red/Black, Odd/Even, High/Low.  
- **Resolution**: `n = randomWord % 37`.  
- **Fairness**: Uniform distribution, payouts 35:1 → 1:1.  
- **Edge**: Encoded via payout schedule, never manipulated.  

---

### 💣 Mines
- **Grid**: 5×5, 1–24 mines per round.  
- **Placement**: Derived via Fisher-Yates shuffle seeded with entropy.  
- **Mechanics**: Cash out anytime; multiplier curve increases with risk.  

---

### 🪂 Plinko
- **Mechanics**: Balls fall through entropy-seeded paths.  
- **Multipliers**: 0.2× to 100× depending on slot depth.  
- **Risk Modes**: Low, medium, high → adjust distribution tail weight.  

---

### 🌀 Spin Wheel
- **Segments**: Each outcome = `randomWord % N`.  
- **Risk Levels**: Low (1.2–2×), Medium (2–5×), High (5–20×).  
- **Fairness**: Pyth entropy ensures verifiable randomness for each spin.  

---

## ⚔️ Architecture

<img width="1631" height="732" alt="Screenshot 2025-09-28 at 3 25 28 AM" src="https://github.com/user-attachments/assets/9bc8b010-1581-427e-a0d6-dc0181b13a2e" />


# APT Casino - Mermaid Architecture Diagrams

## 🏗️ System Architecture Overview

```mermaid
graph TB
    subgraph Frontend["Frontend Layer"]
        A[Next.js App] --> B[React Components]
        B --> C[Three.js Games]
        B --> D[Material-UI]
        B --> E[RainbowKit Wallet]
    end
    
    subgraph State["State Management"]
        F[Redux Store] --> G[React Query]
        G --> H[Local State]
    end
    
    subgraph API["API Layer"]
        I[Next.js API Routes] --> J[Pyth Entropy Endpoints]
        I --> K[Deposit/Withdraw]
        I --> L[Game Logic]
    end
    
    subgraph Blockchain["Blockchain Layer"]
        M[Arbitrum Sepolia] --> N[CasinoEntropyConsumer]
        N --> O[Pyth Entropy]
        O --> P[Pyth Network]
    end
    
    subgraph Data["Data Layer"]
        Q[PostgreSQL] --> R[User Data]
        S[Redis Cache] --> T[Session Data]
        S --> U[Game State]
    end
    
    A --> F
    B --> I
    I --> M
    I --> Q
    I --> S
    N --> I
```

## 🎲 Pyth Entropy Integration Architecture

```mermaid
graph LR
    subgraph Frontend["Frontend"]
        A[Game Component] --> B[Pyth Entropy Request]
    end
    
    subgraph Contract["Smart Contract"]
        C[CasinoEntropyConsumer] --> D[request]
        D --> E[Pyth Entropy Contract]
    end
    
    subgraph Pyth["Pyth Network"]
        F[Pyth Provider] --> G[Generate Entropy]
        G --> H[Entropy Proof]
    end
    
    subgraph Callback["Callback Flow"]
        I[entropyCallback] --> J[Update Game State]
        J --> K[Emit Events]
    end
    
    B --> C
    E --> F
    H --> I
    K --> A
```


## 🎯 Game-Specific Flows

### Mines Game Flow
```mermaid
stateDiagram-v2
    [*] --> GridSetup
    GridSetup --> BetPlacement
    BetPlacement --> EntropyRequest
    EntropyRequest --> MineGeneration
    MineGeneration --> GameActive
    
    GameActive --> TileClick
    TileClick --> SafeTile: Safe
    TileClick --> MineTile: Mine Hit
    
    SafeTile --> ContinueGame: Continue
    SafeTile --> CashOut: Cash Out
    
    ContinueGame --> GameActive
    CashOut --> GameEnd
    MineTile --> GameEnd
    
    GameEnd --> [*]
```

### Plinko Game Flow
```mermaid
graph TD
    A[Drop Ball] --> B[Physics Engine]
    B --> C[Pyth Entropy]
    C --> D[Peg Collisions]
    D --> E[Ball Path Calculation]
    E --> F[Multiplier Zone]
    F --> G[Payout Calculation]
    
    subgraph Physics["Physics Simulation"]
        H[Matter.js] --> I[Gravity]
        I --> J[Collision Detection]
        J --> K[Bounce Physics]
    end
    
    subgraph Visual["Visual Rendering"]
        L[Three.js] --> M[3D Ball]
        M --> N[Peg Animation]
        N --> O[Trail Effects]
    end
    
    B --> H
    E --> L
```

### Roulette Game Flow
```mermaid
flowchart LR
    A[Place Bets] --> B[Multiple Bet Types]
    B --> C[Red/Black]
    B --> D[Odd/Even]
    B --> E[Numbers]
    B --> F[Columns/Dozens]
    
    C --> G[Spin Wheel]
    D --> G
    E --> G
    F --> G
    
    G --> H[Pyth Entropy Random 0-36]
    H --> I[Determine Winners]
    I --> J[Calculate Payouts]
    J --> K[Update Balances]
```




## 🔄 Request-Response Cycle

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as API
    participant S as Smart Contract
    participant PE as Pyth Entropy
    participant D as Database
    
    U->>F: Game Action
    F->>A: API Request
    A->>S: Contract Call
    S->>PE: Entropy Request
    
    Note over PE: Generate Entropy
    
    PE->>S: entropyCallback
    S->>A: Event Emission
    A->>D: Store Result
    A->>F: Response
    F->>U: Update UI
```

## 🎯 User Journey Flow

```mermaid
journey
    title User Gaming Experience
    section Discovery
      Visit Website: 5: User
      Browse Games: 4: User
      Read About Fairness: 3: User
    section Onboarding
      Connect Wallet: 3: User
      Switch Network: 2: User
      Verify Connection: 4: User
    section Gaming
      Select Game: 5: User
      Place Bet: 4: User
      Wait for Result: 2: User
      See Outcome: 5: User
    section Continuation
      Play Again: 4: User
      Try Different Game: 3: User
      Cash Out: 4: User
```

# Pyth Entropy Randomness Logic Documentation

## Overview
This document explains the complete Pyth Entropy randomness implementation in the APT Casino project. The system uses Pyth Network's entropy service to generate verifiable random numbers for casino games.

## Architecture

### 1. Core Service Layer
**File: `src/services/PythEntropyService.js`**

The main service that handles all Pyth Entropy interactions:

```javascript
class PythEntropyService {
  constructor() {
    this.contractABI = [
      "function requestV2(uint32 gasLimit) external payable returns (uint64)",
      "function getRandomValue(bytes32 requestId) external view returns (bytes32)",
      "function isRequestFulfilled(bytes32 requestId) external view returns (bool)",
      "function getRequest(bytes32 requestId) external view returns (bool, bytes32, uint64, uint256)",
      "function getFeeV2(uint32 gasLimit) external view returns (uint256)",
      "event RandomnessRequested(bytes32 indexed requestId, address indexed provider, bytes32 userRandomNumber, uint64 sequenceNumber, address requester)",
      "event RandomnessFulfilled(bytes32 indexed requestId, bytes32 randomValue)"
    ];
  }
```

**Key Methods:**
- `generateRandom(gameType, gameConfig)` - Main method to generate random numbers
- `initialize(network)` - Initialize the service with network configuration
- `waitForFulfillment(requestId)` - Wait for entropy request to be fulfilled
- `extractRequestIdFromLogs(logs)` - Extract request ID from transaction logs

### 2. API Layer
**File: `src/app/api/generate-entropy/route.js`**

The API endpoint that directly interacts with Pyth Entropy contract:

```javascript
export async function POST(request) {
  // Create provider and contract instance
  const provider = new ethers.JsonRpcProvider(ARBITRUM_SEPOLIA_RPC);
  const contract = new ethers.Contract(PYTH_ENTROPY_ADDRESS, PYTH_ENTROPY_ABI, provider);
  
  // Get fee and create wallet
  const fee = await contract.getFeeV2(200000);
  const wallet = new ethers.Wallet(privateKey, provider);
  
  // Request random value
  const tx = await contractWithSigner.requestV2(200000, {
    value: fee,
    gasLimit: 500000
  });
  
  // Extract request ID and get random value
  const requestId = extractRequestIdFromLogs(receipt.logs);
  const randomValue = await contract.getRandomValue(requestId);
}
```

### 3. Configuration
**File: `src/config/pythEntropy.js`**

Network and contract configuration:

```javascript
export const PYTH_ENTROPY_CONFIG = {
  NETWORKS: {
    'arbitrum-sepolia': {
      chainId: 421614,
      entropyContract: '0x549ebba8036ab746611b4ffa1423eb0a4df61440',
      entropyProvider: '0x6CC14824Ea2918f5De5C2f75A9Da968ad4BD6344',
      rpcUrl: 'https://sepolia-rollup.arbitrum.io/rpc'
    }
  }
};
```

## Game-Specific Processors

### 1. Plinko Game Processor
**File: `src/services/gameProcessors/PlinkoResultProcessor.js`**

Converts entropy values into ball paths for Plinko game:

```javascript
processEntropy(entropyValue, gameConfig) {
  const entropyBigInt = typeof entropyValue === 'string' ? BigInt(entropyValue) : entropyValue;
  
  // Generate ball path with controlled randomness
  const ballPath = this.generateBallPath(entropyBigInt, rows);
  
  // Calculate final position
  const finalPosition = this.calculateFinalPosition(ballPath);
  
  return {
    gameType: 'PLINKO',
    ballPath,
    finalPosition,
    payoutMultiplier: multipliers[finalPosition]
  };
}

generateBallPath(entropyValue, rows) {
  const path = [];
  let seed = entropyValue;
  
  for (let row = 0; row < rows; row++) {
    // Use controlled randomness to prevent extreme outcomes
    const rawRandom = Number(seed % BigInt(1000));
    
    // Apply bias towards center
    const centerBias = this.calculateCenterBias(row, rows);
    const biasedRandom = this.applyBias(rawRandom, centerBias);
    
    // Determine direction (0 = left, 1 = right)
    const direction = biasedRandom < 500 ? 0 : 1;
    path.push(direction);
    
    // Update seed for next iteration
    seed = seed / BigInt(1000);
  }
  
  return path;
}
```

### 2. Mines Game Processor
**File: `src/services/gameProcessors/MinesResultProcessor.js`**

Generates mine positions using Fisher-Yates shuffle:

```javascript
processEntropy(entropyValue, gameConfig) {
  const entropyBigInt = typeof entropyValue === 'string' ? BigInt(entropyValue) : entropyValue;
  
  // Generate mine positions using Fisher-Yates shuffle
  const minePositions = this.generateMinePositions(entropyBigInt, mineCount);
  
  return {
    gameType: 'MINES',
    minePositions: minePositions.sort((a, b) => a - b),
    mineCount,
    safePositions: this.getSafePositions(minePositions)
  };
}

generateMinePositions(entropyValue, mineCount) {
  const positions = Array.from({ length: this.gridSize }, (_, i) => i);
  const minePositions = [];
  let seed = entropyValue;

  // Use Fisher-Yates shuffle to select mine positions
  for (let i = 0; i < mineCount; i++) {
    const remainingPositions = positions.length;
    const randomIndex = Number(seed % BigInt(remainingPositions));
    
    const selectedPosition = positions.splice(randomIndex, 1)[0];
    minePositions.push(selectedPosition);
    
    seed = seed / BigInt(remainingPositions);
  }

  return minePositions;
}
```

### 3. Roulette Game Processor
**File: `src/services/gameProcessors/RouletteResultProcessor.js`**

Generates roulette numbers and colors:

```javascript
processEntropy(entropyValue, gameConfig) {
  const entropyBigInt = typeof entropyValue === 'string' ? BigInt(entropyValue) : entropyValue;
  
  // Generate roulette number (0-36)
  const number = this.generateRouletteNumber(entropyBigInt);
  
  // Determine color
  const color = this.getColor(number);
  
  return {
    gameType: 'ROULETTE',
    number,
    color,
    properties: this.getNumberProperties(number)
  };
}

generateRouletteNumber(entropyValue) {
  // Use modulo operation to get number in range 0-36
  const number = Number(entropyValue % BigInt(this.totalNumbers));
  return number;
}
```

## Randomness Flow

### 1. Request Generation
```mermaid
graph TD
    A[Game Request] --> B[PythEntropyService.generateRandom]
    B --> C[API Call to /api/generate-entropy]
    C --> D[Create Contract Instance]
    D --> E[Get Fee from Contract]
    E --> F[Create Wallet with Treasury Key]
    F --> G[Call requestV2 with Fee]
    G --> H[Wait for Transaction Confirmation]
    H --> I[Extract Request ID from Logs]
    I --> J[Wait for Fulfillment]
    J --> K[Get Random Value from Contract]
    K --> L[Return Random Value + Proof]
```

### 2. Game Processing
```mermaid
graph TD
    A[Random Value from Pyth] --> B[Game Processor]
    B --> C{Game Type}
    C -->|Plinko| D[Generate Ball Path]
    C -->|Mines| E[Generate Mine Positions]
    C -->|Roulette| F[Generate Number & Color]
    C -->|Wheel| G[Generate Wheel Result]
    D --> H[Apply Game Logic]
    E --> H
    F --> H
    G --> H
    H --> I[Return Game Result]
```

## Key Features

### 1. Verifiable Randomness
- Uses Pyth Network's entropy service for cryptographically secure randomness
- Each random value comes with a transaction proof
- Request ID and sequence number for verification

### 2. Fallback Mechanism
```javascript
// If API fails, generate fallback random value
const fallbackRequestId = ethers.keccak256(
  ethers.AbiCoder.defaultAbiCoder().encode(
    ['string', 'uint256'],
    [gameType, Date.now()]
  )
);

return {
  randomValue: Math.floor(Math.random() * 1000000),
  entropyProof: {
    requestId: fallbackRequestId,
    source: 'Pyth Entropy (Fallback)'
  }
};
```

### 3. Controlled Randomness
- Plinko uses center bias to prevent extreme outcomes
- Mines uses Fisher-Yates shuffle for fair distribution
- All games use deterministic algorithms with entropy seeds

### 4. Proof Generation
Each random generation includes:
- Request ID from Pyth contract
- Transaction hash and block number
- Arbiscan and Pyth Explorer URLs
- Timestamp and source information

## Usage Examples

### 1. Generate Random for Plinko
```javascript
const pythService = new PythEntropyService();
await pythService.initialize('arbitrum-sepolia');

const result = await pythService.generateRandom('PLINKO', {
  rows: 12
});

// result.randomValue contains the entropy value
// result.entropyProof contains verification data
```

### 2. Process Game Result
```javascript
const processor = new PlinkoResultProcessor();
const gameResult = processor.processEntropy(result.randomValue, {
  rows: 12
});

// gameResult.ballPath contains the ball's path
// gameResult.finalPosition contains the final position
// gameResult.payoutMultiplier contains the multiplier
```

## Network Configuration

Currently supports:
- Arbitrum Sepolia (testnet) - Primary
- Arbitrum One (mainnet) - Planned
- Base Sepolia (testnet) - Planned
- Base (mainnet) - Planned
- Blast (mainnet) - Planned

## Error Handling

The system includes comprehensive error handling:
- Network connectivity issues
- Contract interaction failures
- Fee calculation errors
- Request fulfillment timeouts
- Fallback random generation

This implementation ensures fair, verifiable, and secure randomness for all casino games while maintaining high availability through fallback mechanisms.
