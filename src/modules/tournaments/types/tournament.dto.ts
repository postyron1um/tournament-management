export const TOURNAMENT_STATUS = {
  completed: 'Завершён',
  cancelled: 'Отменён',
  registration_open: 'Регистрация открыта',
  registration_closed: 'Регистрация закрыта',
  active: 'Активный',
  upcoming: 'Предстоящий',
} as const

export type TTournamenetStatus = keyof typeof TOURNAMENT_STATUS

export interface ITournamentDTO {
  id: number
  title: string // название турнира
  description: string // описание турнира
  type: string // тип турнира
  startDate: string // дата начала турнира
  endDate: string // дата окончания турнира
  currentParticipants: number // количество участников турнира
  maxParticipants: number // максимальное количество участников турнира
  location: string // место проведения турнира
  teamsCount: number // количество команд турнира
  matchesCount: number // количество матчей турнира
  registeredCount: number // количество зарегистрированных команд турнира
  maxTeams: number // максимальное количество команд турнира
  entryFee?: number // взнос за участие в турнире
  status: TTournamenetStatus // статус турнира
  sportType: string // тип спорта турнира
  isRegistered?: boolean // флаг, указывающий, зарегистрирована ли команда в турнире
  requirements?: string
}
