<template>
  <div>
    <div class="flex flex-wrap items-center gap-2 bg-white p-4 rounded-lg border border-gray-200">
      <Filter class="w-4 h-4 mr-4" />
      <Select>
        <SelectTrigger class="w-[280px]">
          <SelectValue placeholder="Все виды спорта" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все виды спорта</SelectItem>
          <SelectItem value="football">Футбол</SelectItem>
          <SelectItem value="hockey">Хоккей</SelectItem>
          <SelectItem value="volleyball">Волейбол</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger class="w-[280px]">
          <SelectValue placeholder="Все статусы" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все статусы</SelectItem>
          <SelectItem value="active">Активные</SelectItem>
          <SelectItem value="completed">Завершенные</SelectItem>
          <SelectItem value="upcoming">Предстоящие</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger class="w-[280px]">
          <SelectValue placeholder="За все время" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">За все время</SelectItem>
          <SelectItem value="year">За год</SelectItem>
          <SelectItem value="month">За месяц</SelectItem>
          <SelectItem value="week">За неделю</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      <StatCard title="Всего матчей" value="5" variant="title-first">
        <Target class="w-8 h-8 text-blue-600" />
      </StatCard>
      <StatCard title="Побед" value="5" variant="title-first">
        <Medal class="w-8 h-8 text-yellow-600" />
      </StatCard>
      <StatCard title="Ничьи" value="5" variant="title-first">
        <Trophy class="w-8 h-8 text-purple-600" />
      </StatCard>
      <StatCard title="Поражений" value="5" variant="title-first">
        <Target class="w-8 h-8 text-red-600" />
      </StatCard>
    </div>

    <Card class="mt-4">
      <CardHeader class="flex items-center gap-2">
        <BarChart3 class="w-5 h-5 text-blue-600" />
        <CardTitle> Статистика матчей </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 align-center">
          <div class="text-center">
            <div class="text-3xl font-semibold text-green-600">{{ wins }}</div>
            <div class="text-sm text-gray-600">Победы</div>
            <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                class="bg-green-600 h-2 rounded-full"
                :style="{ width: `${totalMatches > 0 ? (wins / totalMatches) * 100 : 0}%` }"
              ></div>
            </div>
          </div>

          <div class="text-center">
            <div class="text-3xl font-semibold text-yellow-600">{{ draws }}</div>
            <div class="text-sm text-gray-600">Ничьи</div>
            <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                class="bg-yellow-600 h-2 rounded-full"
                :style="{ width: `${totalMatches > 0 ? (draws / totalMatches) * 100 : 0}%` }"
              ></div>
            </div>
          </div>

          <div class="text-center">
            <div class="text-3xl font-semibold text-red-600">{{ losses }}</div>
            <div class="text-sm text-gray-600">Поражения</div>
            <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                class="bg-red-600 h-2 rounded-full"
                :style="{ width: `${totalMatches > 0 ? (losses / totalMatches) * 100 : 0}%` }"
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
    <Card class="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle class="flex items-center space-x-2">
          <Trophy class="w-5 h-5 text-purple-600" />
          <span>Результаты турниров</span>
        </CardTitle>
        <CardDescription>
          Ваши позиции в завершенных турнирах
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div
            v-for="tournament in filteredTournaments"
            :key="tournament.id"
            class="p-4 border border-gray-200 rounded-lg"
          >
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center space-x-2">
                <span class="text-lg">{{ getSportEmoji(tournament.sport) }}</span>
                <div>
                  <h4 class="font-medium text-gray-900">{{ tournament.name }}</h4>
                  <p class="text-sm text-gray-600">
                    {{ formatDate(tournament.endDate) }}
                  </p>
                </div>
              </div>
              <component :is="getPositionBadge(tournament.position, tournament.totalTeams)" />
            </div>

            <div class="grid grid-cols-4 gap-4 text-sm">
              <div class="text-center">
                <p class="text-gray-600">Матчи</p>
                <p class="font-medium">{{ tournament.matchesPlayed }}</p>
              </div>
              <div class="text-center">
                <p class="text-gray-600">Победы</p>
                <p class="font-medium text-green-600">{{ tournament.wins }}</p>
              </div>
              <div class="text-center">
                <p class="text-gray-600">Ничьи</p>
                <p class="font-medium text-yellow-600">{{ tournament.draws }}</p>
              </div>
              <div class="text-center">
                <p class="text-gray-600">Поражения</p>
                <p class="font-medium text-red-600">{{ tournament.losses }}</p>
              </div>
            </div>
          </div>

          <div v-if="filteredTournaments.length === 0" class="text-center py-6">
            <Trophy class="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p class="text-gray-600">Нет завершенных турниров</p>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card class="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle class="flex items-center space-x-2">
          <Clock class="w-5 h-5 text-green-600" />
          <span>Последние матчи</span>
        </CardTitle>
        <CardDescription>
          История ваших недавних игр
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div
            v-for="match in filteredMatches.slice(0, 10)"
            :key="match.id"
            class="p-4 border border-gray-200 rounded-lg"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center space-x-2">
                <span>{{ getSportEmoji(match.sport) }}</span>
                <div>
                  <h4 class="font-medium text-gray-900">{{ match.tournament }}</h4>
                  <p class="text-sm text-gray-600">vs {{ match.opponent }}</p>
                </div>
              </div>
              <div class="text-right">
                <component :is="getResultBadge(match.result)" />
                <p class="text-sm text-gray-600 mt-1">{{ match.score }}</p>
              </div>
            </div>
            <p class="text-xs text-gray-500">
              {{ formatDate(match.date) }}
            </p>
          </div>

          <div v-if="filteredMatches.length === 0" class="text-center py-6">
            <Target class="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p class="text-gray-600">Нет матчей</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
  </div>
