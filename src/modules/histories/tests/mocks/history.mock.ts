import { History } from '@api/__generated__/graphql.ts'
import { faker } from '@faker-js/faker'
import { getTime } from 'date-fns'

export default (): Omit<History, 'event_date_utc' | 'flight'> => ({
  id: faker.string.uuid(),
  title: faker.lorem.sentence(),
  details: faker.lorem.sentences({ min: 1, max: 3 }),
  event_date_unix: getTime(faker.date.past({ years: 10 })),
  links: {
    article: faker.internet.url(),
    wikipedia: faker.internet.url(),
  },
})
