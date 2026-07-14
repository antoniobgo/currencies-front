<script setup lang="ts">
import type { CurrencyDailyCloseResponse } from '@/types'
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  type ChartOptions,
} from 'chart.js'
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import { formatCurrency } from '@/utils/format'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

const props = defineProps<{ closes: CurrencyDailyCloseResponse[] }>()

const chartData = computed(() => ({
  labels: props.closes.map(c =>
    new Date(c.date + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
  ),
  datasets: [
    {
      label: 'Fechamento',
      data: props.closes.map(c => Number(c.bid)),
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.07)',
      fill: true,
      tension: 0.2,
      pointRadius: 0,
      pointHoverRadius: 4,
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
      callbacks: { label: ctx => `  ${formatCurrency(Number(ctx.raw), 2)}` },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { maxRotation: 0, maxTicksLimit: 8, font: { size: 11 } },
    },
    y: {
      grid: { color: 'rgba(0,0,0,0.04)' },
      ticks: { callback: v => formatCurrency(Number(v), 2), font: { size: 11 } },
    },
  },
}
</script>

<template>
  <div class="h-56">
    <Line v-if="closes.length" :data="chartData" :options="options" />
    <div v-else class="h-full flex items-center justify-center text-sm text-gray-400">
      Sem dados históricos
    </div>
  </div>
</template>
