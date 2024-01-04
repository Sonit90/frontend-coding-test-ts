import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import './styles/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'
import apolloClient from './api/client/apiClient'
import initializeRouter from './router'

library.add(faArrowUpRightFromSquare)

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
}).component('font-awesome-icon', FontAwesomeIcon)

initializeRouter(app)

app.mount('#app')