</template>

<script setup lang="ts">
import {  ref, computed } from 'vue'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/ui/card'
import Card from '@/core/components/ui/card/Card.vue'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select'
import StatCard from '@/core/components/ui/StatCard.vue'
import { BarChart3, Clock, Filter, Medal, Target, Trophy } from 'lucide-vue-next'
import Badge from '@/core/components/ui/badge/Badge.vue'

const wins = ref(4)
const draws = ref(2)
const losses = ref(1)
const totalMatches = computed(() => wins.value + draws.value + losses.value)

interface Tournament {
  id: number
  name: string
  sport: string
  endDate: string
  position: number
  totalTeams: number
  matchesPlayed: number
  wins: number
  draws: number
  losses: number
}

interface Match {
  id: number
  tournament: string
  sport: string
  opponent: string
  result: 'win' | 'loss' | 'draw'
  score: string
  date: string
}


const filteredTournaments = ref<Tournament[]>([
  {
    id: 1,
    name: 'Кубок Москвы',
    sport: 'football',
    endDate: '2024-01-15',
    position: 2,
    totalTeams: 8,
    matchesPlayed: 7,
    wins: 5,
    draws: 1,
    losses: 1
  }
])

const filteredMatches = ref<Match[]>([
  {
    id: 1,
    tournament: 'Кубок Москвы',
    sport: 'football',
    opponent: 'Команда "Спартак"',
    result: 'win',
    score: '3:1',
    date: '2024-01-10'
  }
])


const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU')
}

const getSportEmoji = (sport: string) => {
  const emojis = {
    football: '⚽',
    basketball: '��',
    tennis: '��',
    hockey: '🏒',
    volleyball: '🏐'
  }
  return emojis[sport as keyof typeof emojis] || '🏆'
}

const getPositionBadge = (position: number, totalTeams: number) => {
  const props = {
    variant: 'outline' as const,
    class: position <= 3
      ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
      : 'bg-gray-100 text-gray-800 border-gray-200'
  }

  return {
    component: Badge,
    props,
    content: `${position} из ${totalTeams}`
  }
}

const getResultBadge = (result: string) => {
  const badges = {
    win: {
      component: Badge,
      props: {
        variant: 'outline' as const,
        class: 'bg-green-50 text-green-700 border-green-200'
      },
      content: 'Победа'
    },
    loss: {
      component: Badge,
      props: {
        variant: 'outline' as const,
        class: 'bg-red-50 text-red-700 border-red-200'
      },
      content: 'Поражение'
    },
    draw: {
      component: Badge,
      props: {
        variant: 'outline' as const,
        class: 'bg-yellow-50 text-yellow-700 border-yellow-200'
      },
      content: 'Ничья'
    }
  }

  return badges[result as keyof typeof badges] || badges.draw
}
</script>

<style scoped>
[data-slot='button'] {
  border: 1px solid red;
}

[data-slot='button']:hover {
  border: 1px solid blue;
}
</style>
