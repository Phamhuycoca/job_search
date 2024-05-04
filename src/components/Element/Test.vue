<template>
  <div>
    <h2>Notifications</h2>
    <p>Total Notifications: {{ notifications.length }}</p>
    <ul>
      <li v-for="notification in notifications" :key="notification.id">{{ notification.text }}</li>
    </ul>
    <button @click="addNotification">Add Notification</button>
  </div>
</template>

<script>
import * as signalR from "@microsoft/signalr";

export default {
  data() {
    return {
      notifications: []
    };
  },
  created() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:25874/notificationHub")
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection.on("ReceiveNotification", message => {
      this.notifications.push({ id: this.notifications.length + 1, text: message });
    });

    this.connection.start().catch(err => console.error(err));
  },
  methods: {
    addNotification() {
      const newNotification = { id: this.notifications.length + 1, text: "New Notification" };
      this.notifications.push(newNotification);
      // Send notification to backend
      this.connection.invoke("SendNotification", newNotification.text).catch(err => console.error(err));
    }
  }
};
</script>
