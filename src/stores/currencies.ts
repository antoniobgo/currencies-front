import { defineStore } from 'pinia'
import { ref } from 'vue'
import { currenciesApi } from '@/api/currencies'
import type { MonitoredCurrencyResponse } from '@/types'

export const useCurrenciesStore = defineStore('currencies', () => {
  const currencies = ref<MonitoredCurrencyResponse[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchAll() {
    loading.value = true
    error.value = null
    try {
      const { data } = await currenciesApi.getAll()
      currencies.value = data
    } catch {
      error.value = 'Erro ao carregar moedas'
    } finally {
      loading.value = false
    }
  }

  async function add(code: string) {
    const { data } = await currenciesApi.add(code)
    currencies.value.push(data)
    return data
  }

  async function remove(code: string) {
    await currenciesApi.remove(code)
    currencies.value = currencies.value.filter(c => c.code !== code)
  }

  return { currencies, loading, error, fetchAll, add, remove }
})
