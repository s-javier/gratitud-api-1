import { Elysia } from 'elysia'
import PocketBase from 'pocketbase'

import { gratitudeGetRoute } from '~/routes/gratitude'

new Elysia()
  .derive(() => {
    const pb = new PocketBase(process.env.PB_URL)
    pb.autoCancellation(false)
    return {
      pb,
    }
  })
  // .get('/test', ({ path }) => ({ path }))
  .use(gratitudeGetRoute)
  .listen(process.env.PORT ?? 3000)

// console.log(
//   `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
// );
