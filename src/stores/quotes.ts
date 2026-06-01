import { defineStore } from 'pinia'
import { ref } from 'vue'
import { quotesApi } from '@/api/quotes'
import type { CurrencyQuoteResponse, CurrencyDailyCloseResponse, SummaryDTO } from '@/types'

export const useQuotesStore = defineStore('quotes', () => {
  const latestAll = ref<CurrencyQuoteResponse[]>([])
  const todayByCode = ref<Record<string, CurrencyQuoteResponse[]>>({})
  const historyByCode = ref<Record<string, CurrencyDailyCloseResponse[]>>({})
  const summaryByCode = ref<Record<string, SummaryDTO>>({})
  const loadingLatest = ref(false)

  async function fetchLatestAll() {
    loadingLatest.value = true
    try {
      const { data } = await quotesApi.getLatestAll()
      latestAll.value = data
    } finally {
      loadingLatest.value = false
    }
  }

  async function fetchTodayByCode(code: string) {
    const { data } = await quotesApi.getTodayByCode(code)
    todayByCode.value[code] = data
  }

  async function fetchHistory(code: string, startDate?: string, endDate?: string) {
    const { data } = await quotesApi.getHistory(code, startDate, endDate)
    historyByCode.value[code] = data
  }

  async function fetchSummary(code: string, period = 30) {
    const { data } = await quotesApi.getSummary(code, period)
    summaryByCode.value[code] = data
  }

  return {
    latestAll,
    todayByCode,
    historyByCode,
    summaryByCode,
    loadingLatest,
    fetchLatestAll,
    fetchTodayByCode,
    fetchHistory,
    fetchSummary,
  }
})
