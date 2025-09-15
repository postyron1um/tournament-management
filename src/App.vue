<template>
  <SidebarProvider>
    <AppSidebar />
    <div class="flex-1 flex flex-col min-h-screen">
      <header class="sticky top-0 z-40 w-full border-b backdrop-blur-3xl">
        <div class="flex h-12 items-center px-4 gap-3">
          <SidebarTrigger
            class="h-8 w-8 rounded-md hover:bg-blue-200 transition-colors flex items-center justify-center cursor-pointer"
          >
            <Menu class="h-4 w-4" />
          </SidebarTrigger>
          <Separator orientation="vertical" class="h-4" />
          <h1 class="text-base font-medium text-gray-900">Турнирная система</h1>
        </div>
      </header>

      <main class="flex-1 p-4">
        <RouterView />
      </main>
    </div>
  </SidebarProvider>
</template>

<script setup lang="ts">
import AppSidebar from '@/core/components/AppSidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/core/components/ui/sidebar'
import { Separator } from '@/core/components/ui/separator'
import { Menu } from 'lucide-vue-next'
</script>
