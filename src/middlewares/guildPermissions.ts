import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'

export const GuildPermissions = (param: string) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const guildID = request.params[param]
    const guild = request.user.guilds.find(({ id }) => id === guildID)
    if (!guild) return next(createHttpError(404))
    if ((guild.permissions & 0x8) === 0x8 || guild.owner) return next()
    next(createHttpError(403))
  }
}
