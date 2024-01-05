<template>
  <div class="rounded-md p-2 shadow-sm border-2 w-[300px]">
    <div class="flex items-start gap-2 p-2 border-b">
      <h3
        v-if="disableLink"
        class="font-bold tracking-tigh text-xl leading-2"
        v-text="history.title"
      />
      <router-link v-else v-bind:to="`/histories/${history.id}`">
        <h3
          class="font-bold tracking-tigh text-xl leading-2"
          v-text="history.title"
        />
      </router-link>
      <div v-if="history.links" class="ml-auto">
        <a
          v-if="history.links.article"
          v-bind:href="history.links.article"
          class="p-2 flex bg-sky-500 hover:bg-sky-700 rounded text-white text-sm"
          target="_blank"
          title="Open link"
        >
          <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" />
        </a>
      </div>
    </div>
    <p class="my-2 text-left" v-text="history.details" />
    <p v-text="date" />
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { History } from '@api/__generated__/graphql.ts'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{ history: History; disableLink?: boolean }>(),
  {
    disableLink: false,
  },
)

const date = computed(() =>
  format(new Date(props.history.event_date_unix * 1000), 'dd.MM.yyyy'),
)
</script>
