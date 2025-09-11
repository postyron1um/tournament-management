<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Tournament Pro</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton asChild>
                <RouterLink
                  activeClass="text-red-500"
                  :to="item.url"
                >
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>

<script setup lang="ts">
import { Calendar, Home, Inbox, Search, Settings, Trophy, User, Users } from 'lucide-vue-next'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/core/components/ui/sidebar'

// Menu items.
const items = [
  {
    title: 'Список турниров',
    url: '/tournaments',
    icon: Home,
  },
  // {
  //   title: 'Мои турниры',
  //   url: '#',
  //   icon: Inbox,
  // },
  // {
  //   title: 'Мои команды',
  //   url: '/teams/my',
  //   icon: Users,
  // },
  // {
  //   title: 'Результаты',
  //   url: '/results',
  //   icon: Trophy,
  // },
  {
    title: 'Профиль',
    url: '/profile',
    icon: User,
  },
  // {
  //   title: 'Настройки',
  //   url: '/settings',
  //   icon: Settings,
  // },
]
</script>
