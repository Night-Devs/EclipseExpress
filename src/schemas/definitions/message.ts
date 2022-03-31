import { Type } from '@sinclair/typebox'

export const embedField = Type.Object(
  {
    name: Type.String({
      minLength: 1,
      maxLength: 256,
    }),
    value: Type.String({
      minLength: 1,
      maxLength: 1024,
    }),
    inline: Type.Optional(Type.Boolean()),
  },
  {
    additionalProperties: false,
  },
)

export const embedAuthor = Type.Object(
  {
    name: Type.String({
      minLength: 1,
      maxLength: 256,
    }),
    url: Type.Optional(
      Type.String({
        format: 'uri',
      }),
    ),
    icon_url: Type.Optional(
      Type.String({
        format: 'uri',
      }),
    ),
  },
  {
    additionalProperties: false,
  },
)

export const embedFooterSchema = Type.Object(
  {
    text: Type.String({
      minLength: 1,
      maxLength: 2048,
    }),
    icon_url: Type.Optional(
      Type.String({
        format: 'uri',
      }),
    ),
  },
  {
    additionalProperties: false,
  },
)
export const embedImageSchema = Type.Object(
  {
    url: Type.String({ format: 'uri' }),
  },
  {
    additionalProperties: false,
  },
)

export const embedSchema = Type.Object(
  {
    title: Type.Optional(
      Type.String({
        maxLength: 256,
        minLength: 1,
      }),
    ),
    type: Type.Literal('rich'),
    description: Type.Optional(
      Type.String({
        minLength: 1,
        maxLength: 4096,
      }),
    ),
    url: Type.Optional(
      Type.String({
        format: 'uri',
      }),
    ),
    color: Type.Optional(Type.Integer()),
    footer: Type.Optional(embedFooterSchema),
    thumbnail: Type.Optional(embedImageSchema),
    image: Type.Optional(embedImageSchema),
    author: Type.Optional(embedAuthor),
    fields: Type.Optional(Type.Array(embedField, { maxItems: 25 })),
  },
  {
    additionalProperties: false,
  },
)

export const messageSchema = Type.Object(
  {
    content: Type.String({
      maxLength: 2000,
    }),
    embeds: Type.Array(embedSchema, {
      maxItems: 10,
    }),
  },
  {
    additionalProperties: false,
  },
)
