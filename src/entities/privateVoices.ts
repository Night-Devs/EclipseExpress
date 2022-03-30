import { Column, Entity } from 'typeorm'
import BaseEntity from './base'

@Entity('privateVoices')
export class PrivateVoices extends BaseEntity {
  @Column({ default: true })
  enabled: boolean
  @Column()
  guildID: string
  @Column()
  channelID: string
  @Column({ default: '[+] {{TAG}}' })
  template: string
}
