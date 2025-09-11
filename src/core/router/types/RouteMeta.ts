import type { TAuthType } from "./AuthTypes";



export interface IRouteMeta {
  auth: TAuthType;
  roles?: [];
  title: string;
  scopeModule?: string;
  requiredPermissions?: string[];
  hideInMenu?: boolean;
  icon?: string;
  order?: number;
}
