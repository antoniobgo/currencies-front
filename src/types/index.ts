export interface CurrencyQuoteResponse {
  code: string
  codeIn: string
  name: string
  high: number
  low: number
  bid: number
  ask: number
  varBid: number
  pctChange: number
  quotedAt: string
}

export interface CurrencyDailyCloseResponse {
  code: string
  codeIn: string
  name: string
  high: number
  low: number
  bid: number
  ask: number
  varBid: number
  pctChange: number
  date: string
}

export interface SummaryDTO {
  code: string
  max: number
  min: number
  avg: number
  pctChange: number
  start: string
  end: string
}

export interface MonitoredCurrencyResponse {
  code: string
  active: boolean
  createdAt: string
}

export interface SyncStatusDTO {
  lastSyncAt: string | null
  lastSyncCount: number
}
