import type { IRouteMeta as AppRouteMeta } from '@/core/router/types'
import 'vue-router'

declare module 'vue-router' {
  type _AppRouteMeta = AppRouteMeta
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface RouteMeta extends _AppRouteMeta {}
}
