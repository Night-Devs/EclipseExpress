import { NextFunction, Request, Response } from 'express'
import { getDataSource } from '../utility/database'
import { DefaultRoles, Guilds as GuildsEntity, LevelsServer } from '../entities'
import { In } from 'typeorm'
import createHttpError from 'http-errors'

export default class Guilds {
  public static ListGuilds(request: Request, response: Response) {
    const guilds = request.user.guilds.filter(
      ({ permissions, owner }) => (permissions & 0x8) === 0x8 || owner,
    )
    getDataSource()
      .getMongoRepository(GuildsEntity)
      .findBy({
        guildID: {
          $in: guilds.map(({ id }) => id),
        },
      })
      .then((data) =>
        response.json(
          guilds.map((guild) =>
            Object.assign(
              {
                active:
                  data.find(({ guildID }) => guildID === guild.id)?.active ||
                  false,
              },
              guild,
            ),
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
  public static PatchDefaultRoles(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { id } = request.params
    getDataSource()
      .getMongoRepository(DefaultRoles)
      .findOneByOrFail({ guildID: id })
      .then((data) =>
        getDataSource()
          .getMongoRepository(DefaultRoles)
          .save(Object.assign(data, request.body))
          .then(() =>
            response.json({
              code: 200,
              message: 'Success',
            }),
          ),
      )
      .catch(() => next(createHttpError(404)))
  }
  public static GetLevelsConfig(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { id } = request.params
    getDataSource()
      .getMongoRepository(LevelsServer)
      .findOneByOrFail({ guildID: id })
      .then((data) => {
        delete data.guildID
        delete data.objectId
        response.json(data)
      })
      .catch(() => next(createHttpError(404)))
  }
  public static PatchLevelsConfig(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { id } = request.params
    getDataSource()
      .getMongoRepository(LevelsServer)
      .findOneByOrFail({ guildID: id })
      .then((data) =>
        getDataSource()
          .getMongoRepository(LevelsServer)
          .save(Object.assign(data, request.body))
          .then(() =>
            response.json({
              code: 200,
              message: 'Success',
            }),
          ),
      )
      .catch(() => next(createHttpError(404)))
  }
}
