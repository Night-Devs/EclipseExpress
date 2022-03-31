import { Validator } from 'express-json-validator-middleware'
import Guilds from '../controllers/guilds'
import { AuthorizationMiddleware } from '../middlewares'
import { Router } from '../structures'
const { validate } = new Validator({})

export default class extends Router {
  public basePath: string = '/guilds'
  public route(): void {
    this.router.get('/', AuthorizationMiddleware, Guilds.ListGuilds)
  }
}
