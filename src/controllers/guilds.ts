import { Request, Response } from 'express'
import { getDataSource } from '../utility/database'
import { Guilds as GuildsEntity } from '../entities'
import { In } from 'typeorm'

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
}
