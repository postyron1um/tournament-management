<template>
  <Card
    class="bg-white p-5 border-l-blue-600 border-l-3 justify-around cursor-pointer hover:shadow-xl transition-all duration-300"
  >
    <CardHeader class="p-0">
      <div class="flex gap-4 items-center justify-between">
        <div class="flex gap-4 items-center justify-between w-full">
          <CardTitle>{{ tournament.title }}</CardTitle>
          <TournamentStatusBadge :status="tournament.status" />
        </div>
        <ChevronRight class="w-4 h-4 text-gray-500" />
      </div>

      <div class="flex items-center gap-1">
        <Badge variant="outline" class="bg-orange-50 text-orange-700 border-orange-200 mr-2">{{
          tournament.sportType
        }}</Badge>
        <Badge variant="outline" class="bg-purple-50 text-purple-700 border-purple-200 mr-2">{{
          tournament.type === 'team' ? 'Командный' : 'Индивидуальный'
        }}</Badge>
      </div>

      <CardDescription>{{ tournament.description }}</CardDescription>
    </CardHeader>
    <CardContent class="p-0">
      <div class="flex flex-col gap-2">
        <div class="flex justify-between">
          <div class="flex items-center gap-2">
            <Calendar class="w-4 h-4 text-blue-600" />
            <div>
              <p class="text-xs text-gray-900 font-medium">Продолжительность</p>
              <p class="text-xs text-gray-600">
                {{ tournament.dateStart }} - {{ tournament.dateEnd }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <MapPin class="w-4 h-4 text-blue-600" />
            <div>
              <p class="text-xs text-gray-900 font-medium">Локация</p>
              <p class="text-xs text-gray-600">{{ tournament.location }}</p>
            </div>
          </div>
        </div>
        <div class="flex gap-4 items-center">
          <div class="flex items-center gap-2">
            <Users class="w-4 h-4 text-blue-600" />
            <span class="text-xs text-gray-900 font-medium">
              {{ tournament.teamsCount }} Команд</span
            >
          </div>
          <div class="flex items-center gap-2">
            <Trophy class="w-4 h-4 text-gray-500" />
            <span class="text-xs text-gray-600 font-medium">
              {{ tournament.matchesCount }} матчей</span
            >
          </div>
          <div></div>
        </div>
        <div class="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div class="flex items-center gap-2 justify-between mb-2!">
            <span class="text-xs text-blue-800 font-medium">Регистрация открыта</span>
            <span class="text-xs text-blue-600 font-medium"
              >{{ tournament.registeredCount }}/{{ tournament.maxTeams }}</span
            >
          </div>
          <div class="w-full bg-blue-200 rounded-full h-2">
            <div class="bg-blue-600 rounded-full h-2" style="width: 62.5%"></div>
          </div>
        </div>
        <div class="bg-green-50 p-2 text-xs rounded border border-green-200">
          <p class="text-green-700 font-medium">Взнос: {{ tournament.fee }}$</p>
        </div>
      </div>
    </CardContent>
    <CardFooter class="flex p-0 gap-4 flex-wrap">
      <Button variant="success" size="sm" :class="'font-medium'">
        <UserPlus class="w-4 h-4" />
        Регистрация</Button
      >
      <Button variant="outline" size="sm" class="border-blue-600 text-blue-700 font-medium"
        >подробнее</Button
      >
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import Button from '@/core/components/ui/button/Button.vue'
import Card from '@/core/components/ui/card/Card.vue'
import CardContent from '@/core/components/ui/card/CardContent.vue'
import CardDescription from '@/core/components/ui/card/CardDescription.vue'
import CardFooter from '@/core/components/ui/card/CardFooter.vue'
import CardHeader from '@/core/components/ui/card/CardHeader.vue'
import CardTitle from '@/core/components/ui/card/CardTitle.vue'
import { Calendar, ChevronRight, MapPin, Trophy, UserPlus, Users } from 'lucide-vue-next'
import { type ITournamentDTO } from '../types/tournament.dto'
import Badge from '@/core/components/ui/badge/Badge.vue'
import TournamentStatusBadge from '@/core/components/TournamentStatusBadge.vue'

const props = defineProps<{
  tournament: ITournamentDTO
}>()
</script>

<style lang="scss" scoped></style>
