/**
 * API endpoint for collecting web vitals metrics
 * Particularly focused on Vietnamese text rendering metrics
 */

// Helper to format the metrics data
const formatMetricsData = (metrics) => {
  // Add timestamp and environment information
  const enrichedMetrics = {
    ...metrics,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    appVersion: process.env.APP_VERSION || '1.0.0',
    deploymentId: process.env.VERCEL_GIT_COMMIT_SHA || 'local',
  };

  return enrichedMetrics;
};

// Simple in-memory storage for development (replace with database in production)
let metricsStore = [];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const metrics = req.body;
    
    // Skip if no data provided
    if (!metrics || !metrics.name) {
      return res.status(400).json({ error: 'Invalid metrics data' });
    }
    
    // Format and store metrics
    const formattedMetrics = formatMetricsData(metrics);
    
    // In development, we'll just store in memory
    if (process.env.NODE_ENV === 'development') {
      metricsStore.push(formattedMetrics);
      
      // Keep only the last 100 entries
      if (metricsStore.length > 100) {
        metricsStore = metricsStore.slice(-100);
      }
      
      console.log(`[Vitals] Stored ${metrics.name} metric`);
    } else {
      // In production, store in a database
      // Example with MongoDB:
      // 
      // const { MongoClient } = require('mongodb');
      // const client = new MongoClient(process.env.MONGODB_URI);
      // await client.connect();
      // await client.db('analytics').collection('vitals').insertOne(formattedMetrics);
      // client.close();
      
      // For now, we'll just log to server console
      console.log('[Vitals]', JSON.stringify(formattedMetrics));
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error storing metrics:', error);
    return res.status(500).json({ error: 'Failed to store metrics' });
  }
}

// Endpoint to get metrics (development only)
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '16kb',
    },
  },
};
