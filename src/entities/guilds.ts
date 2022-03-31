import { Column, Entity } from 'typeorm'
import BaseEntity from './base'

@Entity('guilds')
export class Guilds extends BaseEntity {
  @Column()
  guildID: string
  @Column()
  active: boolean
}
