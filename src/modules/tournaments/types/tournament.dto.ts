export const TOURNAMENT_STATUS = {
  completed: 'Завершён',
  cancelled: 'Отменён',
  registration_open: 'Регистрация открыта',
  registration_closed: 'Регистрация закрыта',
} as const

export type TTournamenetStatus = keyof typeof TOURNAMENT_STATUS

export interface ITournamentDTO {
  id: number
  title: string
  description: string
  type: string
  dateStart: string
  dateEnd: string
  location: string
  teamsCount: number
  matchesCount: number
  registeredCount: number
  maxTeams: number
  fee: number
  status: TTournamenetStatus
  sportType: string
}
