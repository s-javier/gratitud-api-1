import { Elysia, t } from 'elysia'

import { Route, Error } from '~/enums'

export const gratitudeEditRoute = new Elysia().post(
  Route.GRATITUDE_EDIT,
  async ({ pb, body, error }: any) => {
    /* ↓ Verificar que lo que estoy editando sea el agradecimiento del usuario */
    let query
    try {
      query = await pb.collection('gratitude').getFullList({
        fields: 'id',
        filter: pb.filter('id = {:id} && userId = {:userId}', {
          id: body.id,
          userId: body.userId,
        }),
      })
    } catch {
      return error(500, Error.GRATITUDE_NOT_FOUND)
    }
    if (query.length === 0) {
      return error(404, Error.GRATITUDE_NOT_FOUND)
    }
    /* ↑ Verificar que lo que estoy editando sea el agradecimiento del usuario */
    try {
      await pb.collection('gratitude').update(body.id, { sentence: body.sentence })
    } catch {
      return error(500, Error.DB)
    }
  },
  {
    body: t.Object({
      id: t.String({ pattern: '^[a-z0-9]{15}$' }),
      sentence: t.String({
        minLength: 10,
        maxLength: 300,
      }),
      userId: t.String({ pattern: '^[a-z0-9]{15}$' }) /* Lo voy a tener en la autenticación. */,
    }),
  },
)
