<template>
  <div>
    <router-link
      to="/histories"
      class="relative inline-block p-4 mt-4 bg-sky-500 hover:bg-sky-700 rounded text-white cursor-pointer"
    >
      <font-awesome-icon icon="fa-solid fa-arrow-left" />
      Back to histories
    </router-link>
    <div v-if="loading">
      Loading...
      <font-awesome-icon class="fa-spin" icon="fa fa-spinner fa-spin" />
    </div>

    <div v-else-if="error" class="mt-2">
      Error occurred. Want to go back to history page?
    </div>

    <div v-else-if="result?.history" class="flex gap-4 flex-col">
      <h1 class="font-extrabold tracking-tigh text-3xl leading-10">History:</h1>
      <HistoryCard v-bind:history="result?.history" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetHistoryQuery } from '@api/__generated__/graphql.ts'
import HistoryCard from '@src/modules/histories/components/HistoryCard.vue'
import {
  NotificationType,
  useNotifications,
} from '@src/notifications/useNotifications.ts'

const props = defineProps<{ id: string }>()

const { loading, result, error, onResult } = useGetHistoryQuery({
  id: props.id,
})

const { addNotification } = useNotifications()

onResult(({ loading }) => {
  if (loading) {
    return
  }
  addNotification({
    message: `Successfully fetched history ${props.id}`,
    type: NotificationType.Success,
  })
})
</script>
