import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class BandsRoute extends Route {
  @service catalog;

  async model() {
    return this.catalog.fetchAll('bands');
  }

  //   async model() {
  //     let response = await fetch('/bands');
  //     let json = await response.json();
  //     for (let item of json.data) {
  //         let { id, attributes, relationships } = item;
  //         let rels = {};
  //         for (let relationshipName in relationships) {
  //             rels[relationshipName] = relationships[relationshipName].links.related;
  //         }
  //         let record = new Band({ id, ...attributes }, rels);

  //         this.catalog.add('band', record);
  //     }

  //     return this.catalog.bands;
  // }

  //   model() {
  //     let blackDog = new Song({
  //       title: 'Black Dog',
  //       rating: 3,
  //     });

  //     let yellowLedbetter = new Song({
  //       title: 'Yellow Ledbetter',
  //       rating: 4,
  //     });

  //     let pretender = new Song({
  //       title: 'The Pretender',
  //       rating: 2,
  //     });

  //     let daughter = new Song({
  //       title: 'Daughter',
  //       rating: 5,
  //     });

  //     let ledZeppelin = new Band({
  //       id: 'led-zeppelin',
  //       name: 'Led Zeppelin',
  //       songs: [blackDog],
  //     });

  //     let pearlJam = new Band({
  //       id: 'pearl-jam',
  //       name: 'Pearl Jam',
  //       songs: [yellowLedbetter, daughter],
  //     });

  //     let fooFighters = new Band({
  //       id: 'foo-fighters',
  //       name: 'Foo Fighters',
  //       songs: [pretender],
  //     });

  //     blackDog.band = ledZeppelin;
  //     yellowLedbetter.band = pearlJam;
  //     daughter.band = pearlJam;
  //     pretender.band = fooFighters;
  //     this.catalog.add('song', blackDog);
  //     this.catalog.add('song', yellowLedbetter);
  //     this.catalog.add('song', daughter);
  // this.catalog.add('song', pretender);

  //     this.catalog.add('band', ledZeppelin);
  //     this.catalog.add('band', pearlJam);
  //     this.catalog.add('band', fooFighters);
  //     return this.catalog.bands;
  //   }
}
