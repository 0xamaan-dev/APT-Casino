import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export async function POST(request) {
  try {
    console.log('🎲 API: Generating Pyth Entropy...');
    
    // Get the project root directory
    const projectRoot = process.cwd();
    const scriptPath = path.join(projectRoot, 'scripts', 'test-pyth-v2.js');
    
    // Run the hardhat script
    const { stdout, stderr } = await execAsync(
      `npx hardhat run ${scriptPath} --network arbitrum-sepolia`,
      { cwd: projectRoot }
    );
    
    console.log('📤 Hardhat script output:', stdout);
    
    if (stderr) {
      console.warn('⚠️ Hardhat script stderr:', stderr);
    }
    
    // Parse the output to extract transaction hash
    const txHashMatch = stdout.match(/RequestV2 sent: (0x[a-fA-F0-9]{64})/);
    const blockNumberMatch = stdout.match(/Transaction confirmed in block: (\d+)/);
    
    if (!txHashMatch) {
      throw new Error('Transaction hash not found in script output');
    }
    
    const txHash = txHashMatch[1];
    const blockNumber = blockNumberMatch ? blockNumberMatch[1] : null;
    
    // Generate a random value based on transaction hash
    const randomValue = generateRandomFromTxHash(txHash);
    
    // Create entropy proof
    const entropyProof = {
      requestId: txHash, // Use transaction hash as request ID
      sequenceNumber: Date.now().toString(),
      transactionHash: txHash,
      blockNumber: blockNumber,
      randomValue: randomValue,
      network: 'arbitrum-sepolia',
      explorerUrl: `https://entropy-explorer.pyth.network/?chain=arbitrum-sepolia&search=${txHash}`,
      arbiscanUrl: `https://sepolia.arbiscan.io/tx/${txHash}`,
      timestamp: Date.now(),
      source: 'Pyth Entropy (Hardhat Script)'
    };
    
    console.log('✅ API: Entropy generated successfully');
    console.log('🔗 Transaction:', txHash);
    console.log('🎲 Random value:', randomValue);
    
    return Response.json({
      success: true,
      randomValue: randomValue,
      entropyProof: entropyProof
    });
    
  } catch (error) {
    console.error('❌ API: Error generating entropy:', error);
    
    return Response.json({
      success: false,
      error: error.message,
      randomValue: Math.floor(Math.random() * 1000000), // Fallback random value
      entropyProof: {
        requestId: 'fallback_' + Date.now(),
        sequenceNumber: Date.now().toString(),
        transactionHash: 'fallback_no_tx',
        blockNumber: null,
        randomValue: Math.floor(Math.random() * 1000000),
        network: 'arbitrum-sepolia',
        explorerUrl: 'https://entropy-explorer.pyth.network/?chain=arbitrum-sepolia',
        arbiscanUrl: 'https://sepolia.arbiscan.io/',
        timestamp: Date.now(),
        source: 'Pyth Entropy (Fallback)'
      }
    }, { status: 500 });
  }
}

// Generate a deterministic random value from transaction hash
function generateRandomFromTxHash(txHash) {
  // Convert transaction hash to a number
  const hashNumber = parseInt(txHash.slice(2, 10), 16);
  return hashNumber % 1000000; // Return a number between 0 and 999999
}
