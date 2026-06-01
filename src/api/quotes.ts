import { client } from './client'
import type { CurrencyQuoteResponse, CurrencyDailyCloseResponse, SummaryDTO } from '@/types'

export const quotesApi = {
  getLatestAll: () =>
    client.get<CurrencyQuoteResponse[]>('/api/cotacoes/atual'),

  getLatestByCode: (code: string) =>
    client.get<CurrencyQuoteResponse>(`/api/cotacoes/atual/${code}`),

  getTodayAll: () =>
    client.get<CurrencyQuoteResponse[]>('/api/cotacoes/hoje'),

  getTodayByCode: (code: string) =>
    client.get<CurrencyQuoteResponse[]>(`/api/cotacoes/hoje/${code}`),

  getHistory: (code: string, startDate?: string, endDate?: string) =>
    client.get<CurrencyDailyCloseResponse[]>('/api/cotacoes/historico', {
      params: { moeda: code, dataInicio: startDate, dataFim: endDate },
    }),

  getSummary: (code: string, period = 30) =>
    client.get<SummaryDTO>('/api/cotacoes/resumo', {
      params: { moeda: code, periodo: period },
    }),
}
