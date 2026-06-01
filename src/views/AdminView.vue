<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCurrenciesStore } from '@/stores/currencies'
import { useSyncStore } from '@/stores/sync'
import { adminApi } from '@/api/admin'

const currenciesStore = useCurrenciesStore()
const syncStore = useSyncStore()

const newCode = ref('')
const addError = ref('')
const addLoading = ref(false)
const importLoading = ref(false)
const importDone = ref(false)

onMounted(() =>
  Promise.all([currenciesStore.fetchAll(), syncStore.fetchStatus()])
)

async function addCurrency() {
  const code = newCode.value.trim().toUpperCase()
  if (!code) return
  addError.value = ''
  addLoading.value = true
  try {
    await currenciesStore.add(code)
    newCode.value = ''
  } catch (e: unknown) {
    const err = e as { response?: { data?: { message?: string } } }
    addError.value = err?.response?.data?.message ?? 'Erro ao adicionar moeda'
  } finally {
    addLoading.value = false
  }
}

async function importHistory() {
  importLoading.value = true
  importDone.value = false
  try {
    await adminApi.importHistory()
    importDone.value = true
  } finally {
    importLoading.value = false
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-8">
    <h1 class="text-2xl font-bold text-gray-900 mb-1">Administração</h1>
    <p class="text-sm text-gray-500 mb-8">Gerencie moedas monitoradas e controle de sincronização</p>

    <section class="bg-white border border-gray-200 rounded-xl p-6 mb-5">
      <h2 class="text-base font-semibold text-gray-800 mb-4">Moedas monitoradas</h2>

      <form @submit.prevent="addCurrency" class="flex gap-2 mb-2">
        <input
          v-model="newCode"
          type="text"
          placeholder="Ex: USD, EUR, BTC"
          maxlength="10"
          class="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 uppercase placeholder:normal-case"
        />
        <button
          type="submit"
          :disabled="addLoading"
          class="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-medium transition-colors"
        >
          {{ addLoading ? 'Adicionando...' : 'Adicionar' }}
        </button>
      </form>
      <p v-if="addError" class="text-xs text-red-500 mb-4">{{ addError }}</p>

      <div v-if="currenciesStore.loading" class="text-sm text-gray-400 text-center py-6">
        Carregando...
      </div>
      <ul v-else-if="currenciesStore.currencies.length" class="divide-y divide-gray-100 mt-4">
        <li
          v-for="currency in currenciesStore.currencies"
          :key="currency.code"
          class="flex items-center justify-between py-3"
        >
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
              {{ currency.code }}
            </span>
            <span class="text-xs text-gray-400">
              desde {{ new Date(currency.createdAt).toLocaleDateString('pt-BR') }}
            </span>
          </div>
          <button
            @click="currenciesStore.remove(currency.code)"
            class="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
          >
            Remover
          </button>
        </li>
      </ul>
      <p v-else class="text-sm text-gray-400 text-center py-6 mt-2">
        Nenhuma moeda cadastrada
      </p>
    </section>

    <section class="bg-white border border-gray-200 rounded-xl p-6 mb-5">
      <h2 class="text-base font-semibold text-gray-800 mb-4">Sincronização</h2>
      <div class="flex items-center justify-between gap-4">
        <div class="text-sm text-gray-600">
          <p v-if="syncStore.status?.lastSyncAt">
            Última sync:
            <span class="font-medium">
              {{ new Date(syncStore.status.lastSyncAt).toLocaleString('pt-BR') }}
            </span>
            <span class="text-gray-400 ml-1">({{ syncStore.status.lastSyncCount }} registros)</span>
          </p>
          <p v-else class="text-gray-400">Nenhuma sync realizada ainda</p>
        </div>
        <button
          @click="syncStore.syncNow()"
          :disabled="syncStore.syncing"
          class="shrink-0 bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-medium transition-colors"
        >
          {{ syncStore.syncing ? 'Sincronizando...' : 'Sincronizar agora' }}
        </button>
      </div>
    </section>

    <section class="bg-white border border-gray-200 rounded-xl p-6">
      <h2 class="text-base font-semibold text-gray-800 mb-1">Importar histórico</h2>
      <p class="text-xs text-gray-500 mb-4">
        Importa os últimos 5 anos de fechamentos diários para todas as moedas monitoradas.
        Operação incremental — ignora datas já existentes.
      </p>
      <div class="flex items-center gap-3">
        <button
          @click="importHistory"
          :disabled="importLoading"
          class="bg-amber-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-amber-600 disabled:opacity-50 font-medium transition-colors"
        >
          {{ importLoading ? 'Importando...' : 'Importar histórico' }}
        </button>
        <span v-if="importDone" class="text-sm text-emerald-600 font-medium">
          ✓ Importação iniciada
        </span>
      </div>
    </section>
  </div>
</template>
