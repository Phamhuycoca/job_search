<template>
  <div>
    <button @click="sendNotification">Send Notification</button>
    <ul id="notifications">
      <li v-for="notification in notifications" :key="notification">{{ notification }}</li>
    </ul>
  </div>
</template>

<script>
import { HubConnectionBuilder } from '@aspnet/signalr';

export default {
  data() {
    return {
      notifications: [],
      connection: null,
    };
  },
  mounted() {
    this.connectToHub();
  },
  methods: {
    async connectToHub() {
      const connection = new HubConnectionBuilder()
        .withUrl('ws://localhost:25874/notificationHub')
        .build();

      connection.on('ReceiveNotification', (message) => {
        this.notifications.push(message);
      });

      try {
        await connection.start();
        console.log('Connected to SignalR Hub!');
      } catch (error) {
        console.error('Error connecting to SignalR Hub:', error);
      }

      this.connection = connection;
    },
    async sendNotification() {
      try {
        await this.connection.invoke('ReceiveNotification', 'This is a test notification!');
      } catch (error) {
        console.error('Error sending notification:', error);
      }
    },
  },
};
</script>
