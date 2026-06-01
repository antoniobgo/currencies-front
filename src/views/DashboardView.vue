<script setup lang="ts">
import { onMounted } from 'vue'
import { useQuotesStore } from '@/stores/quotes'
import CurrencyCard from '@/components/CurrencyCard.vue'
import SyncStatus from '@/components/SyncStatus.vue'

const quotesStore = useQuotesStore()

onMounted(() => quotesStore.fetchLatestAll())
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p class="text-sm text-gray-500 mt-0.5">Cotações atuais das moedas monitoradas</p>
      </div>
      <SyncStatus />
    </div>

    <div
      v-if="quotesStore.loadingLatest"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <div v-for="n in 4" :key="n" class="bg-gray-100 rounded-xl h-36 animate-pulse" />
    </div>

    <div
      v-else-if="!quotesStore.latestAll.length"
      class="text-center py-24 text-gray-400"
    >
      <p class="text-4xl mb-4">📉</p>
      <p class="text-base font-medium text-gray-600 mb-1">Nenhuma cotação disponível</p>
      <p class="text-sm">Verifique se a API está rodando e se há moedas monitoradas</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <CurrencyCard
        v-for="quote in quotesStore.latestAll"
        :key="quote.code"
        :quote="quote"
      />
    </div>
  </div>
</template>
