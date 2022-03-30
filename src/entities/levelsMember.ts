import { Column, Entity } from 'typeorm'
import BaseEntity from './base'

@Entity('levelsM')
export class LevelsMember extends BaseEntity {
  @Column()
  guildID: string
  @Column()
  memberID: string
  @Column({ default: 0 })
  xp: number
}
