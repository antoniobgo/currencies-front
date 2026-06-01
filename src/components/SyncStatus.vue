<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useSyncStore } from '@/stores/sync'

const syncStore = useSyncStore()

onMounted(() => syncStore.fetchStatus())

const syncedAt = computed(() => {
  if (!syncStore.status?.lastSyncAt) return 'Nunca'
  const diff = Math.floor((Date.now() - new Date(syncStore.status.lastSyncAt).getTime()) / 60000)
  if (diff < 1) return 'Agora mesmo'
  if (diff === 1) return 'Há 1 min'
  if (diff < 60) return `Há ${diff} min`
  return `Há ${Math.floor(diff / 60)}h`
})
</script>

<template>
  <div class="flex items-center gap-3">
    <div class="flex items-center gap-1.5 text-sm text-gray-500">
      <span class="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
      Atualizado {{ syncedAt }}
      <span v-if="syncStore.status?.lastSyncCount" class="text-gray-400">
        ({{ syncStore.status.lastSyncCount }})
      </span>
    </div>
    <button
      @click="syncStore.syncNow()"
      :disabled="syncStore.syncing"
      class="text-xs text-indigo-600 hover:text-indigo-800 font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      {{ syncStore.syncing ? 'Sincronizando...' : 'Sincronizar' }}
    </button>
  </div>
</template>
