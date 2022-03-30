import { Column, Entity } from 'typeorm'
import BaseEntity from './base'

@Entity('goodbye')
export class Goodbye extends BaseEntity {
  @Column()
  guildID: string
  @Column()
  enabled: boolean
  @Column()
  channelID: string
  @Column()
  message: Object
}
