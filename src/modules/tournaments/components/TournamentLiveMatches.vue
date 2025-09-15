<template>
  <div class="bg-red-50 border-red-200 border-b">
    <div class="px-4 py-6">
      <div class="flex items-center gap-2 mb-2">
        <Activity class="w-5 h-5 text-red-600" />
        <p class="text-red-600 font-medium text-[14px]">Матчи в прямом эфире</p>
      </div>
      <div class="grid grid-cols-[repeat(auto-fit,minmax(250px,300px))] gap-4">
        <div class="bg-white rounded-xl p-4 border border-red-200">
          <div class="flex justify-between mb-2">
            <Badge variant="outline" class="bg-red-100 text-red-700 border-red-200">LIVE</Badge>
            <Badge variant="outline" class="bg-green-100 text-green-700 border-green-20"
              >44:35</Badge
            >
          </div>
          <div class="grid grid-cols-3 items-center gap-2 sm:gap-4">
            <!-- Команда 1 -->
            <div class="text-center min-w-0">
              <div
                class="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 text-white rounded-full flex items-center justify-center mb-1 sm:mb-2 mx-auto text-xs sm:text-sm"
              >
                T1
              </div>
              <div class="text-xs sm:text-xs text-gray-900 font-medium">Very Long Team Name</div>
            </div>

            <!-- Счет -->
            <div class="text-center">
              <div class="text-lg sm:text-xl text-gray-900 font-bold">0-0</div>
            </div>

            <!-- Команда 2 -->
            <div class="text-center min-w-0">
              <div
                class="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 text-white rounded-full flex items-center justify-center mb-1 sm:mb-2 mx-auto text-xs sm:text-xs"
              >
                T2
              </div>
              <div class="text-xs sm:text-xs text-gray-900 font-medium">
                Another Very Long Team Name
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Activity } from 'lucide-vue-next'
import Badge from '@/core/components/ui/badge/Badge.vue'
</script>

<style scoped></style>
