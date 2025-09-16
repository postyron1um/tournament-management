<script setup lang="ts">
import type { SelectContentEmits, SelectContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { SelectContent, SelectPortal, SelectViewport, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/core/lib/utils'
import { SelectScrollDownButton, SelectScrollUpButton } from '.'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<
    SelectContentProps & {
      class?: HTMLAttributes['class']
      variant?: 'default' | 'tournament' | 'premium'
    }
  >(),
  {
    position: 'popper',
    variant: 'default',
  },
)
const emits = defineEmits<SelectContentEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'variant')
const forwarded = useForwardPropsEmits(delegatedProps, emits)

const contentClass = computed(() => {
  const baseClasses =
    'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-xl border shadow-lg backdrop-blur-sm'

  const variantClasses = {
    default: 'bg-white border-gray-200 text-gray-900',
    tournament: 'bg-white/95 border-blue-200 text-gray-900 shadow-xl backdrop-blur-md',
    premium: 'bg-gray-900/95 border-gray-700 text-white shadow-2xl backdrop-blur-md',
  }

  const animationClasses =
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'

  const positionClasses =
    props.position === 'popper'
      ? 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1'
      : ''

  return cn(
    baseClasses,
    variantClasses[props.variant],
    animationClasses,
    positionClasses,
    props.class,
  )
})

const viewportClass = computed(() => {
  const baseClasses = 'p-2'
  const positionClasses =
    props.position === 'popper'
      ? 'h-[var(--reka-select-trigger-height)] w-full min-w-[var(--reka-select-trigger-width)] scroll-my-1'
      : ''

  return cn(baseClasses, positionClasses)
})
</script>

<template>
  <SelectPortal>
    <SelectContent
      data-slot="select-content"
      :data-variant="variant"
      v-bind="{ ...forwarded, ...$attrs }"
      :class="contentClass"
    >
      <SelectScrollUpButton class="flex cursor-default items-center justify-center py-1" />

      <SelectViewport :class="viewportClass">
        <slot />
      </SelectViewport>

      <SelectScrollDownButton class="flex cursor-default items-center justify-center py-1" />
    </SelectContent>
  </SelectPortal>
</template>

<style scoped>
/* Кастомные скроллбары */
[data-slot='select-content']::-webkit-scrollbar {
  width: 6px;
}

[data-slot='select-content']::-webkit-scrollbar-track {
  background: transparent;
}

[data-slot='select-content']::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.3);
  border-radius: 3px;
}

[data-slot='select-content']::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.5);
}

/* Анимация появления */
@keyframes slideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

[data-state='open'] {
  animation: slideInFromTop 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
