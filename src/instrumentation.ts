import { initLogger } from 'braintrust'

export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs' || process.env.NEXT_RUNTIME === 'edge') {
    initLogger({
      projectName: 'l8r-customer-service',
      apiKey: process.env.BRAINTRUST_API_KEY,
    })
  }
}
