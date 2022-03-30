import { Column, Entity, ObjectID } from 'typeorm'
import BaseEntity from './base'

@Entity('messages')
export class Messages extends BaseEntity {
  @Column()
  guildID: string
  @Column()
  type: string
  @Column({ default: true })
  enabled: boolean
  @Column()
  channelID: string
  @Column()
  message: Object
}
