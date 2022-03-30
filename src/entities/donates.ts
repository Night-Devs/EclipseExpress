import { Column, Entity, ObjectID } from 'typeorm'
import BaseEntity from './base'

@Entity('donates')
export class Donates extends BaseEntity {
  @Column()
  name: string
  @Column()
  total: number
}
