export const AUTH_TYPES = {
  REQUIRED: 'required',
  GUEST_ONLY: 'guest_only',
  PUBLIC: 'public',
} as const

export type TAuthType = (typeof AUTH_TYPES)[keyof typeof AUTH_TYPES]
