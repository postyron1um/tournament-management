<template>
  <div class="bg-white border-b border-gray-200">
    <div class="max-w mx-auto px-6 py-8">
      <div class="flex items-center">
        <div class="flex items-center gap-4 w-full">
          <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <Trophy class="w-7 h-7 text-white" />
          </div>
          <div class="flex gap-1 w-full justify-between items-center">
            <div>
              <h1 class="text-2xl font-semibold text-gray-900">{{ tournament?.title }}</h1>
              <p class="text-gray-600 mt-1">{{ tournament?.description }}</p>
              <div class="flex items-center gap-2 mt-2!">
                <TournamentStatusBadge :status="tournament?.status ?? 'registration_open'" />
                <Badge
                  variant="outline"
                  class="bg-orange-50 text-orange-700 border-orange-200 mr-2"
                  >{{ tournament?.sportType }}</Badge
                >
                <Badge
                  variant="outline"
                  class="bg-purple-50 text-purple-700 border-purple-200 mr-2"
                  >{{ tournament?.type === 'team' ? 'Командный' : 'Индивидуальный' }}</Badge
                >

                <div class="flex gap-1">
                  <MapPin class="w-4 h-4 text-gray-600" />
                  <p class="text-sm text-gray-600">{{ tournament?.location }}</p>
                </div>

                <div class="flex gap-1">
                  <Calendar class="w-4 h-4 text-gray-600" />
                  <p class="text-sm text-gray-600">
                    {{ tournament?.dateStart }} - {{ tournament?.dateEnd }}
                  </p>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" @click="goToTournamentList">Другие турниры</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Trophy } from 'lucide-vue-next'
import TournamentStatusBadge from '@/core/components/TournamentStatusBadge.vue'
import Badge from '@/core/components/ui/badge/Badge.vue'
import { MapPin, Calendar } from 'lucide-vue-next'
import Button from '@/core/components/ui/button/Button.vue'
import { type ITournamentDTO } from '../types/tournament.dto'
import { useRouter } from 'vue-router'

const props = defineProps<{
  tournament: ITournamentDTO
}>()

const router = useRouter()

const goToTournamentList = () => {
  router.push('/tournaments')
}

</script>

<style scoped></style>
