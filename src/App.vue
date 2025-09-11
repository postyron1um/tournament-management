<script setup lang="ts">
import AppSidebar from '@/core/components/AppSidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/core/components/ui/sidebar'
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <main class="w-full px-4 flex">
      <SidebarTrigger />
      <div class="w-full">
        <RouterView />
      </div>
    </main>
  </SidebarProvider>
</template>
