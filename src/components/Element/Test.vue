<template>
  <div>
    <div id="chat-container"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      host: 'http://localhost:5005/webhooks/rest/webhook',
      botLogo: 'https://hanoicomputercdn.com/media/lib/09-08-2023/logo-hacom-since-2001.png',
      title: 'Trợ Lý AI',
      welcomeMessage: 'Tôi có thể giúp gì cho bạn',
      inactiveMsg: 'Server đang lỗi ...',
      theme: 'purple'
    };
  },
  mounted() {
    this.createChatBot();
  },
  methods: {
    createChatBot() {
      const container = document.getElementById('chat-container');
      const iframe = document.createElement('iframe');
      iframe.src = `https://example.com/chatbot.html?host=${encodeURIComponent(this.host)}&botLogo=${encodeURIComponent(this.botLogo)}&title=${encodeURIComponent(this.title)}&welcomeMessage=${encodeURIComponent(this.welcomeMessage)}&inactiveMsg=${encodeURIComponent(this.inactiveMsg)}&theme=${encodeURIComponent(this.theme)}`;
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      container.appendChild(iframe);
    }
  }
};
</script>
