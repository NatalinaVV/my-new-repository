import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';

export default class UpdateBandComponent extends Component {
  @tracked name = this.band.name;
  @tracked description = this.band.description;

  get band() {
    return this.args.band;
  }

  @action
  handleNameChange(event) {
    this.name = event.target.value;
  }

  @action
  handleDescriptionChange(event) {
    this.description = event.target.value;
  }

  @action
  submitForm(event) {
    event.preventDefault();
    let band = {
      id: this.args.band.id,
      type: 'bands',
      attributes: {
        name: this.name,
        description: this.description,
      },
    };

    if (this.args.onSave) {
      this.args.onSave(band);
    }
    this.closeModal();
  }

  @action
  closeModal() {
    if (this.args.onClose) {
      this.args.onClose();
    }
  }
}
