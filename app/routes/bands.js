import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

export default class BandsRoute extends Route {
  @service catalog;

  @task *loadBandsWithDelay() {
    yield timeout(1000); // Delay 1 second for setUp worker MSW
    return this.catalog.fetchAll('bands');
  }

  model() {
    return this.loadBandsWithDelay.perform();
  }
}
