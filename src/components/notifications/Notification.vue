<template>
  <div
    class="notification flex max-w-xl select-none justify-center rounded-md bg-slate-900 text-white opacity-95 p-2 cursor-pointer"
    v-bind:class="notificationClass"
    v-on:click="$emit('close')"
  >
    <div class="flex items-center flex-col">
      <p class="font-bold text-xs" v-text="notification.message" />

      <p class="text-xs mt-2" v-text="notification.description" />
    </div>
    <font-awesome-icon
      class="ml-2 w-[16px] h-[16px] cursor-pointer border border-slate-500 rounded-sm flex-shrink-0"
      icon="fa-solid fa-xmark"
      v-on:click="$emit('close')"
    />
  </div>
</template>

<script setup lang="ts">
import {
  Notification,
  NotificationType,
} from '@src/notifications/useNotifications.ts'
import { computed } from 'vue'

const props = defineProps<{
  notification: Notification
}>()

defineEmits<{
  (e: 'close'): void
}>()
const notificationClass = computed(() => {
  switch (props.notification.type) {
    case NotificationType.Error:
      return 'bg-red-500'
    case NotificationType.Success:
      return 'bg-green-500'
    case NotificationType.Warning:
      return 'bg-yellow-500'
    default:
      return ''
  }
})
</script>
