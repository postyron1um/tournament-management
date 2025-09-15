<template>
  <Card class="bg-gray-50 border border-gray-200 hover:shadow-md transition-shadow">
    <CardContent class="p-6">
      <div class="flex items-center space-x-4 mb-4">
        <div
          class="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
          :class="getTeamLogo(team.name)"
        >
          <span>{{ team.name.charAt(0) }}</span>
        </div>
        <div>
          <h3 class="font-semibold text-gray-900">{{ team.name }}</h3>
          <Badge class="bg-blue-100 text-blue-700 border-blue-200 mt-1">
            {{ team.points }} очков
          </Badge>
        </div>
      </div>

      <div class="space-y-2 text-sm">
        <div class="flex justify-between">
          <span class="text-gray-600">Матчи:</span>
          <span class="font-medium text-gray-900">{{ team.matchesPlayed }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Победы:</span>
          <span class="font-medium text-green-600">{{ team.wins }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Ничьи:</span>
          <span class="font-medium text-yellow-600">{{ team.draws }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Поражения:</span>
          <span class="font-medium text-red-600">{{ team.losses }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Разность мячей:</span>
          <span
            class="font-medium"
            :class="team.goalDifference >= 0 ? 'text-green-600' : 'text-red-600'"
          >
            {{ team.goalDifference > 0 ? '+' : '' }}{{ team.goalDifference }}
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/core/components/ui/card/Card.vue'
import CardContent from '@/core/components/ui/card/CardContent.vue'
import Badge from '@/core/components/ui/badge/Badge.vue'

interface Team {
  id: number
  name: string
  points: number
  matchesPlayed: number
  wins: number
  draws: number
  losses: number
  goalDifference: number
}

interface Props {
  team: Team
}

defineProps<Props>()

const getTeamLogo = (teamName: string) => {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-yellow-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-orange-500',
  ]

  const hash = teamName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
}
</script>
