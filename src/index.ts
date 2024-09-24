import { Elysia } from 'elysia'
import PocketBase from 'pocketbase'

import { gratitudeAddRoute, gratitudeEditRoute, gratitudeGetRoute } from '~/routes/gratitude'

const app = new Elysia()
  .derive(() => {
    const pb = new PocketBase(process.env.PB_URL)
    pb.autoCancellation(false)
    return {
      pb,
    }
  })
  // .get('/test', ({ path }) => ({ path }))
  .use(gratitudeGetRoute)
  .use(gratitudeAddRoute)
  .use(gratitudeEditRoute)
  .listen(process.env.PORT ?? 3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
