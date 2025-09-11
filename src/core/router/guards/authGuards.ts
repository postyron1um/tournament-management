// import { useAuthStore } from '@/shared/stores/AuthStore'
// import { useTokenStore } from '@/shared/stores/TokenStore'
// import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

// export const authGuard = async (
//   to: RouteLocationNormalized,
//   from: RouteLocationNormalized,
//   next: NavigationGuardNext,
// ) => {
//   const authStore = useAuthStore()
//   const tokenStore = useTokenStore()

//   if (authStore.isAuthenticated === false && tokenStore.token) {
//     await authStore.checkAuth()
//   }

//   if (authStore.isAuthenticated && to.path === '/login') {
//     next('/')
//   } else if (!authStore.isAuthenticated && to.meta.requiresAuth) {
//     next('/login')
//   } else {
//     next()
//   }
// }
