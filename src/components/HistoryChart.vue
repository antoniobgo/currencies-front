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
import type { CurrencyDailyCloseResponse } from '@/types'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

const props = defineProps<{ closes: CurrencyDailyCloseResponse[] }>()

const chartData = computed(() => ({
  labels: props.closes.map(c =>
    new Date(c.date + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
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
      callbacks: { label: ctx => `  ${Number(ctx.raw).toFixed(4)}` },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { maxRotation: 0, maxTicksLimit: 8, font: { size: 11 } },
    },
    y: {
      grid: { color: 'rgba(0,0,0,0.04)' },
      ticks: { callback: v => Number(v).toFixed(3), font: { size: 11 } },
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
