<template>
  <div v-if="loading" class="mt-4 text-3xl">
    Loading
    <font-awesome-icon class="fa-spin" icon="fa fa-spinner fa-spin" />
  </div>
  <div v-else-if="error" class="mt-2">
    Error occurred. Want to reload data?

    <button
      class="inline-block p-4 mt-4 bg-sky-500 hover:bg-sky-700 rounded text-white"
      v-on:click="refetch()"
    >
      Refetch
    </button>
  </div>

  <div v-else class="flex gap-4 flex-col">
    <h1 class="font-extrabold tracking-tigh text-3xl leading-10">Histories:</h1>
    <template v-if="histories?.length">
      <template v-for="(history, index) in histories">
        <HistoryCard
          v-if="history"
          v-bind:key="index"
          v-bind:history="history"
        />
      </template>
    </template>
    <template v-else> There are no histories, yet :( </template>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useGetHistoriesQuery } from '@api/__generated__/graphql.ts'
import {
  NotificationType,
  useNotifications,
} from '@src/notifications/useNotifications.ts'
import HistoryCard from '../modules/histories/components/HistoryCard.vue'

const { loading, result, error, refetch, onResult } = useGetHistoriesQuery()

const histories = computed(() => [...(result.value?.histories || [])].reverse())

const { addNotification } = useNotifications()

onResult(({ loading }) => {
  if (loading) {
    return
  }
  addNotification({
    message: 'Successfully fetched histories',
    type: NotificationType.Success,
  })
})
</script>
