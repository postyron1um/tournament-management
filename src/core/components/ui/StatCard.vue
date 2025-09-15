<template>
  <Card>
    <CardContent>
      <div class="flex gap-2 items-center justify-between">
        <div v-if="props.variant === 'value-first'">
          <div class="text-2xl font-bold">{{ value }}</div>
          <div class="text-xs text-gray-500 mt-1">{{ title }}</div>
        </div>
        <div v-else-if="props.variant === 'title-first'">
          <div class="text-xs text-gray-500 mt-1">{{ title }}</div>
          <div class="text-2xl font-bold">{{ value }}</div>
        </div>
        <slot />
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/core/components/ui/card/Card.vue'
import CardContent from '@/core/components/ui/card/CardContent.vue'

const props = withDefaults(
  defineProps<{
    title: string
    value: number | string
    variant?: 'value-first' | 'title-first'
  }>(),
  {
    variant: 'value-first',
  },
)
</script>

<style lang="scss" scoped></style>
