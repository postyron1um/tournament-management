<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center justify-between">
        <span>Матчи</span>
        <div class="flex gap-2">
          <Button variant="outline" size="sm">Фильтр</Button>
          <Button variant="outline" size="sm">Все матчи</Button>
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent class="p-0">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Дата</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Команды
              </th>
              <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Счет
              </th>
              <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Статус
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="match in matches" :key="match.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-4 py-3">
                <div class="text-sm text-gray-900">{{ formatDate(match.date) }}</div>
                <div class="text-xs text-gray-500">{{ formatTime(match.date) }}</div>
              </td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                  <div
                    class="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold"
                  >
                    {{ match.team1ShortName }}
                  </div>
                  <span class="text-sm font-medium">{{ match.team1Name }}</span>
                  <span class="text-gray-400">vs</span>
                  <span class="text-sm font-medium">{{ match.team2Name }}</span>
                  <div
                    class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold"
                  >
                    {{ match.team2ShortName }}
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-center">
                <span class="text-lg font-bold text-gray-900">{{ match.score }}</span>
              </td>
              <td class="px-4 py-3 text-center">
                <span
                  class="px-2 py-1 rounded-full text-xs font-medium"
                  :class="getStatusClasses(match.status)"
                >
                  {{ getStatusText(match.status) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card'
import MatchCard from './MatchCard.vue'

const matches = [
  {
    id: 1,
    date: '2025-01-15T20:00:00',
    team1Name: 'Real Madrid',
    team2Name: 'Barcelona',
    score: '1-0',
    status: 'completed',
  },
  {
    id: 2,
    date: '2025-01-16T18:30:00',
    team1Name: 'Спартак',
    team2Name: 'ЦСКА',
    team1ShortName: 'СПМ',
    team2ShortName: 'ЦСК',
    score: '2-2',
    status: 'completed'
  },
  {
    id: 3,
    date: '2025-01-17T19:00:00',
    team1Name: 'Локомотив',
    team2Name: 'Динамо',
    team1ShortName: 'ЛОК',
    team2ShortName: 'ДИН',
    score: '0-1',
    status: 'completed'
  },
  {
    id: 4,
    date: '2025-01-18T20:00:00',
    team1Name: 'Зенит',
    team2Name: 'Краснодар',
    team1ShortName: 'ЗЕН',
    team2ShortName: 'КРД',
    score: '3-0',
    status: 'completed'   
  },
  {
    id: 5,
    date: '2025-01-19T17:00:00',
    team1Name: 'Ростов',
    team2Name: 'Рубин',
    team1ShortName: 'РОС',
    team2ShortName: 'РУБ',
    score: '-',
    status: 'cancelled'
  }
]

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ru-RU')
}

const getStatusClasses = (status: string) => {
  return status === 'completed' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
}

const getStatusText = (status: string) => {
  return status === 'completed' ? 'Завершен' : 'Отменен'
}

const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString('ru-RU')
}
</script>

<style scoped></style>
