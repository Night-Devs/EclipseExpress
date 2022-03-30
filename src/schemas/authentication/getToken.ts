import { Type } from '@sinclair/typebox'

export const getTokenSchema = Type.Object({
  code: Type.String({
    minLength: 1,
  }),
})
