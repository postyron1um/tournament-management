<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      <StatCard title="Команд" value="16">
        <Users class="text-blue-600" />
      </StatCard>
      <StatCard title="Матчей" value="31">
        <Trophy class="w-8 h-8 text-green-600" />
      </StatCard>
      <StatCard title="Завершено" value="31">
        <Award class="w-8 h-8 text-purple-600" />
      </StatCard>
      <StatCard title="В прямом эфире" value="31">
        <Activity class="w-8 h-8 text-red-600" />
      </StatCard>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card class="bg-transparent rounded-lg border border-gray-200 gap-0">
        <CardHeader class="border-b border-gray-200 bg-gray-50">
          <CardTitle class="flex items-center gap-2 text-xs">
            <Clock class="w-5 h-5 text-blue-500" />
            <span>Предстоящие матчи</span>
          </CardTitle>
        </CardHeader>
        <CardContent class="p-3">
          <div class="space-y-2">
            <MatchCard
              :team1-name="'Real Madrid'"
              :team2-name="'Barcelona'"
              variant="vs"
              :show-date="true"
              date-format="long"
              :date="'2025-01-15T20:00:00'"
            />
            <MatchCard
              :team1-name="'PSG'"
              :team2-name="'Bayern'"
              variant="vs"
              :show-date="true"
              date-format="short"
              :date="'2025-01-16T18:00:00'"
            />
            <MatchCard
              :team1-name="'Liverpool'"
              :team2-name="'Chelsea'"
              variant="vs"
              :show-date="true"
              date-format="relative"
              :date="'2025-10-17T19:30:00'"
            />
          </div>
        </CardContent>
      </Card>
      <Card class="bg-transparent rounded-lg border border-gray-200">
        <CardHeader class="border-b border-gray-200 bg-gray-50">
          <CardTitle class="flex items-center gap-2 text-xs">
            <Target class="w-5 h-5 text-green-600" />
            <span> Лидеры турнира</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul class="flex flex-col gap-3">
            <li
              v-for="(team, index) in teams"
              :key="team.id"
              class="rounded-lg p-4 hover:bg-blue-50 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/50 hover:border-blue-300 border border-transparent border-b-gray-200"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                    :class="team.color"
                  >
                    {{ index + 1 }}
                  </div>
                  <div class="text-sm font-medium text-gray-900">{{ team.name }}</div>
                </div>
                <div class="flex items-center space-x-4">
                  <Badge variant="outline" class="bg-blue-100 border-blue-200 text-blue-700">
                    {{ team.points }} очков
                  </Badge>
                  <span
                    class="text-xs"
                    :class="team.goalDifference >= 0 ? 'text-green-600' : 'text-red-600'"
                  >
                    {{ team.goalDifference > 0 ? '+' : '' }}{{ team.goalDifference }}
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
    <section class="mt-4">
      <Card>
        <CardHeader> Последние результаты </CardHeader>
        <CardContent>
          <ul class="grid grid-cols-3 gap-6">
            <li
              v-for="result in lastResults"
              :key="result.id"
              class="bg-green-50 rounded-xl border-green-200 border-2"
              :class="{
                'bg-green-50 border-green-200': result.status === 'completed',
                'bg-red-50 border-red-200': result.status === 'cancelled',
              }"
            >
              <MatchCard
                :team1-name="'Real Madrid'"
                :team2-name="'Barcelona'"
                variant="score"
                :score="'1-0'"
                :show-date="true"
                :status="result.status"
              />
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  </div>
</template>

<script setup lang="ts">
import Card from '@/core/components/ui/card/Card.vue'
import CardContent from '@/core/components/ui/card/CardContent.vue'
import CardHeader from '@/core/components/ui/card/CardHeader.vue'
import CardTitle from '@/core/components/ui/card/CardTitle.vue'
import StatCard from '@/core/components/ui/StatCard.vue'
import { Activity, Award, Clock, Target, Trophy, Users } from 'lucide-vue-next'
import MatchCard from './MatchCard.vue'
import Badge from '@/core/components/ui/badge/Badge.vue'
import type { TTournamenetStatus } from '../types/tournament.dto'

const lastResults = [
  {
    id: 1,
    team1: 'Real Madrid',
    team2: 'Barcelona',
    score: '1-0',
    status: 'completed' as TTournamenetStatus,
  },
  {
    id: 2,
    team1: 'Real Madrid',
    team2: 'Barcelona',
    score: '1-0',
    status: 'cancelled' as TTournamenetStatus,
  },
]

const teams = [
  {
    id: 1,
    name: 'Real Madrid',
    color: 'bg-red-500',
    points: 10,
    goalDifference: 1,
  },
  {
    id: 2,
    name: 'Barcelona',
    color: 'bg-green-500',
    points: 9,
    goalDifference: 1,
  },

  {
    id: 3,
    name: 'Manchester United',
    color: 'bg-blue-500',
    points: 8,
    goalDifference: -1,
  },
]
</script>

<style scoped></style>
