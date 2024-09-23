import { Elysia, t } from 'elysia'

import { Route, Error } from '~/enums'

export const gratitudeGetRoute = new Elysia().post(
  Route.GRATITUDE_GET,
  async ({ pb, body, error }: any) => {
    let acknowledgements
    try {
      acknowledgements = await pb.collection('gratitude').getFullList({
        fields: 'id, sentence, score, isRemembered, lastRememberedAt, userId',
        filter: pb.filter('userId = {:userId}', {
          userId: body.userId,
        }),
      })
    } catch {
      return error(500, Error.DB)
    }
    return acknowledgements
  },
  {
    body: t.Object({
      userId: t.String({ pattern: '^[a-z0-9]{15}$' }),
    }),
  },
)
