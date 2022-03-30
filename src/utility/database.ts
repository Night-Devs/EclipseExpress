import 'reflect-metadata'
import { DataSource } from 'typeorm'
import * as Entities from '../entities'

let dataSource: DataSource

export const initDataSource = async (): Promise<DataSource> => {
  if (dataSource) return dataSource
  dataSource = await new DataSource({
    type: 'mongodb',
    url: process.env.MONGO_URI,
    entities: Object.values(Entities).filter(
      ({ constructor, name }) => constructor.name !== 'Object' && name,
    ),
  }).initialize()
  return dataSource
}

export const getDataSource = () => dataSource
