<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '.'
import { Primitive } from 'reka-ui'
import { cn } from '@/core/lib/utils'
import { buttonVariants } from '.'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']

  loading?: boolean
  disabled?: boolean
  autoLoading?: boolean
  fullWidth?: boolean
  tooltip?: string
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  loading: false,
  disabled: false,
  iconPosition: 'left',
  fullWidth: false,
  autoLoading: false,
})

const emit = defineEmits<{

  click: [event: MouseEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  mouseenter: [event: MouseEvent]

  loadingStart: []
  loadingEnd: []
  variantChange: [variant: string]
}>()

const internalLoading = ref(false)

const handleClick = async (event: MouseEvent) => {
  if (props.autoLoading) {
    internalLoading.value = true
    emit('loadingStart')
  }

  emit('click', event)

  // Симуляция асинхронной операции
  if (props.autoLoading) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    internalLoading.value = false
    emit('loadingEnd')
  }
}

// Отслеживание изменений
watch(
  () => props.loading,
  (newVal) => {
    internalLoading.value = newVal
  },
)
</script>

<template>
  <Primitive
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :disabled="disabled || loading"
    :class="
      cn(
        buttonVariants({ variant, size }),
        {
          'w-full': fullWidth,
          'opacity-50 cursor-not-allowed': loading,
        },
        props.class,
      )
    "
    v-on="{
      click: handleClick,
      focus: (e: FocusEvent) => emit('focus', e),
      blur: (e: FocusEvent) => emit('blur', e),
      mouseenter: (e: MouseEvent) => emit('mouseenter', e),
    }"
  >
    <slot />

    <!-- Лоадер -->
    <!-- <Spinner v-if="loading" class="ml-2" /> -->
  </Primitive>
</template>
