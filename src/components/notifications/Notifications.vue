<template>
  <transition-group
    class="fixed flex flex-col items-center bottom-[20px] left-0 right-0 gap-2"
    name="notification"
    tag="div"
  >
    <Notification
      v-for="[key, notification] in notifications"
      v-bind:key="key"
      v-bind:notification="notification"
      v-on:close="deleteNotification(key)"
    />
  </transition-group>
</template>
<script setup lang="ts">
import { useNotifications } from '@src/notifications/useNotifications.ts'
import Notification from '@src/components/notifications/Notification.vue'

const { notifications, deleteNotification } = useNotifications()
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.5s;
}
.notification-enter, .notification-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
