<template>
  <div v-if="tournament">
    <TournamentHeader :tournament="tournament" />
    <TournamentLiveMatches />
    <div class="max-w-7xl mx-auto px-6 py-8">
      <Tabs default-value="overview" class="space-y-6">
        <TabsList class="grid w-full grid-cols-4 bg-white border border-gray-200 p-0 text-sm! font-medium">
          <TabsTrigger
            value="overview"
            class="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
          >
            Обзор
          </TabsTrigger>
          <TabsTrigger
            value="standings"
            class="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
          >
            Турнирная таблица
          </TabsTrigger>
          <TabsTrigger
            value="matches"
            class="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
          >
            Матчи
          </TabsTrigger>
          <TabsTrigger
            value="teams"
            class="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
          >
            Команды
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview"> overview </TabsContent>
        <TabsContent value="standings"> standings </TabsContent>
      </Tabs>
    </div>
  </div>
  <div v-else>
    <div class="flex flex-col gap-4 justify-center items-center h-screen">
      <div class="text-2xl font-bold text-red-500">Турнир не найден</div>
      <Button variant="outline" @click="router.push('/tournaments')"> Назад</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/core/components/ui/button/Button.vue'
import { type ITournamentDTO } from '../types/tournament.dto'
import TournamentHeader from './TournamentHeader.vue'
import TournamentLiveMatches from './TournamentLiveMatches.vue'
import Tabs from '@/core/components/ui/tabs/Tabs.vue'
import TabsList from '@/core/components/ui/tabs/TabsList.vue'
import TabsTrigger from '@/core/components/ui/tabs/TabsTrigger.vue'
import TabsContent from '@/core/components/ui/tabs/TabsContent.vue'

const route = useRoute()
const tournamentId = route.params['id']
const router = useRouter()

const tournament = ref<ITournamentDTO>()

function getTournamentDetails(): ITournamentDTO {
  // Запрос к API для получения деталей турнира
  console.log('Запрос к API для получения деталей турнира', tournamentId)

  return {
    id: 1,
    title: 'Кубок Москвы',
    description: 'Главный городской турнир по футболу среди любительских команд.',
    dateStart: '2025-10-15',
    dateEnd: '2025-11-20',
    location: 'Москва, Россия',
    teamsCount: 8,
    matchesCount: 16,
    registeredCount: 5,
    maxTeams: 8,
    fee: 1000,
    status: 'registration_open',
    sportType: 'Футбол',
    type: 'team',
  }
}

onMounted(() => {
  tournament.value = getTournamentDetails()
  console.log(tournament.value)
})
</script>

<style scoped></style>
