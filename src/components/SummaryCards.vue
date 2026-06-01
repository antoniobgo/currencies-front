<script setup lang="ts">
import type { SummaryDTO } from '@/types'

defineProps<{ summary: SummaryDTO }>()

function fmtDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('pt-BR')
}
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
    <div class="bg-white border border-gray-200 rounded-xl p-4">
      <p class="text-xs text-gray-400 mb-1">Máxima</p>
      <p class="text-lg font-bold text-gray-900 tabular-nums">{{ Number(summary.max).toFixed(4) }}</p>
    </div>
    <div class="bg-white border border-gray-200 rounded-xl p-4">
      <p class="text-xs text-gray-400 mb-1">Mínima</p>
      <p class="text-lg font-bold text-gray-900 tabular-nums">{{ Number(summary.min).toFixed(4) }}</p>
    </div>
    <div class="bg-white border border-gray-200 rounded-xl p-4">
      <p class="text-xs text-gray-400 mb-1">Média</p>
      <p class="text-lg font-bold text-gray-900 tabular-nums">{{ Number(summary.avg).toFixed(4) }}</p>
    </div>
    <div class="bg-white border border-gray-200 rounded-xl p-4">
      <p class="text-xs text-gray-400 mb-1">Variação período</p>
      <p
        :class="summary.pctChange >= 0 ? 'text-emerald-600' : 'text-red-500'"
        class="text-lg font-bold tabular-nums"
      >
        {{ summary.pctChange >= 0 ? '+' : '' }}{{ summary.pctChange.toFixed(2) }}%
      </p>
      <p class="text-xs text-gray-400 mt-0.5">
        {{ fmtDate(summary.start) }} – {{ fmtDate(summary.end) }}
      </p>
    </div>
  </div>
</template>
