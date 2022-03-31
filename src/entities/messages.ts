import { Static } from '@sinclair/typebox'
import { Column, Entity, ObjectID } from 'typeorm'
import { messageSchema } from '../schemas'
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
  message: Static<typeof messageSchema>
}
