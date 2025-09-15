<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
    <TournamentCard
      v-for="tournament in tournaments"
      :key="tournament.id"
      :tournament="tournament"
      @click="router.push(`/tournaments/${tournament.id}`)"
    />
  </div>
</template>

<script setup lang="ts">
import type { ITournamentDTO } from '../types/tournament.dto'
import TournamentCard from './TournamentCard.vue'

const tournaments: ITournamentDTO[] = [
  {
    id: 1,
    title: 'Кубок Москвы',
    description: 'Главный городской турнир по футболу среди любительских команд.',
    startDate: '2025-10-15',
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
  },
  {
    id: 2,
    title: 'Зимний чемпионат СПб',
    description: 'Зимние соревнования по баскетболу среди университетских команд.',
    startDate: '2025-12-01',
    endDate: '2026-01-15',
    location: 'Санкт-Петербург, Россия',
    teamsCount: 12,
    matchesCount: 24,
    registeredCount: 12,
    maxTeams: 12,
    fee: 500,
    status: 'registration_closed',
    sportType: 'Баскетбол',
    type: 'team',
  },
  {
    id: 3,
    title: 'Киберлига 2025',
    description: 'Турнир по CS:GO среди профессиональных и полупрофессиональных команд.',
    startDate: '2025-09-20',
    endDate: '2025-10-05',
    location: 'Казань, Россия',
    teamsCount: 16,
    matchesCount: 32,
    registeredCount: 10,
    maxTeams: 16,
    fee: 200,
    status: 'registration_open',
    sportType: 'Киберлига',
    type: 'team',
  },
]

const router = useRouter()
</script>

<style scoped></style>
