import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn, triggerKeyEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | chat-bot', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it renders and opens chat window', async function (assert) {
    await render(hbs`<ChatBot />`);

    assert.dom('.chat-bot-button').exists();
    assert.dom('.chat-window').doesNotExist();

    await click('.chat-bot-button');

    assert.dom('.chat-window').exists();
  });

  test('it sends a message and receives a response', async function (assert) {
    // Мокаем ответ от сервера через Mirage
    this.server.post('/chat', (schema, request) => {
      let attrs = JSON.parse(request.requestBody);
      return { response: `Ответ на "${attrs.message}"` };
    });

    await render(hbs`<ChatBot />`);

    await click('.chat-bot-button');
    await fillIn('.chat-input input', 'Hi Bot');
    await triggerKeyEvent('.chat-input input', 'keypress', 'Enter');

    assert.dom('.message').exists({ count: 3 });
    assert.dom('.message:nth-child(1)').hasText('Lucy: Can I help you?');
    assert.dom('.message:nth-child(2)').hasText('You: Hi Bot');
  });
});
