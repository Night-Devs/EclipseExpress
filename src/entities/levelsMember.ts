import { Column, Entity } from 'typeorm'
import BaseEntity from './base'

@Entity('levelsMember')
export class LevelsMember extends BaseEntity {
  @Column()
  guildID: string
  @Column()
  memberID: string
  @Column()
  xp: number
}
