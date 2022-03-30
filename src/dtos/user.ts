import { GuildDTO } from './guild'

export interface UserDTO {
  username: string
  locale: string
  mfa_enabled: boolean
  flags: number
  banner: string | null
  accent_color: number | null
  avatar: string | null
  discriminator: string
  verified: boolean
  token: string
  guilds?: GuildDTO[]
}
