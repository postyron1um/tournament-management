<template>
  <div>
    <h1 class="text-2xl font-semibold text-gray-900">Список турниров</h1>
    <p class="text-gray-600">Найдите и присоединитесь к турнирам</p>
  </div>

  <Card class="bg-white border border-gray-200 mt-4">
    <CardContent class="p-4">
      <div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        <div>
          <div class="relative">
            <Search
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
            />
            <Input placeholder="Поиск турниров..." value="{searchTerm}" class="pl-10" />
          </div>
        </div>

        <Select value="{filterSport}"  onValueChange="{setFilterSport} ">
          <SelectTrigger class="w-[100%]">
            <SelectValue placeholder="Вид спорта" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все виды спорта</SelectItem>
            <SelectItem value="football">⚽ Футбол</SelectItem>
            <SelectItem value="hockey">🏒 Хоккей</SelectItem>
            <SelectItem value="volleyball">🏐 Волейбол</SelectItem>
          </SelectContent>
        </Select>

        <Select value="{filterStatus}" onValueChange="{setFilterStatus}">
          <SelectTrigger class="w-[100%]">
            <SelectValue placeholder="Статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все статусы</SelectItem>
            <SelectItem value="upcoming">Предстоящие</SelectItem>
            <SelectItem value="active">Активные</SelectItem>
            <SelectItem value="completed">Завершенные</SelectItem>
          </SelectContent>
        </Select>

        <Select value="{filterDifficulty}" onValueChange="{setFilterDifficulty}">
          <SelectTrigger class="w-[100%]">
            <SelectValue placeholder="Уровень" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все уровни</SelectItem>
            <SelectItem value="beginner">Начинающий</SelectItem>
            <SelectItem value="intermediate">Средний</SelectItem>
            <SelectItem value="advanced">Продвинутый</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  </Card>

  <div class="grid grid-cols-1 gap-4 py-6">
    <TournamentCardLK
      v-for="tournament in tournaments"
      :key="tournament.id"
      :tournament="tournament"
      @click="router.push(`/user/tournaments/${tournament.id}`)"
    />
  </div>
</template>

<script setup lang="ts">
import CardContent from '@/core/components/ui/card/CardContent.vue'
import type { ITournamentDTO } from '../types/tournament.dto'
import TournamentCardLK from './TournamentCardLK.vue'
import { Card } from '@/core/components/ui/card'
import { Input } from '@/core/components/ui/input'
import { Search } from 'lucide-vue-next'
import Select from '@/core/components/ui/select/Select.vue'
import SelectTrigger from '@/core/components/ui/select/SelectTrigger.vue'
import SelectValue from '@/core/components/ui/select/SelectValue.vue'
import SelectContent from '@/core/components/ui/select/SelectContent.vue'
import SelectItem from '@/core/components/ui/select/SelectItem.vue'

const tournaments: ITournamentDTO[] = [
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
    title: 'Зимний чемпионат СПб',
    description: 'Зимние соревнования по баскетболу среди университетских команд.',
    startDate: '2025-12-01',
    endDate: '2026-01-15',
    location: 'Санкт-Петербург, Россия',
    teamsCount: 12,
    matchesCount: 24,
    registeredCount: 12,
    maxTeams: 12,
    entryFee: 500,
    status: 'registration_open',
    sportType: 'Баскетбол',
    type: 'team',
    isRegistered: false,
    currentParticipants: 12,
    maxParticipants: 12,
    requirements: 'Требования: 18 лет, наличие баскетбольного оборудования',
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
    entryFee: 200,
    status: 'registration_open',
    sportType: 'Киберлига',
    type: 'team',
    isRegistered: true,
    currentParticipants: 10,
    maxParticipants: 16,
    requirements: 'Требования: 18 лет, наличие компьютерного оборудования',
  },
]

const router = useRouter()
</script>

<style scoped></style>
