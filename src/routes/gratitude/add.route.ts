import { Elysia, t } from 'elysia'

import { Route, Error } from '~/enums'

export const gratitudeAddRoute = new Elysia().post(
  Route.GRATITUDE_ADD,
  async ({ pb, body, error }: any) => {
    try {
      await pb
        .collection('gratitude')
        .create({ userId: body.userId, sentence: body.sentence, score: 1 })
    } catch {
      return error(500, Error.DB)
    }
  },
  {
    body: t.Object({
      userId: t.String({ pattern: '^[a-z0-9]{15}$' }) /* Lo voy a tener en la autenticación. */,
      sentence: t.String({
        minLength: 10,
        maxLength: 300,
      }),
    }),
  },
)
