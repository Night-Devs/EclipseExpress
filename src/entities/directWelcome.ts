import { Column, Entity } from 'typeorm'
import BaseEntity from './base'

@Entity('directWelcome')
export class DirectWelcome extends BaseEntity {
  @Column()
  guildID: string
  @Column()
  enabled: boolean
  @Column()
  message: Object
}
