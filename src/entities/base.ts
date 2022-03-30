import 'reflect-metadata'
import { BaseEntity as Base, ObjectID, ObjectIdColumn } from 'typeorm'

export default class BaseEntity extends Base {
  @ObjectIdColumn()
  objectId: ObjectID
}
