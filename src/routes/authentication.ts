import { Validator } from 'express-json-validator-middleware'
import Authentication from '../controllers/authentication'
import { refreshTokenSchema, getTokenSchema } from '../schemas'
import { Router } from '../structures'

const { validate } = new Validator({})

export default class extends Router {
  public basePath: string = '/auth'
  public route(): void {
    this.router.post(
      '/token',
      validate({
        body: getTokenSchema,
      }),
      Authentication.getToken,
    )
    this.router.post(
      '/token/refresh',
      validate({
        body: refreshTokenSchema,
      }),
      Authentication.refreshToken,
    )
    this.router.get(
      '/callback/mobile',
      validate({
        query: getTokenSchema,
      }),
      Authentication.moblieCallback,
    )
  }
}
