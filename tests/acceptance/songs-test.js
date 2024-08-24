import { module, test } from 'qunit';
import { visit, currentURL, click, settled, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'rock-and-roll/tests/helpers';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | songs', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Search songs', async function (assert) {
    let band = this.server.create('band', { name: 'Crooked Vultures' });
    let idBand = band.attrs.id;

    this.server.create('song', { title: 'Crocodiles', rating: 1, band });
    this.server.create('song', { title: 'Elephants', rating: 2, band });
    this.server.create('song', { title: 'Tortillas', rating: 5, band });
    this.server.create('song', { title: 'Shark', rating: 3, band });

    await visit('/');
    assert
      .dom('[data-test-rr="band-list-item"]:last-child')
      .hasText(
        'Crooked Vultures',
        'The other band link contains the band name',
      );

    await click('[data-test-rr="band-link"]');
    await visit(`/bands/${idBand}/songs`);
    await click('[data-test-rr="songs-nav-item"]');
    assert
      .dom('[data-test-rr="song-list-item"]:first-child')
      .includesText('Crocodiles');

    assert
      .dom('[data-test-rr="song-list-item"]:last-child')
      .includesText('Tortillas');

    await fillIn('[data-test-rr="search-box"]', 'el');
    assert
      .dom('[data-test-rr=song-list-item]')
      .exists({ count: 1 }, 'The songs matching the search term are displayed');
  });

  test('Sort songs in various ways', async function (assert) {
    let band = this.server.create('band', { name: 'Crooked Vultures' });
    let idBand = band.attrs.id;
    this.server.create('song', { title: 'Elephants', rating: 2, band });
    this.server.create('song', { title: 'Tortillas', rating: 5, band });
    this.server.create('song', { title: 'Crocodiles', rating: 1, band });
    this.server.create('song', { title: 'Shark', rating: 3, band });

    await visit('/');
    assert
      .dom('[data-test-rr="band-list-item"]:last-child')
      .hasText(
        'Crooked Vultures',
        'The other band link contains the band name',
      );

    await click('[data-test-rr="band-link"]');
    await visit(`/bands/${idBand}/songs`);
    await click('[data-test-rr="songs-nav-item"]');

    await click('[data-test-rr=sort-by-title-desc]');
    assert
      .dom('[data-test-rr="song-list-item"]:first-child')
      .includesText('Tortillas');
    assert
      .dom('[data-test-rr="song-list-item"]:last-child')
      .includesText('Crocodiles');

    await click('[data-test-rr=sort-by-rating-asc]');
    assert
      .dom('[data-test-rr=song-list-item]:first-child')
      .includesText('Crocodiles', 'The first song is the lowest rated');
    assert
      .dom('[data-test-rr=song-list-item]:last-child')
      .includesText('Tortillas', 'The last song is the highest rated');
    assert.ok(
      currentURL().includes('s=rating'),
      'The sort query param appears in the URL with the correct value',
    );
  });
});
