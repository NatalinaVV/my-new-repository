import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class ChatBotComponent extends Component {
  @service chat;

  @tracked isChatOpen = false;
  @tracked newMessage = '';
  @tracked messages = [{ sender: 'Lucy', text: 'Can I help you?' }];

  @action
  toggleChatWindow() {
    this.isChatOpen = !this.isChatOpen;
    if (this.isChatOpen) {
      requestAnimationFrame(() => this.scrollToBottom());
    }
  }

  @action
  updateNewMessage(event) {
    this.newMessage = event.target.value;
  }

  @action
  async sendMessageOnEnter(event) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  @action
  async sendMessage() {
    if (this.newMessage.trim()) {
      this.messages = [
        ...this.messages,
        { sender: 'You', text: this.newMessage },
      ];
      requestAnimationFrame(() => this.scrollToBottom());
      const message = this.newMessage;
      this.newMessage = '';

      try {
        const response = await this.chat.sendBotMessage(message);
        const answer = response ? response : 'What is your problems?';

        this.messages = [...this.messages, { sender: 'Lucy', text: answer }];
      } catch (error) {
        this.messages = [
          ...this.messages,
          {
            sender: 'Lucy',
            text: 'Sorry, something goes wrong.',
          },
        ];
      }

      requestAnimationFrame(() => this.scrollToBottom());
    }
  }

  scrollToBottom() {
    const chatBody = document.querySelector('.chat-body');
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }
}
