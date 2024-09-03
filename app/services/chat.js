import Service from '@ember/service';
import { tracked } from 'tracked-built-ins';
import ENV from 'rock-and-roll/config/environment';

export default class Chat extends Service {
  chat = {};

  constructor() {
    super(...arguments);
    this.chat = tracked([]);
  }

  async sendBotMessage(question) {
    try {
      let response = await fetch(ENV.apiUrl, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': ENV.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      let data = await response.json();

      return data.answers[0].answer == 'No answer found'
        ? ''
        : data.answers[0].answer;
    } catch (error) {
      console.error('Error during chat request:', error);
      throw error;
    }
  }
}
