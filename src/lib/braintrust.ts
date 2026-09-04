import { wrapTraced, updateSpan } from 'braintrust'
import OpenAI from 'openai'

// The OpenAI client is instrumented automatically by the Braintrust bundler
// plugin (see next.config.mjs) once the logger is registered in
// src/instrumentation.ts, so no call-site wrapper is needed here.
//
// Routed through the Braintrust AI gateway, so provider credentials live in
// Braintrust settings rather than in a local OPENAI_API_KEY.
export const openai = new OpenAI({
  baseURL: 'https://gateway.braintrust.dev',
  apiKey: process.env.BRAINTRUST_API_KEY,
})

// Helper to create traced functions with custom type. Auto-instrumentation
// covers LLM clients, not arbitrary functions, so tool spans stay explicit.
export function wrapTracedTool<Args extends unknown[], Return>(
  fn: (...args: Args) => Promise<Return>
): (...args: Args) => Promise<Return> {
  return wrapTraced(fn, {
    type: 'tool' as const,
  })
}

// Helper to create traced functions
export { wrapTraced }

// Export updateSpan for updating existing spans
export { updateSpan }
