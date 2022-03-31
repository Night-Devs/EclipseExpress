import { Type } from '@sinclair/typebox'
import { messageSchema } from '../definitions'

export const levelsConfigSchema = Type.Object(
  {
    enabled: Type.Boolean(),
    onNewLevel: Type.Object(
      {
        mode: Type.Array(Type.String()),
        message: messageSchema,
        deleteTimeout: Type.Number(),
        reaction: Type.String(),
      },
      {
        additionalProperties: false,
      },
    ),
    admins: Type.Object(
      {
        roles: Type.Array(Type.String()),
        members: Type.Array(Type.String()),
      },
      {
        additionalProperties: false,
      },
    ),
    exceptions: Type.Object(
      {
        roles: Type.Array(Type.String()),
        members: Type.Array(Type.String()),
        channels: Type.Array(Type.String()),
      },
      {
        additionalProperties: false,
      },
    ),
    transfer: Type.Boolean(),
  },
  {
    additionalProperties: false,
  },
)
