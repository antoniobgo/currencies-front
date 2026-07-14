<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  type ChartOptions,
} from 'chart.js'
import type { CurrencyQuoteResponse } from '@/types'
import { formatCurrency } from '@/utils/format'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

const props = defineProps<{ quotes: CurrencyQuoteResponse[] }>()

const chartData = computed(() => ({
  labels: props.quotes.map(q =>
    new Date(q.quotedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  ),
  datasets: [
    {
      label: 'Bid',
      data: props.quotes.map(q => Number(q.bid)),
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.07)',
      fill: true,
      tension: 0.3,
      pointRadius: 2,
      pointHoverRadius: 5,
      borderWidth: 2,
    },
  ],
}))

const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: { label: ctx => `  ${formatCurrency(Number(ctx.raw), 4)}` },
    },
  },
  scales: {
    x: {
      grid: { color: 'rgba(0,0,0,0.04)' },
      ticks: { maxRotation: 0, maxTicksLimit: 8, font: { size: 11 } },
    },
    y: {
      grid: { color: 'rgba(0,0,0,0.04)' },
      ticks: { callback: v => formatCurrency(Number(v), 3), font: { size: 11 } },
    },
  },
}
</script>

<template>
  <div class="h-56">
    <Line v-if="quotes.length" :data="chartData" :options="options" />
    <div v-else class="h-full flex items-center justify-center text-sm text-gray-400">
      Sem dados intraday para hoje
    </div>
  </div>
</template>
