<script setup lang="ts">
import HistoryChart from '@/components/HistoryChart.vue'
import IntradayChart from '@/components/IntradayChart.vue'
import SummaryCards from '@/components/SummaryCards.vue'
import { useQuotesStore } from '@/stores/quotes'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const quotesStore = useQuotesStore()

const code = computed(() => (route.params.code as string).toUpperCase())
const period = ref(30)
const loading = ref(false)

const periods = [
  { label: '7d', value: 7 },
  { label: '30d', value: 30 },
  { label: '90d', value: 90 },
  { label: '1a', value: 365 },
]

const todayQuotes = computed(() => quotesStore.todayByCode[code.value] ?? [])
const history = computed(() => quotesStore.historyByCode[code.value] ?? [])
const summary = computed(() => quotesStore.summaryByCode[code.value])
const latestQuote = computed(() => quotesStore.latestAll.find(q => q.code === code.value))
const isPositive = computed(() => (latestQuote.value?.pctChange ?? 0) >= 0)

async function loadData() {
  loading.value = true

  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - period.value)

  try {
    await Promise.all([
      quotesStore.fetchTodayByCode(code.value),
      quotesStore.fetchHistory(code.value,toDateParam(start), toDateParam(end)),
      quotesStore.fetchSummary(code.value, period.value),
    ])
  } finally {
    loading.value = false
  }
}

//TODO: verificar se colocar num pacote helpers ou algo do tipo
function toDateParam(d: Date): string {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}


async function changePeriod(p: number) {
  period.value = p


  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - p)

  await Promise.all([
    quotesStore.fetchHistory(code.value, toDateParam(start), toDateParam(end)),
    quotesStore.fetchSummary(code.value, p),
  ])
}

onMounted(loadData)
watch(code, loadData)
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-8">
    <button
      @click="router.back()"
      class="text-sm text-indigo-600 hover:text-indigo-800 font-medium mb-5 flex items-center gap-1 transition-colors"
    >
      ← Voltar
    </button>

    <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
      <div>
        <div class="flex items-center gap-3 mb-1">
          <h1 class="text-3xl font-bold text-gray-900">{{ code }}</h1>
          <span
            v-if="latestQuote"
            :class="isPositive ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'"
            class="text-sm font-semibold px-2.5 py-0.5 rounded-full"
          >
            {{ isPositive ? '+' : '' }}{{ latestQuote.pctChange.toFixed(2) }}%
          </span>
        </div>
        <p v-if="latestQuote" class="text-sm text-gray-500">{{ latestQuote.name }}</p>
      </div>

      <div v-if="latestQuote" class="sm:text-right">
        <p class="text-3xl font-bold text-gray-900 tabular-nums">
          {{ Number(latestQuote.bid).toFixed(4) }}
        </p>
        <p class="text-xs text-gray-400 mt-0.5 tabular-nums">
          ↑ {{ Number(latestQuote.high).toFixed(4) }} &nbsp;·&nbsp; ↓ {{ Number(latestQuote.low).toFixed(4) }}
        </p>
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-24 text-gray-400 text-sm">
      Carregando...
    </div>

    <div v-else class="space-y-6">
      <section v-if="summary">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-sm font-semibold text-gray-700">Resumo do período</h2>
          <div class="flex gap-1">
            <button
              v-for="p in periods"
              :key="p.value"
              @click="changePeriod(p.value)"
              :class="
                period === p.value
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              "
              class="text-xs px-2.5 py-1 rounded-lg font-medium transition-colors"
            >
              {{ p.label }}
            </button>
          </div>
        </div>
        <SummaryCards :summary="summary" />
      </section>

      <section class="bg-white border border-gray-200 rounded-xl p-5">
        <h2 class="text-sm font-semibold text-gray-700 mb-4">Histórico de fechamentos</h2>
        <HistoryChart :closes="history" />
      </section>

      <section class="bg-white border border-gray-200 rounded-xl p-5">
        <h2 class="text-sm font-semibold text-gray-700 mb-4">Variação de hoje (intraday)</h2>
        <IntradayChart :quotes="todayQuotes" />
      </section>
    </div>
  </div>
</template>
