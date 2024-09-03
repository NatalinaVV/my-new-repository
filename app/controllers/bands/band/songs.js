import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { capitalize } from 'rock-and-roll/helpers/capitalize';

export default class BandsBandSongsController extends Controller {
  @tracked showAddSong = true;
  @tracked title = '';
  @tracked sortBy = 'title';
  @tracked searchTerm = '';
  @tracked isModalOpen = false;
  @tracked currentEditingSong = null;

  @service catalog;
  @service router;

  get hasNoTitle() {
    return !this.title;
  }

  @action
  updateTitle(event) {
    this.title = event.target.value;
  }

  @action
  openEditSongModal(song) {
    this.currentEditingSong = song;
  }

  @action
  closeModal() {
    if (this.currentEditingSong) {
      this.currentEditingSong = null;
    }
    if (this.isModalOpen) {
      this.isModalOpen = false;
    }
  }

  @action
  async addSong(song) {
    let newSong = await this.catalog.create(
      'song',
      { title: song.title },
      { band: { data: { id: this.model.id, type: 'bands' } } },
    );
    this.model.songs = [...this.model.songs, newSong];
    this.closeModal();
  }

  @action
  cancel() {
    this.title = '';
    this.showAddSong = true;
  }

  get matchingSongs() {
    let searchTerm = this.searchTerm.toLowerCase();
    return this.model.songs.filter((song) => {
      return song.title.toLowerCase().includes(searchTerm);
    });
  }

  get sortedSongs() {
    let sortBy = this.sortBy;
    let isDescendingSort = false;
    if (sortBy.charAt(0) === '-') {
      sortBy = this.sortBy.slice(1);
      isDescendingSort = true;
    }
    return this.matchingSongs.sort((song1, song2) => {
      if (song1[sortBy] < song2[sortBy]) {
        return isDescendingSort ? 1 : -1;
      }
      if (song1[sortBy] > song2[sortBy]) {
        return isDescendingSort ? -1 : 1;
      }
      return 0;
    });
  }

  get newSongPlaceholder() {
    let bandName = this.model.name;
    return `New ${capitalize([bandName])} song`;
  }

  @action
  async updateRating(song, rating) {
    song.rating = rating;
    song.type = 'songs';
    song.attributes = { rating, title: song.title };
    this.catalog.update(song);
  }

  @action
  async backRating(song, rating) {
    song.rating = rating;
    this.catalog.update('songs', song, { rating });
  }

  @action
  updateSearchTerm(event) {
    this.searchTerm = event.target.value;
  }

  @action
  async removeSong(song) {
    const data = await this.catalog.delete('songs', song.id);
    if (data) {
      this.model.songs = this.model.songs.filter((s) => s.id !== song.id);
    }
  }

  @action
  async editSong(song) {
    const updatedSong = {
      id: song.id,
      type: 'songs',
      attributes: {
        title: song.title,
        rating: song.rating,
      },
    };
    const data = await this.catalog.update(updatedSong);

    if (data) {
      const updatedSongs = this.model.songs.map((s) => {
        if (s.id === song.id) {
          return {
            ...s,
            title: updatedSong.attributes.title,
            rating: updatedSong.attributes.rating,
          };
        }
        return s;
      });

      this.model.songs = updatedSongs;
    }
  }
}
