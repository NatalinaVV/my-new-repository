import { module, test } from 'qunit';
import { setupRenderingTest } from 'rock-and-roll/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | band-list', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<BandList />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <BandList>
        
      </BandList>
    `);

    assert.dom().hasText('');
  });
});
