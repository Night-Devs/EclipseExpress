import { Type } from '@sinclair/typebox'

export const defaultRolesSchema = Type.Object(
  {
    enabled: Type.Boolean(),
    roles: Type.Array(Type.String()),
  },
  {
    additionalProperties: false,
  },
)
