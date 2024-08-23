import { module, test } from 'qunit';
import { setupRenderingTest } from 'rock-and-roll/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | band-navigation', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('mockBand', { id: 'pearl-jam', name: 'Pearl Jam' });

    // Template block usage:
    // await render(hbs`<BandNavigation @band={{this.mockBand}} />`);

    assert.dom().hasText('');
  });
});
