<template>
  <div>
    <div>
      <h1 class="text-2xl font-semibold text-gray-900">Список моих турниров</h1>
      <p class="text-gray-600">Турниры, в которых вы участвуете или участвовали</p>
    </div>

    <div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mt-4">
      <Card class="bg-white border border-gray-200 gap-0">
        <CardContent class="px-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-gray-600">Активные турниры</p>
              <p class="text-2xl font-semibold text-gray-900">4</p>
            </div>
            <Target class="w-8 h-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
      <Card class="bg-white border border-gray-200 gap-0">
        <CardContent class="px-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-gray-600">Завершенные</p>
              <p class="text-2xl font-semibold text-gray-900">4</p>
            </div>
            <Trophy class="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      <Card class="bg-white border border-gray-200 gap-0">
        <CardContent class="px-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs text-gray-600">Побед</p>
              <p class="text-2xl font-semibold text-gray-900">4</p>
            </div>
            <Medal class="w-8 h-8 text-yellow-600" />
          </div>
        </CardContent>
      </Card>
    </div>

    <div class="mt-4">
      <Tabs default-value="active" @update:model-value="handleTabChange">
        <TabsList class="grid w-full grid-cols-4 border border-gray-200 p-0 text-xs! font-medium">
          <TabsTrigger
            value="active"
            class="data-[state=active]:bg-white data-[state=active]:text-gray-900 cursor-pointer"
          >
            Активные турниры
          </TabsTrigger>
          <TabsTrigger
            value="upcoming"
            class="data-[state=active]:bg-white data-[state=active]:text-gray-900 cursor-pointer"
          >
            Предстоящие
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            class="data-[state=active]:bg-white data-[state=active]:text-gray-900 cursor-pointer"
          >
            Завершенные
          </TabsTrigger>
          <TabsTrigger
            value="cancelled"
            class="data-[state=active]:bg-white data-[state=active]:text-gray-900 cursor-pointer"
          >
            Отмененные
          </TabsTrigger>
        </TabsList>

        <TournamentCardLK
          v-for="tournament in myTournaments"
          :key="tournament.id"
          :tournament="tournament"
          @click="router.push(`/user/tournaments/${tournament.id}`)"
        >
          <template #footer>
            <ul v-if="tournament.status === 'completed'" class="flex gap-2">
              <li>
                <p class="text-xs text-gray-600">Матчи</p>
                <p class="text-sm font-medium">{{ tournament.matchesCount }}</p>
              </li>
              <li>
                <p class="text-xs text-gray-600">Победы</p>
                <p class="text-xs text-gray-900">{{ tournament?.wins }}</p>
              </li>
              <li>
                <p class="text-xs text-gray-600">Ничьи</p>
                <p class="text-xs text-gray-900">{{ tournament?.draws }}</p>
              </li>
              <li>
                <p class="text-xs text-gray-600">Поражения</p>
                <p class="text-xs text-gray-900">{{ tournament?.losses }}</p>
              </li>
            </ul>
            <div>
              <div v-if="tournament.nextMatch && tournament.status === 'active'" class="mt-3 p-3 bg-blue-50 rounded-lg">
                <div class="flex items-center space-x-2">
                  <Clock class="w-4 h-4 text-blue-600" />
                  <span class="text-sm font-medium text-blue-900">
                    Следующий матч: {{ new Date(tournament.nextMatch).toLocaleDateString('ru-RU') }}
                  </span>
                </div>
              </div>
            </div>
          </template>
        </TournamentCardLK>
      </Tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent } from '@/core/components/ui/card'
import { TabsList, TabsTrigger } from '@/core/components/ui/tabs'
import Tabs from '@/core/components/ui/tabs/Tabs.vue'
import { Clock, Medal, Target, Trophy } from 'lucide-vue-next'
import TournamentCardLK from './TournamentCardLK.vue'
import { useRouter } from 'vue-router'
import type { ITournamentDTO } from '../types/tournament.dto'

const router = useRouter()

const allTournaments = ref<ITournamentDTO[]>([
  {
    id: 1,
    title: 'Кубок Москвы',
    description: 'Главный городской турнир по футболу среди любительских команд.',
    startDate: '2025-10-15',
    endDate: '2025-11-20',
    location: 'Москва, Россия',
    teamsCount: 8,
    matchesCount: 16,
    registeredCount: 5,
    maxTeams: 8,
    entryFee: 0,
    status: 'registration_open',
    sportType: 'Футбол',
    type: 'team',
    isRegistered: true,
    currentParticipants: 5,
    maxParticipants: 8,
    requirements: 'Требования: 18 лет, наличие футбольного оборудования',
  },
  {
    id: 2,
    title: 'Кубок Москвы',
    description: 'Главный городской турнир по футболу среди любительских команд.',
    startDate: '2025-10-15',
    endDate: '2025-11-20',
    location: 'Москва, Россия',
    status: 'completed',
    type: 'team',
    currentParticipants: 5,
    maxParticipants: 8,
    teamsCount: 8,
    matchesCount: 16,
    registeredCount: 5,
    maxTeams: 8,
    entryFee: 0,
    sportType: 'Футбол',
  },
  {
    id: 4,
    title: 'Кубок Уфы',
    description: 'Главный городской турнир по футболу среди любительских команд.',
    startDate: '2025-10-15',
    endDate: '2025-11-20',
    location: 'Москва, Россия',
    status: 'upcoming',
    type: 'team',
    currentParticipants: 5,
    maxParticipants: 8,
    teamsCount: 8,
    matchesCount: 16,
    registeredCount: 5,
    maxTeams: 8,
    entryFee: 0,
    sportType: 'Футбол',
  },
  {
    id: 5,
    title: 'Кубок Ишимбая',
    description: 'Главный городской турнир по футболу среди любительских команд.',
    startDate: '2025-10-15',
    endDate: '2025-11-20',
    location: 'Москва, Россия',
    status: 'active',
    type: 'team',
    currentParticipants: 5,
    maxParticipants: 8,
    teamsCount: 8,
    matchesCount: 16,
    registeredCount: 5,
    maxTeams: 8,
    entryFee: 0,
    sportType: 'Футбол',
  },
  {
    id: 6,
    title: 'Чемпионат Уфы',
    description: 'Главный городской турнир по футболу среди любительских команд.',
    startDate: '2025-10-15',
    endDate: '2025-11-20',
    location: 'Москва, Россия',
    status: 'cancelled',
    type: 'team',
    currentParticipants: 5,
    maxParticipants: 8,
    teamsCount: 8,
    matchesCount: 16,
    registeredCount: 5,
    maxTeams: 8,
    entryFee: 0,
    sportType: 'Футбол',
  },
])

const myTournaments = ref([...allTournaments.value])

const handleTabChange = (tab: string | number) => {
  myTournaments.value = allTournaments.value.filter((tournament) => {
    console.log(tab)
    console.log(tournament.status)
    return tournament.status === tab
  })
}

onMounted(() => {
  handleTabChange('active')
})
</script>

<style scoped></style>
