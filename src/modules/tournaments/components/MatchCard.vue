<template>
  <div
    class="rounded-lg p-2 hover:bg-blue-50 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/50 hover:border-blue-300 border border-transparent"
  >
    <div class="grid grid-cols-3 items-center gap-2 sm:gap-4">
      <!-- Команда 1 -->
      <div class="text-center min-w-0">
        <div
          class="w-6 h-6 sm:w-8 sm:h-8 text-white rounded-full flex items-center justify-center mb-1 sm:mb-2 mx-auto text-xs sm:text-sm"
          :class="team1Color"
        >
          {{ team1ShortName }}
        </div>
        <div class="text-xs sm:text-xs text-gray-900 font-medium truncate" :title="team1Name">
          {{ team1Name }}
        </div>
      </div>

      <!-- Центральная часть -->
      <div class="text-center">
        <slot name="center" :props="centerProps">
          <div v-if="variant === 'score' && status !== 'cancelled'" class="text-lg sm:text-xl text-gray-900 font-bold">
            {{ score }}
          </div>
          <div v-else-if="variant === 'vs'" class="text-lg sm:text-xl text-gray-500">VS</div>
          <div v-else-if="variant === 'time'" class="text-lg sm:text-xl text-gray-900 font-bold">
            {{ time }}
          </div>

          <Badge
            v-if="props.status"
            variant="outline"
            class="bg-green-50 text-green-700 border-green-200"
            :class="
              status === 'completed'
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-red-50 text-red-700 border-red-200'
            "
          >
            {{ TOURNAMENT_STATUS[status as keyof typeof TOURNAMENT_STATUS] }}
          </Badge>
        </slot>

        <div v-if="showDate" class="text-sm text-neutral-600 mt-1">
          {{ formattedDate }}
        </div>

        <div v-if="subtitle" class="text-xs text-gray-500 mt-1">{{ subtitle }}</div>
      </div>

      <!-- Команда 2 -->
      <div class="text-center min-w-0">
        <div
          class="w-6 h-6 sm:w-8 sm:h-8 text-white rounded-full flex items-center justify-center mb-1 sm:mb-2 mx-auto text-xs sm:text-xs"
          :class="team2Color"
        >
          {{ team2ShortName }}
        </div>
        <div class="text-xs sm:text-xs text-gray-900 font-medium truncate" :title="team2Name">
          {{ team2Name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Badge from '@/core/components/ui/badge/Badge.vue'
import { TOURNAMENT_STATUS, type TTournamenetStatus } from '../types/tournament.dto'

interface Props {
  team1Name: string
  team2Name: string
  team1ShortName?: string
  team2ShortName?: string
  team1Color?: string
  team2Color?: string
  variant?: 'score' | 'vs' | 'time' | 'status'
  score?: string
  time?: string
  status?: TTournamenetStatus

  subtitle?: string
  date?: string | Date
  showDate?: boolean
  dateFormat?: 'short' | 'long' | 'relative'
}

const props = withDefaults(defineProps<Props>(), {
  team1ShortName: 'T1',
  team2ShortName: 'T2',
  team1Color: 'bg-red-500',
  team2Color: 'bg-green-500',
  variant: 'score',
  score: '0-0',
  time: '15:30',
  showDate: false,
  dateFormat: 'short',
})

const formattedDate = computed(() => {
  if (!props.date) return ''

  const date = new Date(props.date)

  switch (props.dateFormat) {
    case 'short':
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short',
      })
    case 'long':
      return date.toLocaleDateString('ru-RU', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    case 'relative':
      return getRelativeDate(date)
    default:
      return date.toLocaleDateString('ru-RU')
  }
})

const getRelativeDate = (date: Date) => {
  const now = new Date()
  const diffTime = date.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Сегодня'
  if (diffDays === 1) return 'Завтра'
  if (diffDays === -1) return 'Вчера'
  if (diffDays > 1) return `Через ${diffDays} дн.`
  if (diffDays < -1) return `${Math.abs(diffDays)} дн. назад`

  return date.toLocaleDateString('ru-RU')
}
const statusText = computed(() => {
  switch (props.status) {
    case 'live':
      return 'В прямом эфире'
    case 'completed':
      return 'Завершен'
    case 'upcoming':
      return 'Скоро'
    default:
      return ''
  }
})

const centerProps = computed(() => ({
  variant: props.variant,
  score: props.score,
  time: props.time,
  status: props.status,
  statusText: statusText.value,
}))
</script>

<style scoped></style>
