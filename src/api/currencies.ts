import { client } from './client'
import type { MonitoredCurrencyResponse } from '@/types'

export const currenciesApi = {
  getAll: () => client.get<MonitoredCurrencyResponse[]>('/api/moedas'),
  add: (code: string) => client.post<MonitoredCurrencyResponse>('/api/moedas', { code }),
  remove: (code: string) => client.delete(`/api/moedas/${code}`),
}
