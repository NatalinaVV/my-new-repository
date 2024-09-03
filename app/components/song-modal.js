import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AddSongModalComponent extends Component {
  @tracked title = this.song.title || '';
  @tracked song = this.args.song || {};

  get hasNoTitle() {
    return !this.title.trim();
  }

  @action
  updateTitle(event) {
    this.title = event.target.value;
  }

  @action
  submitForm(event) {
    event.preventDefault();
    if (!this.hasNoTitle) {
      if (this.args.song) {
        this.song.title = this.title;
        this.args.onUpdateSong(this.song);
      } else {
        let song = {
          title: this.title,
          band: this.args.band,
        };

        if (this.args.onAddSong) {
          this.args.onAddSong(song);
        }
      }
      this.closeModal();
    }
  }

  @action
  closeModal() {
    if (this.args.onClose) {
      this.args.onClose();
    }
  }
}
