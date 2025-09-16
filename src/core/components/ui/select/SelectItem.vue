<script setup lang="ts">
import type { SelectItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Check, ChevronRight } from 'lucide-vue-next'
import { SelectItem, SelectItemIndicator, SelectItemText, useForwardProps } from 'reka-ui'
import { cn } from '@/core/lib/utils'

const props = defineProps<
  SelectItemProps & {
    class?: HTMLAttributes['class']
    variant?: 'default' | 'tournament' | 'premium'
    icon?: any
    description?: string
  }
>()

const delegatedProps = reactiveOmit(props, 'class', 'variant', 'icon', 'description')
const forwardedProps = useForwardProps(delegatedProps)

const itemClass = computed(() => {
  const baseClasses =
    'relative flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm outline-none transition-all duration-150 ease-in-out select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50'

  const variantClasses = {
    default: 'hover:bg-gray-100 focus:bg-gray-100 data-[highlighted]:bg-gray-100 text-gray-900',
    tournament:
      'hover:bg-blue-50 focus:bg-blue-50 data-[highlighted]:bg-blue-50 text-gray-900 hover:text-blue-900',
    premium:
      'hover:bg-gray-800 focus:bg-gray-800 data-[highlighted]:bg-gray-800 text-white hover:text-gray-100',
  }

  return cn(baseClasses, variantClasses[props.variant || 'default'], props.class)
})

const indicatorClass = computed(() => {
  const baseClasses =
    'absolute right-3 flex size-4 items-center justify-center transition-all duration-150'

  const variantClasses = {
    default: 'text-blue-600',
    tournament: 'text-blue-600',
    premium: 'text-white',
  }

  return cn(baseClasses, variantClasses[props.variant || 'default'])
})
</script>

<template>
  <SelectItem
    data-slot="select-item"
    :data-variant="variant"
    v-bind="forwardedProps"
    :class="itemClass"
  >
    <!-- Иконка слева -->
    <div v-if="icon" class="flex-shrink-0">
      <component :is="icon" class="size-4" />
    </div>

    <!-- Основной контент -->
    <div class="flex-1 min-w-0">
      <SelectItemText class="block">
        <slot />
      </SelectItemText>
      <p v-if="description" class="text-xs opacity-70 mt-0.5 truncate">
        {{ description }}
      </p>
    </div>

    <!-- Индикатор выбора -->
    <div :class="indicatorClass">
      <SelectItemIndicator>
        <Check class="size-4" />
      </SelectItemIndicator>
    </div>
  </SelectItem>
</template>

<style scoped>
/* Анимация при наведении */
[data-slot='select-item']:hover {
  transform: translateX(2px);
}

[data-variant='tournament']:hover {
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
}

[data-variant='premium']:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* Анимация индикатора */
[data-slot='select-item'] [data-slot='select-item-indicator'] {
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.15s ease-in-out;
}

[data-slot='select-item'][data-highlighted] [data-slot='select-item-indicator'],
[data-slot='select-item'][data-state='checked'] [data-slot='select-item-indicator'] {
  opacity: 1;
  transform: scale(1);
}
</style>
