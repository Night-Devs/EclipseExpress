import { Column, Entity } from 'typeorm'
import BaseEntity from './base'

@Entity('welcome')
export class Welcome extends BaseEntity {
  @Column()
  guildID: string
  @Column()
  enabled: boolean
  @Column()
  channelID: string
  @Column()
  message: Object
}
