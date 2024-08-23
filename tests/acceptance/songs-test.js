import { module, test } from 'qunit';
import {
  visit,
  waitFor,
  waitUntil,
  currentURL,
  click,
  settled,
  fillIn,
} from '@ember/test-helpers';
import { setupApplicationTest } from 'rock-and-roll/tests/helpers';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | songs', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Search songs', async function (assert) {
    let band = this.server.create('band', { name: 'Crooked Vultures' });
    this.server.create('song', { title: 'Elephants', rating: 2,  band });
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
    await visit('/bands/crooked-vultures/songs');
    await click('[data-test-rr="songs-nav-item"]');

    await visit(`/bands/${band.id}/songs`);

    assert
      .dom('[data-test-rr="song-list-item"]:first-child')
      .hasText(
        'Crocodiles'
      );
      assert
      .dom('[data-test-rr="song-list-item"]:last-child')
      .hasText(
        'Tortillas'
      );

    await fillIn('[data-test-rr="search-box"]', 'el');
    assert
      .dom('[data-test-rr=song-list-item]')
      .exists({ count: 1 }, 'The songs matching the search term are displayed');
  });

  test('Sort songs in various ways', async function (assert) {
    let band = this.server.create('band', { name: 'Crooked Vultures' });
    this.server.create('song', { title: 'Elephants', rating: 2,  band });
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
    await visit('/bands/crooked-vultures/songs');
    await click('[data-test-rr="songs-nav-item"]');

    await visit(`/bands/${band.id}/songs`);
    await click('[data-test-rr=sort-by-title-desc]');
    assert
      .dom('[data-test-rr="song-list-item"]:first-child')
      .hasText(
        'Tortillas'
      );
    assert
      .dom('[data-test-rr="song-list-item"]:last-child')
      .hasText(
        'Crocodiles'
      );

      await click('[data-test-rr=sort-by-rating-asc]');
    assert
      .dom('[data-test-rr=song-list-item]:first-child')
      .hasText('Crocodiles', 'The first song is the lowest rated');
    assert
      .dom('[data-test-rr=song-list-item]:last-child')
      .hasText('Tortillas', 'The last song is the highest rated');
    assert.ok(
      currentURL().includes('s=rating'),
      'The sort query param appears in the URL with the correct value',
    );
    
  //   // let band = this.server.create('band', { name: 'Crooked Vultures' });
  //   // await visit('/');
  //   // await createBand('Caspian');
  //   // await waitFor('[data-test-rr="no-songs-text"]');

  //   // let band = this.server.create('band', { name: 'Crooked Vultures' });
  //   this.server.create('song', {
  //     title: 'Mind Eraser',
  //     rating: 2,
  //     band,
  //   });
  //   this.server.create('song', { title: 'Elephants', rating: 4, band });
  //   this.server.create('song', {
  //     title: 'Spinning in Daffodils',
  //     rating: 5,
  //     band,
  //   });
  //   this.server.create('song', { title: 'New Fang', rating: 3, band });

  //   // await visit('/bands/them-crooked-vultures/songs');
  //   // await waitFor('[data-test-rr=band-link]');
  //   await visit('/');
  //   await createBand('Crooked Vultures');
  //   await waitFor('[data-test-rr="no-songs-text"]');
  //   await click('[data-test-rr="band-link"]');
  //   await settled();  // Ждем завершения всех асинхронных процессов

  //   assert
  //     .dom('[data-test-rr="song-list-item"]:first-child')
  //     .hasText(
  //       'Elephants',
  //       'The first song is the one that comes first in the alphabet',
  //     );
  //   assert
  //     .dom('[data-test-rr="song-list-item"]:last-child')
  //     .hasText(
  //       'Spinning In Daffodils',
  //       'The last song is the one that comes last in the alphabet',
  //     );

  //   // await waitFor('[data-test-rr=sort-by-title-desc]');
  //   await click('[data-test-rr=sort-by-title-desc]');
  //   // await settled();  // Ждем завершения всех асинхронных процессов

  //   assert
  //     .dom('[data-test-rr=song-list-item]:first-child')
  //     .hasText(
  //       'Spinning In Daffodils',
  //       'The first song is the one that comes last in the alphabet',
  //     );
  //   assert
  //     .dom('[data-test-rr=song-list-item]:last-child')
  //     .hasText(
  //       'Elephants',
  //       'The last song is the one that comes first in the alphabet',
  //     );
  //   assert.ok(
  //     currentURL().includes('s=-title'),
  //     'The sort query param appears in the URL with the correct value',
  //   );

  //   // await waitFor('[data-test-rr=sort-by-rating-asc]');
  //   await click('[data-test-rr=sort-by-rating-asc]');
  //   // await settled();  // Ждем завершения всех асинхронных процессов

  //   assert
  //     .dom('[data-test-rr=song-list-item]:first-child')
  //     .hasText('Mind Eraser', 'The first song is the lowest rated');
  //   assert
  //     .dom('[data-test-rr=song-list-item]:last-child')
  //     .hasText('Spinning In Daffodils', 'The last song is the highest rated');
  //   assert.ok(
  //     currentURL().includes('s=rating'),
  //     'The sort query param appears in the URL with the correct value',
  //   );

  //   // await waitFor('[data-test-rr=sort-by-rating-desc]');
  //   await click('[data-test-rr=sort-by-rating-desc]');
  //   // await settled();  // Ждем завершения всех асинхронных процессов

  //   assert
  //     .dom('[data-test-rr=song-list-item]:first-child')
  //     .hasText('Spinning In Daffodils', 'The first song is the highest rated');
  //   assert
  //     .dom('[data-test-rr=song-list-item]:last-child')
  //     .hasText('Mind Eraser', 'The last song is the lowest rated');
  //   assert.ok(
  //     currentURL().includes('s=-rating'),
  //     'The sort query param appears in the URL with the correct value',
  //   );
  });
});
