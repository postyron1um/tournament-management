import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/profile',
      component: () => import('@/pages/ProfilePage.vue'),
    },

    {
      path: '/user',
      redirect: '/user/tournaments',
      children: [
        {
          path: '',
          redirect: '/user/main',
        },
        {
          path: 'main',
          component: () => import('@/modules/tournaments/components/MainPage.vue'),
        },
        {
          path: 'tournaments',
          component: () => import('@/modules/tournaments/components/TournamentListLK.vue'),
        },

        {
          path: 'my-tournaments',
          component: () => import('@/modules/tournaments/components/MyTournaments.vue'),
        },
        {
          path: 'my-results',
          component: () => import('@/modules/tournaments/components/MyResult.vue'),
        }
      ],
    },

    {
      path: '/tournaments',
      component: () => import('@/pages/TournamentListPage.vue'),
    },
    {
      path: '/user/tournaments/:id/:tab?',
      component: () => import('@/modules/tournaments/components/TournamentDetails.vue'),
      redirect: (to) => `${to.path}/overview`,
      children: [
        {
          path: 'overview',
          name: 'tournament-overview',
          component: () => import('@/modules/tournaments/components/TournamentOverview.vue'),
        },
        {
          path: 'standings',
          component: () => import('@/modules/tournaments/components/TournamentStandings.vue'),
        },
        {
          path: 'matches',
          component: () => import('@/modules/tournaments/components/TournamentMatches.vue'),
        },
        {
          path: 'teams',
          component: () => import('@/modules/tournaments/components/TournamentTeams.vue'),
        },
      ],
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
