<template>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
    <StatCard title="Всего турниров" value="16" variant="title-first">
      <Trophy class="w-8 h-8 text-blue-600" />
    </StatCard>
    <StatCard title="Активные" value="2" variant="title-first">
      <Activity class="w-8 h-8 text-red-600" />
    </StatCard>
    <StatCard title="Побед" value="5" variant="title-first">
      <Medal class="w-8 h-8 text-yellow-600" />
    </StatCard>
    <StatCard title="Процент побед" value="5" variant="title-first">
      <TrendingUp class="w-8 h-8 text-purple-600" />
    </StatCard>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    <Card class="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle class="flex items-center space-x-2">
          <Clock class="w-5 h-5 text-blue-600" />
          <span>Предстоящие матчи</span>
        </CardTitle>
        <CardDescription> Ваши ближайшие игры </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div
            v-for="match in upcomingMatches"
            :key="match.id"
            class="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-200/50 hover:border-blue-300 transition-colors"
            @click="handleMatchClick(match)"
          >
            <div class="flex items-start justify-between mb-2">
              <div>
                <h4 class="font-medium text-gray-900">{{ match.tournament }}</h4>
                <p class="text-sm text-gray-600">vs {{ match.opponent }}</p>
              </div>
              <Badge variant="outline" class="bg-blue-50 text-blue-700 border-blue-200">
                {{ new Date(match.date).toLocaleDateString('ru-RU') }}
              </Badge>
            </div>
            <div class="flex items-center space-x-4 text-sm text-gray-600">
              <div class="flex items-center space-x-1">
                <Clock class="w-4 h-4" />
                <span>{{ match.time }}</span>
              </div>
              <div class="flex items-center space-x-1">
                <MapPin class="w-4 h-4" />
                <span>{{ match.location }}</span>
              </div>
            </div>
          </div>

          <div v-if="upcomingMatches.length === 0" class="text-center py-6">
            <Clock class="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p class="text-gray-600">Нет запланированных матчей</p>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card class="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle class="flex items-center space-x-2">
          <Target class="w-5 h-5 text-green-600" />
          <span>Последние результаты</span>
        </CardTitle>
        <CardDescription> Ваши недавние игры </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-4" v-if="lastResults.length > 0">
          <div
            v-for="match in lastResults"
            :key="match.id"
            class="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-200/50 hover:border-blue-300 transition-colors"
            @click="handleMatchClick(match)"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="flex-1">
                <h4 class="font-medium text-gray-900">{{ match.tournament }}</h4>
                <p class="text-sm text-gray-600">vs {{ match.team2 }}</p>
              </div>
              <div class="flex items-center space-x-2">
                <Badge
                  :variant="getResultBadgeProps(match.result).variant"
                  :class="getResultBadgeProps(match.result).class"
                  class="text-sm text-gray-600 mt-1"
                >
                  {{ getResultText(match.result) }}
                </Badge>
                <Badge
                  variant="outline"
                  :class="getResultBadgeProps(match.result).class"
                  class="text-sm text-gray-600 mt-1"
                  >{{ match.score }}</Badge
                >
                <Badge
                  variant="outline"
                  class="text-sm text-blue-600 bg-blue-50 border-blue-200 mt-1"
                  >{{ formatDate(match.date) }}</Badge
                >
              </div>
            </div>
          </div>
        </div>
        <div v-if="lastResults.length === 0" class="text-center py-6">
          <Clock class="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p class="text-gray-600">Нет недавних результатов</p>
        </div>
      </CardContent>
    </Card>
  </div>
  <Card class="bg-white border border-gray-200 mt-4">
    <CardHeader>
      <CardTitle class="flex items-center space-x-2">
        <Trophy class="w-5 h-5 text-purple-600" />
        <span>Активные турниры</span>
      </CardTitle>
      <CardDescription> Турниры, в которых вы участвуете </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="tournament in activeTournaments"
          :key="tournament.id"
          class="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer hover:shadow-lg hover:shadow-blue-200/50 hover:border-blue-300"
          @click="handleMatchClick(tournament)"
        >
          <div class="flex items-start justify-between mb-3">
            <div class="flex-1">
              <h4 class="font-medium text-gray-900 mb-1">{{ tournament.name }}</h4>
              <div class="flex items-center space-x-2">
                <Badge
                  :class="
                    tournament.position <= 3
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  "
                >
                  {{ tournament.position }} место
                </Badge>
                <span class="text-sm text-gray-600">из {{ tournament.totalTeams }}</span>
              </div>
            </div>
            <ChevronRight class="w-5 h-5 text-gray-400" />
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Матчи:</span>
              <span class="font-medium"
                >{{ tournament.matchesPlayed }}/{{ tournament.totalMatches }}</span
              >
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Следующий матч:</span>
              <span class="font-medium">{{ formatDate(tournament.nextMatch) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTournaments.length === 0" class="text-center py-8">
        <Trophy class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 class="font-medium text-gray-900 mb-2">Нет активных турниров</h3>
        <p class="text-gray-600 mb-4">Присоединитесь к турниру, чтобы начать играть</p>
        <Button @click="handleFindTournaments"> Найти турниры </Button>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Badge } from '@/core/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/core/components/ui/card'
import StatCard from '@/core/components/ui/StatCard.vue'
import {
  Activity,
  ChevronRight,
  Clock,
  MapPin,
  Medal,
  Target,
  TrendingUp,
  Trophy,
} from 'lucide-vue-next'
import type { TTournamenetStatus } from '../types/tournament.dto'
import Button from '@/core/components/ui/button/Button.vue'

const router = useRouter()

interface Match {
  id: number
  tournament: string
  team1: string
  team2: string
  date: string
  time: string
  location: string
}

const upcomingMatches = ref<Match[]>([
  {
    id: 1,
    tournament: 'Кубок Москвы',
    team1: 'Команда "Спартак"',
    team2: 'Команда "Динамо"',
    date: '2024-01-15',
    time: '18:00',
    location: 'Стадион "Лужники"',
  },
  {
    id: 2,
    tournament: 'Чемпионат города',
    team1: 'Команда "Спартак"',
    team2: 'Команда "Динамо"',
    date: '2024-01-20',
    time: '19:30',
    location: 'Спорткомплекс "Олимпийский"',
  },
])


const lastResults = ref<Match[]>([
  {
    id: 1,
    team1: 'Команда "Спартак"',
    tournament: 'Кубок Испании',
    team2: 'Barcelona',
    score: '1-0',
    status: 'completed' as TTournamenetStatus,
    date: '2024-01-15',
    result: 'draw' as TTournamenetStatus,
  },
  {
    id: 2,
    tournament: 'Кубок Англии',
    team1: 'Команда "Спартак"',
    team2: 'Manchester United',
    score: '1-0',
    status: 'completed' as TTournamenetStatus,
    date: '2024-01-15',
    result: 'win' as TTournamenetStatus,
  },
])



// Исправленные методы
const getResultBadgeProps = (result: string) => {
  const badges = {
    win: {
      variant: 'outline' as const,
      class: 'bg-green-50 text-green-700 border-green-200',
    },
    loss: {
      variant: 'outline' as const,
      class: 'bg-red-50 text-red-700 border-red-200',
    },
    draw: {
      variant: 'outline' as const,
      class: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    },
  }

  return badges[result as keyof typeof badges] || badges.draw
}

const getResultText = (result: string) => {
  const texts = {
    win: 'Победа',
    loss: 'Поражение',
    draw: 'Ничья',
  }

  return texts[result as keyof typeof texts] || 'Неизвестно'
}

interface ActiveTournament {
  id: number
  name: string
  position: number
  totalTeams: number
  matchesPlayed: number
  totalMatches: number
  nextMatch: string
}

// Добавьте данные
const activeTournaments = ref<ActiveTournament[]>([
  {
    id: 1,
    name: 'Кубок Москвы',
    position: 2,
    totalTeams: 8,
    matchesPlayed: 3,
    totalMatches: 7,
    nextMatch: '2024-01-20',
  },
  {
    id: 2,
    name: 'Чемпионат города',
    position: 5,
    totalTeams: 12,
    matchesPlayed: 1,
    totalMatches: 11,
    nextMatch: '2024-01-18',
  },
])

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU')
}

const handleFindTournaments = () => {
  router.push('/tournaments')
}

const handleMatchClick = (match: Match) => {
  router.push(`/user/tournaments/${match.id}`)
}
</script>

<style scoped></style>
