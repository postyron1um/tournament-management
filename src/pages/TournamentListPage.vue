<template>
  <div>
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-6 py-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Trophy class="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 class="text-3xl font-semibold text-gray-900">Турниры и чемпионаты</h1>
              <p class="text-gray-600 mt-1">Выберите турнир или чемпионат для участия</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TournamentList />
  </div>
</template>

<script setup lang="ts">
import TournamentList from '@/modules/tournaments/components/TournamentList.vue'
import { Trophy } from 'lucide-vue-next'
</script>

<style scoped></style>
