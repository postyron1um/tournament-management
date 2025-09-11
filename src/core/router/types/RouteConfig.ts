import type { IRouteMeta } from './RouteMeta'
import type { RouteRecordRaw } from 'vue-router'

export interface ITypedRouteConfig extends Omit<RouteRecordRaw, 'meta' | 'children'> {
  meta?: IRouteMeta
  children?: ITypedRouteConfig[]
  redirect?: string
}
