<template>
  <Card class="cursor-pointer gap-1">
    <CardHeader>
      <div class="flex justify-between items-start">
        <div>
          <CardTitle class="text-sm font-medium">
            {{ tournament.title }}
          </CardTitle>
          <CardDescription class="text-sm text-gray-600">
            {{ tournament.description }}
          </CardDescription>
        </div>
        <div class="align-start">
          <Badge
            v-if="tournament.isRegistered"
            variant="outline"
            class="bg-green-100 text-green-800 border-green-300 text-xs"
          >
            Зарегистрирован
          </Badge>
          <Button
            v-else-if="tournament.status === 'registration_open'"
            variant="default"
            size="sm"
            class="border-blue-600 text-white font-medium bg-blue-600 hover:bg-blue-700"
          >
            Регистрация
          </Button>
          <Badge v-else variant="outline" class="bg-gray-50 text-gray-700 border-gray-200">
            {{ tournament.status === 'completed' ? 'Завершен' : 'Регистрация закрыта' }}
          </Badge>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div class="grid grid-cols-[repeat(auto-fit,minmax(150px,250px))] gap-1 items-start">
        <div class="flex items-center space-x-2 w-fit">
          <Calendar class="w-4 h-4 text-blue-600" />
          <div>
            <p class="text-sm text-gray-600">Начало</p>
            <p class="text-sm font-medium">
              {{ new Date(tournament.startDate).toLocaleDateString('ru-RU') }}
            </p>
          </div>
        </div>

        <div class="flex items-center space-x-2 w-fit">
          <MapPin class="w-4 h-4 text-green-600" />
          <div>
            <p class="text-sm text-gray-600">Место</p>
            <p class="text-sm font-medium">{{ tournament.location }}</p>
          </div>
        </div>

        <div class="flex items-center space-x-2 w-fit">
          <Users class="w-4 h-4 text-purple-600" />
          <div>
            <p class="text-sm text-gray-600">Участники</p>
            <p class="text-sm font-medium">
              {{ tournament.currentParticipants }}/{{ tournament.maxParticipants }}
            </p>
          </div>
        </div>

        <div class="flex items-center space-x-2 w-fit">
          <DollarSign class="w-4 h-4 text-orange-600" />
          <div>
            <p class="text-sm text-gray-600">Взнос</p>
            <p class="text-sm font-medium">
              {{ tournament.entryFee ? `${tournament.entryFee} ₽` : 'Бесплатно' }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex items-center space-x-3 mb-2 mt-4">
        <Badge variant="outline" class="bg-orange-50 text-orange-700 border-orange-200">
          {{ getSportLabel(tournament.sportType) }}
        </Badge>
        <Badge variant="outline" class="bg-purple-50 text-purple-700 border-purple-200">
          {{ tournament.type === 'team' ? 'Командный' : 'Индивидуальный' }}
        </Badge>
      </div>
      <div>
        <p class="text-xs text-gray-500">
          {{ tournament?.requirements && `Требования: ${tournament?.requirements}` }}
        </p>
      </div>
    </CardContent>
    <CardFooter>
      <slot name="footer" />
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardFooter } from '@/core/components/ui/card'
import CardHeader from '@/core/components/ui/card/CardHeader.vue'
import { TOURNAMENT_STATUS, type ITournamentDTO } from '../types/tournament.dto'
import { Badge } from '@/core/components/ui/badge'
import Button from '@/core/components/ui/button/Button.vue'
import CardTitle from '@/core/components/ui/card/CardTitle.vue'
import CardDescription from '@/core/components/ui/card/CardDescription.vue'
import { Calendar, DollarSign, MapPin, Users } from 'lucide-vue-next'

const props = defineProps<{
  tournament: ITournamentDTO
}>()

const getSportLabel = (sport: string) => {
  return sport
}
</script>

<style scoped></style>
