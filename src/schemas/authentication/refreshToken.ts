import { Type } from '@sinclair/typebox'

export const refreshTokenSchema = Type.Object({
  refreshToken: Type.String({
    minLength: 1,
  }),
})
