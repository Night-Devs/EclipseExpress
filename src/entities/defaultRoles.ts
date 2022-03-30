import { Column, Entity } from 'typeorm'
import BaseEntity from './base'

@Entity('defaultRoles')
export class DefaultRoles extends BaseEntity {
  @Column()
  guildID: string
  @Column()
  enabled: boolean
  @Column()
  roles: string[]
}
