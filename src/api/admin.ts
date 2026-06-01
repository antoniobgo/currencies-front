import { client } from './client'

export const adminApi = {
  importHistory: (reimport = false) =>
    client.post('/api/admin/historico/inicializar', null, {
      params: { reimportar: reimport },
    }),
}
