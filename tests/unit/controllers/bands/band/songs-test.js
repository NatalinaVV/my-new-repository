import { module, test } from 'qunit';
import { setupTest } from 'rock-and-roll/tests/helpers';

module('Unit | Controller | bands/band/songs', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:bands/band/songs');
    assert.ok(controller);
  });
});
