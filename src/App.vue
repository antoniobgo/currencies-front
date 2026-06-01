<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="flex items-center justify-between h-14">
          <RouterLink to="/" class="text-base font-bold text-gray-900 flex items-center gap-1.5">
            <span class="text-indigo-600 text-lg">●</span>
            Cotações
          </RouterLink>
          <div class="flex items-center gap-1">
            <RouterLink
              to="/"
              :class="
                route.name === 'dashboard'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              "
              class="text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
            >
              Dashboard
            </RouterLink>
            <RouterLink
              to="/admin"
              :class="
                route.name === 'admin'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              "
              class="text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
            >
              Administração
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <RouterView />
  </div>
</template>
