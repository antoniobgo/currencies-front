<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { CurrencyQuoteResponse } from '@/types'

const props = defineProps<{ quote: CurrencyQuoteResponse }>()
const router = useRouter()

const isPositive = computed(() => props.quote.pctChange >= 0)
const pctFormatted = computed(() => {
  const sign = isPositive.value ? '+' : ''
  return `${sign}${props.quote.pctChange.toFixed(2)}%`
})
</script>

<template>
  <button
    @click="router.push({ name: 'currency', params: { code: quote.code } })"
    class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all text-left w-full cursor-pointer"
  >
    <div class="flex items-start justify-between mb-3">
      <div>
        <span class="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
          {{ quote.code }}
        </span>
        <p class="text-xs text-gray-400 mt-1.5 leading-tight line-clamp-1">{{ quote.name }}</p>
      </div>
      <span
        :class="isPositive ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'"
        class="text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
      >
        {{ pctFormatted }}
      </span>
    </div>
    <p class="text-2xl font-bold text-gray-900 tabular-nums">
      {{ Number(quote.bid).toFixed(4) }}
    </p>
    <div class="flex gap-4 mt-2 text-xs text-gray-400 tabular-nums">
      <span>↑ {{ Number(quote.high).toFixed(4) }}</span>
      <span>↓ {{ Number(quote.low).toFixed(4) }}</span>
    </div>
  </button>
</template>
