<template>
  <Badge :class="getStatusBadge(status)" class="" variant="outline">{{
    TOURNAMENT_STATUS[status]
  }}</Badge>
</template>

<script setup lang="ts">
import type { TTournamenetStatus } from '@/modules/tournaments/types/tournament.dto'
import { TOURNAMENT_STATUS } from '@/modules/tournaments/types/tournament.dto'
import Badge from './ui/badge/Badge.vue'

defineProps<{
  status: TTournamenetStatus
}>()

const getStatusBadge = (status: TTournamenetStatus) => {
  switch (status) {
    case 'registration_open':
      return 'bg-blue-50 text-blue-600 border-blue-700'
    case 'registration_closed':
      return 'bg-red-50 text-red-600 border-red-700'
    case 'completed':
      return 'bg-green-50 text-green-600 border-green-700'
    case 'cancelled':
      return 'bg-gray-50 text-gray-600 border-gray-700'
    default:
      return 'bg-blue-50 text-blue-600 border-blue-700'
  }
}
</script>

<style scoped></style>
