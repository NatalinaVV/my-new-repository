import { tracked } from '@glimmer/tracking';

export default class Band {
  @tracked name;
  @tracked songs;

  customRelationships(id) {
    return {
      songs: {
        links: {
          related: `https://json-api.rockandrollwithemberjs.com/bands/${id}/songs`,
          self: `https://json-api.rockandrollwithemberjs.com/bands/${id}/relationships/songs`,
        },
      },
    };
  }

  constructor({ id, name, songs, description }, relationships = {}) {
    this.id = id || Math.floor(Math.random() * 1000);
    this.name = name || '';
    this.songs = songs || [];
    this.relationships = relationships || this.customRelationships(this.id);
    this.description = description || 'Hey';
  }
}
