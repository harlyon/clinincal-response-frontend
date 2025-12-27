const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    endpoints: {
      predict: '/predict',
      predictBatch: '/predict_batch'
    }
  }
} as const;
export default config;