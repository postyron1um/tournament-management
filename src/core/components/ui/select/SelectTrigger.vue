<script setup lang="ts">
import type { SelectTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ChevronDown } from 'lucide-vue-next'
import { SelectIcon, SelectTrigger, useForwardProps } from 'reka-ui'
import { cn } from '@/core/lib/utils'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<
    SelectTriggerProps & {
      class?: HTMLAttributes['class']
      size?: 'sm' | 'default' | 'lg'
      variant?: 'default' | 'tournament'
      disabled?: boolean
    }
  >(),
  {
    size: 'default',
    variant: 'default',
  },
)

const delegatedProps = reactiveOmit(props, 'class', 'size', 'variant')
const forwardedProps = useForwardProps(delegatedProps)

const iconClass = computed(() => {
  const baseClasses = 'transition-transform duration-200 ease-in-out'
  const sizeClasses = {
    sm: 'size-3.5',
    default: 'size-4',
    lg: 'size-5',
  }

  return cn(baseClasses, sizeClasses[props.size])
})

const triggerClass = computed(() => {
  const baseClasses =
    'relative flex items-center justify-between gap-3 rounded-lg border transition-all duration-200 ease-in-out outline-none disabled:cursor-not-allowed disabled:opacity-50'

  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    default: 'h-10 px-4 text-sm',
    lg: 'h-12 px-5 text-base',
  }

  const variantClasses = {
    default:
      'bg-white border-gray-200 text-gray-900 hover:border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:border-blue-500',
    tournament:
      'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 text-gray-900 hover:from-blue-100 hover:to-purple-100 hover:border-blue-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:border-blue-500 shadow-sm',
  }

  const disabledClasses = props.disabled
    ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
    : ''

  return cn(
    baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant],
    disabledClasses,
    props.class,
  )
})
</script>

<template>
  <SelectTrigger
    data-slot="select-trigger"
    :data-size="size"
    :data-variant="variant"
    v-bind="forwardedProps"
    :class="triggerClass"
  >
    <div class="flex items-center gap-2 min-w-0 flex-1">
      <slot />
    </div>

    <SelectIcon as-child>
      <div class="flex items-center justify-center">
        <ChevronDown :class="iconClass" />
      </div>
    </SelectIcon>
  </SelectTrigger>
</template>

<style lang="scss">
[data-slot='select-trigger']:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

[data-variant='tournament']:hover {
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
}

[data-slot='select-trigger']:focus {
  outline: none;
  box-shadow: none;
  ring: none;
}

[data-slot='select-trigger']:focus-visible {
  outline: none;
}



</style>
