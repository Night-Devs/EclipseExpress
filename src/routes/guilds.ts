import { Validator } from 'express-json-validator-middleware'
import Guilds from '../controllers/guilds'
import { AuthorizationMiddleware, GuildPermissions } from '../middlewares'
import { defaultRolesSchema, levelsConfigSchema } from '../schemas'
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
    this.router.get(
      '/:id/levels/config',
      AuthorizationMiddleware,
      GuildPermissions('id'),
      Guilds.GetLevelsConfig,
    )
    this.router.patch(
      '/:id/levels/config',
      validate({ body: levelsConfigSchema }),
      AuthorizationMiddleware,
      GuildPermissions('id'),
      Guilds.PatchLevelsConfig,
    )
  }
}
