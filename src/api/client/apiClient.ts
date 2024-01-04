import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'
import {
  NotificationType,
  useNotifications,
} from '@src/notifications/useNotifications.ts'
// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: import.meta.env.VITE_SPACE_X_API_ENDPOINT,
})

const { addNotification } = useNotifications()
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      )
      const description = `Location: ${JSON.stringify(
        locations,
      )}, Path: ${path}`

      addNotification(
        { type: NotificationType.Error, message, description },
        { timeout: 0 },
      )
    })

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

// Cache implementation
const cache = new InMemoryCache({
  resultCaching: true,
  typePolicies: {
    Query: {
      fields: {
        history: {
          read(_, { args, toReference }) {
            return toReference({
              __typename: 'History',
              id: args!.id,
            })
          },
        },
      },
    },
  },
})

// Create the apollo client
export default new ApolloClient({
  link: errorLink.concat(httpLink),
  cache,
})
