import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/profile',
      component: () => import('@/pages/ProfilePage.vue'),
    },

    {
      path: '/tournaments',
      component: () => import('@/pages/TournamentListPage.vue'),
    },
    {
      path: '/tournaments/:id',
      component: () => import('@/modules/tournaments/components/TournamentDetails.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
