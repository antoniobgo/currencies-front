<script setup lang="ts">
import type { SummaryDTO } from '@/types'
import { formatCurrency, formatPercent } from '@/utils/format'

defineProps<{ summary: SummaryDTO }>()

function fmtDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('pt-BR')
}
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
    <div class="bg-white border border-gray-200 rounded-xl p-4">
      <p class="text-xs text-gray-400 mb-1">Máxima</p>
      <p class="text-lg font-bold text-gray-900 tabular-nums">{{ formatCurrency(Number(summary.max)) }}</p>
    </div>
    <div class="bg-white border border-gray-200 rounded-xl p-4">
      <p class="text-xs text-gray-400 mb-1">Mínima</p>
      <p class="text-lg font-bold text-gray-900 tabular-nums">{{ formatCurrency(Number(summary.min)) }}</p>
    </div>
    <div class="bg-white border border-gray-200 rounded-xl p-4">
      <p class="text-xs text-gray-400 mb-1">Média</p>
      <p class="text-lg font-bold text-gray-900 tabular-nums">{{ formatCurrency(Number(summary.avg)) }}</p>
    </div>
    <div class="bg-white border border-gray-200 rounded-xl p-4">
      <p class="text-xs text-gray-400 mb-1">Variação período</p>
      <p
        :class="summary.pctChange >= 0 ? 'text-emerald-600' : 'text-red-500'"
        class="text-lg font-bold tabular-nums"
      >
        {{ formatPercent(summary.pctChange) }}
      </p>
      <p class="text-xs text-gray-400 mt-0.5">
        {{ fmtDate(summary.start) }} – {{ fmtDate(summary.end) }}
      </p>
    </div>
  </div>
</template>
