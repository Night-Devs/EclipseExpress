import { Column, Entity } from 'typeorm'
import BaseEntity from './base'

@Entity('levelsS')
export class LevelsServer extends BaseEntity {
  @Column()
  guildID: string
  @Column({ default: true })
  enabled: boolean
  @Column()
  onNewLevel: {
    mode: string[]
    message: Object
    deleteTimeout: number
    reaction: string
  }
  @Column()
  admins: {
    roles: string[]
    members: string[]
  }
  @Column()
  exceptions: {
    roles: string[]
    members: string[]
    channels: string[]
  }
  @Column({ default: true })
  transfer: boolean
}
