import { NextFunction, Request, Response } from 'express'
import { getDataSource } from '../utility/database'
import { DefaultRoles, Guilds as GuildsEntity } from '../entities'
import { In } from 'typeorm'
import createHttpError from 'http-errors'

export default class Guilds {
  public static async ListGuilds(request: Request, response: Response) {
    const guilds = request.user.guilds.filter(
      ({ permissions, owner }) => (permissions & 0x8) === 0x8 || owner,
    )
    const data = await getDataSource()
      .getMongoRepository(GuildsEntity)
      .findBy({
        guildID: {
          $in: guilds.map(({ id }) => id),
        },
      })
    response.json(
      guilds.map((guild) =>
        Object.assign(
          {
            active:
              data.find(({ guildID }) => guildID === guild.id)?.active || false,
          },
          guild,
        ),
      ),
    )
  }
  public static GetDefaultRoles(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { id } = request.params
    getDataSource()
      .getMongoRepository(DefaultRoles)
      .findOneOrFail({
        where: {
          guildID: id,
        },
        select: ['enabled', 'roles'],
      })
      .then((data) => {
        delete data.objectId
        response.send(data)
      })
      .catch(() => next(createHttpError(404)))
  }
}
