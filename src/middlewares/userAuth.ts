import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import axios from 'axios'
import { UserDTO } from '../dtos'

const authorizationCache = new Map<string, UserDTO>()

declare global {
  namespace Express {
    interface Request {
      user?: UserDTO
    }
  }
}

export const AuthorizationMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (!request.headers.authorization) return next(createHttpError(401))
  if (authorizationCache.has(request.headers.authorization)) {
    const user = authorizationCache.get(request.headers.authorization)!
    await axios
      .get('https://discord.com/api/users/@me/guilds', {
        headers: { authorization: `Bearer ${request.headers.authorization}` },
      })
      .then(({ data }) => (user.guilds = data))
      .catch(() => {})
    request.user = user
  } else {
    try {
      const user = (
        await axios.get('https://discord.com/api/users/@me', {
          headers: { authorization: `Bearer ${request.headers.authorization}` },
        })
      ).data
      user.token = request.headers.authorization
      user.guilds = (
        await axios.get('https://discord.com/api/users/@me/guilds', {
          headers: { authorization: `Bearer ${request.headers.authorization}` },
        })
      ).data
      authorizationCache.set(request.headers.authorization, user)
      request.user = user
    } catch {
      return next(createHttpError(401))
    }
  }
  next()
}
