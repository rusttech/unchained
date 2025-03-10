import { Logs, ParsedTransactionWithMeta } from '@solana/web3.js'

export type Transaction = Omit<ParsedTransactionWithMeta, 'slot'>

export interface WebsocketSubscribeResponse<T = unknown> {
  jsonrpc: '2.0'
  id: string
  method: string
  result: T
}

export interface WebsocketResponse {
  jsonrpc: '2.0'
  method: string
  params: Params
}

interface Params {
  subscription: number
  result: Result
}

interface Result {
  value: Logs
  context: {
    slot: number
  }
}

export const isWebsocketResponse = (data: unknown): data is WebsocketResponse => {
  return Boolean(typeof data === 'object' && data && 'method' in data && 'params' in data)
}

export const isWebsocketSubscribeResponse = (data: unknown): data is WebsocketSubscribeResponse<number> => {
  return Boolean(typeof data === 'object' && data && 'result' in data && typeof data.result === 'number')
}

export type NativeBalance = {
  lamports: number
  price_per_sol: number
  total_price: number
}
