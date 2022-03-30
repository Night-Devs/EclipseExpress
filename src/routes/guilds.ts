import { Validator } from 'express-json-validator-middleware'
import { Router } from '../structures'

const { validate } = new Validator({})

export default class extends Router {
  public basePath: string = '/guilds'
  public route(): void {}
}
