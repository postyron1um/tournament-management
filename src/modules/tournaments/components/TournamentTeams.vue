<template>
  <Card class="bg-white border border-gray-200">
    <CardHeader class="border-b border-gray-200 bg-gray-50">
      <CardTitle>Команды турнира</CardTitle>
      <CardDescription>{{ teams.length }} команд участвуют в турнире</CardDescription>
    </CardHeader>
    <CardContent class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TeamCard v-for="team in teams" :key="team.id" :team="team" />
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card'
import TeamCard from './TeamCard.vue'

const teams = [
  {
    id: 1,
    name: 'Команда 1',
    points: 100,
    matchesPlayed: 10,
    wins: 8,
    draws: 1,
    losses: 1,
    goalDifference: 17,
  },
  {
    id: 2,
    name: 'Команда 2',
    points: 90,
    matchesPlayed: 10,
    wins: 7,
    draws: 2,
    losses: 1,
    goalDifference: 12,
  },
  {
    id: 3,
    name: 'Команда 3',
    points: 80,
    matchesPlayed: 10,
    wins: 6,
    draws: 3,
    losses: 1,
    goalDifference: 9,
  },
]
</script>

<style scoped></style>
