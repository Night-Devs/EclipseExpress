import { Static } from '@sinclair/typebox'
import axios from 'axios'
import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { getTokenSchema, refreshTokenSchema } from '../schemas'
import { TokenResponseDTO } from '../dtos'

export default class Authentication {
  private static requestToken(
    data: URLSearchParams,
  ): Promise<TokenResponseDTO> {
    return new Promise((resolve) => {
      axios
        .post(`https://discord.com/api/v9/oauth2/token`, data, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
        .then(({ data }) => {
          const { access_token, token_type, refresh_token, expires_in, scope } =
            data
          resolve({
            accessToken: access_token,
            tokenType: token_type,
            refreshToken: refresh_token,
            expiresIn: expires_in,
            scope,
          })
        })
        .catch(resolve)
    })
  }

  public static async getToken(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { code } = request.body as Static<typeof getTokenSchema>
    const tokenResponse = await Authentication.requestToken(
      new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: process.env.REDIRECT_URL,
        code,
      }),
    )
    if (tokenResponse instanceof Error) return next(createHttpError(400))
    response.status(201).send(tokenResponse)
  }

  public static async refreshToken(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { refreshToken } = request.body as Static<typeof refreshTokenSchema>
    const tokenResponse = await Authentication.requestToken(
      new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'refresh_token',
        redirect_uri: process.env.REDIRECT_URL,
        refresh_token: refreshToken,
      }),
    )
    if (tokenResponse instanceof Error) return next(createHttpError(400))
    response.status(201).send(tokenResponse)
  }

  public static async moblieCallback(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const { code } = request.query as Static<typeof getTokenSchema>
    const tokenResponse = await Authentication.requestToken(
      new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: `${request.protocol}://${request.get('host')}${
          request.originalUrl.split('?')[0]
        }`,
        code,
      }),
    )
    if (tokenResponse instanceof Error) return next(createHttpError(400))
    response.redirect(`com.eclipse://auth/?token=${tokenResponse.accessToken}`)
  }
}
