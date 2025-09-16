<template>
  <Sidebar class="border-r">
    <SidebarContent>
      <!-- Логотип и название -->
      <SidebarGroup>
        <SidebarGroupContent>
          <div class="flex items-center gap-2 px-2 py-4">
            <div
              class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
            >
              <Trophy class="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 class="text-lg font-bold text-gray-900">Tournament Pro</h2>
              <p class="text-xs text-gray-500">
                {{ userRole === 'admin' ? 'Админ панель' : 'Участник' }}
              </p>
            </div>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>

      <!-- Админ меню (только для админов) -->
      <SidebarGroup v-if="userRole === 'admin'">
        <SidebarGroupLabel>Управление</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in adminMenuItems" :key="item.title">
              <button
                @click="handleMenuClick(item.url)"
                class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors cursor-pointer"
                :class="
                  isActive(item.url)
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                "
              >
                <component :is="item.icon" class="w-5 h-5" />
                <span class="font-medium">{{ item.title }}</span>
              </button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <!-- Пользователь меню -->
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in userMenuItems" :key="item.title">
              <button
                @click="handleMenuClick(item.url)"
                class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors cursor-pointer"
                :class="
                  isActive(item.url)
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                "
              >
                <component :is="item.icon" class="w-5 h-5" />
                <span class="font-medium">{{ item.title }}</span>
              </button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <!-- Выход -->
      <SidebarGroup class="mt-auto">
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <button
                @click="handleLogout"
                class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut class="w-5 h-5" />
                <span class="font-medium">Выйти</span>
              </button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Calendar,
  Home,
  Trophy,
  User,
  Users,
  Settings,
  Plus,
  BarChart,
  UserCheck,
  LogOut,
  Shield,
  Gamepad2,
} from 'lucide-vue-next'
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

const route = useRoute()
const router = useRouter()

// Моковая роль пользователя (в реальном приложении из store)
const userRole = ref<'participant' | 'admin'>('participant')

// Основное меню (для всех ролей)
const mainMenuItems = [
  {
    title: 'Список турниров',
    url: '/user/tournaments',
    icon: Trophy,
  },
]

// Админ меню (только для админов)
const adminMenuItems = [
  ...mainMenuItems,
  {
    title: 'Создать турнир',
    url: '/admin/tournaments/create',
    icon: Plus,
  },
  {
    title: 'Управление командами',
    url: '/admin/teams',
    icon: Users,
  },
  {
    title: 'Управление матчами',
    url: '/admin/matches',
    icon: Calendar,
  },
  {
    title: 'Пользователи',
    url: '/admin/users',
    icon: UserCheck,
  },
  {
    title: 'Настройки системы',
    url: '/admin/settings',
    icon: Settings,
  },
]

// Пользовательское меню
const userMenuItems = computed(() => {
  const baseItems = [...mainMenuItems]

  if (userRole.value === 'participant') {
    return [
      {
        title: 'Главная',
        url: '/user/main',
        icon: Home,
      },
      ...baseItems,

      {
        title: 'Мои турниры',
        url: '/user/my-tournaments',
        icon: Gamepad2,
      },
      {
        title: 'Результаты',
        url: '/user/my-results',
        icon: BarChart,
      },
      {
        title: 'Профиль',
        url: '/profile',
        icon: User,
      },
    ]
  }

  return baseItems
})

// Проверка активного пункта меню
const isActive = (url: string) => {
  return route.path === url || route.path.startsWith(url + '/')
}

// Обработка клика по меню
const handleMenuClick = (url: string) => {
  router.push(url)
}

// Обработка выхода
const handleLogout = () => {
  // Логика выхода
  console.log('Выход из системы')
  router.push('/login')
}
</script>
