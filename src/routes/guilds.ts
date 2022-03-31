import { Validator } from 'express-json-validator-middleware'
import Guilds from '../controllers/guilds'
import { AuthorizationMiddleware, GuildPermissions } from '../middlewares'
import { defaultRolesSchema } from '../schemas'
import { Router } from '../structures'
const { validate } = new Validator({})

export default class extends Router {
  public basePath: string = '/guilds'
  public route(): void {
    this.router.get('/', AuthorizationMiddleware, Guilds.ListGuilds)
    this.router.get(
      '/:id/default_roles',
      AuthorizationMiddleware,
      GuildPermissions('id'),
      Guilds.GetDefaultRoles,
    )
    this.router.patch(
      '/:id/default_roles',
      validate({ body: defaultRolesSchema }),
      AuthorizationMiddleware,
      GuildPermissions('id'),
      Guilds.PatchDefaultRoles,
    )
  }
}
