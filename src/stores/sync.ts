import { defineStore } from 'pinia'
import { ref } from 'vue'
import { syncApi } from '@/api/sync'
import type { SyncStatusDTO } from '@/types'

export const useSyncStore = defineStore('sync', () => {
  const status = ref<SyncStatusDTO | null>(null)
  const syncing = ref(false)

  async function fetchStatus() {
    const { data } = await syncApi.getStatus()
    status.value = data
  }

  async function syncNow() {
    syncing.value = true
    try {
      const { data } = await syncApi.syncNow()
      status.value = data
    } finally {
      syncing.value = false
    }
  }

  return { status, syncing, fetchStatus, syncNow }
})
