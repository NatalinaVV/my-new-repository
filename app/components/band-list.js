import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';

export default class BandListComponent extends Component {
  @service router;
  @service catalog;
  @tracked currentModalId = null;

  get bands() {
    let bands = this.args.bands || [];
    return bands.map((band) => {
      return {
        band,
        isActive: this.router.isActive('bands.band', band),
      };
    });
  }

  @action
  async removeBand(band) {
    if (confirm(`Are you sure you want to remove the band "${band.name}"?`)) {
      const data = await this.catalog.delete('bands', band.id);

      if (data) {
        this.router.transitionTo('');
      }
    }
  }

  @action
  async saveUpdatedBand(band) {
    const data = await this.catalog.update(band);
    if (data) {
      this.router.transitionTo('bands');
    }
  }
}
