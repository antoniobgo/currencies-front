import { client } from './client'
import type { SyncStatusDTO } from '@/types'

export const syncApi = {
  syncNow: () => client.post<SyncStatusDTO>('/api/sync'),
  getStatus: () => client.get<SyncStatusDTO>('/api/sync/status'),
}
