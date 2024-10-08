import Service from '@ember/service';
import Band from 'rock-and-roll/models/band';
import Song from 'rock-and-roll/models/song';
import { tracked } from 'tracked-built-ins';
import { isArray } from '@ember/array';
import ENV from 'rock-and-roll/config/environment';

function extractRelationships(object) {
  let relationships = {};
  for (let relationshipName in object) {
    relationships[relationshipName] = object[relationshipName].links.related;
  }
  return relationships;
}

export default class CatalogService extends Service {
  storage = {};

  constructor() {
    super(...arguments);
    this.storage.bands = tracked([]);
    this.storage.songs = tracked([]);
  }

  get bandsURL() {
    return `${ENV.apiHost || ''}/bands`;
  }

  get songsURL() {
    return `${ENV.apiHost || ''}/songs`;
  }

  async fetchAll(type) {
    if (type === 'bands') {
      let response = await fetch(this.bandsURL);
      let json = await response.json();

      this.loadAll(json);
      return this.bands;
    }
    if (type === 'songs') {
      let response = await fetch(this.songsURL);
      let json = await response.json();
      this.loadAll(json);
      return this.songs;
    }
  }

  loadAll(json) {
    let records = [];
    for (let item of json.data) {
      records.push(this._loadResource(item));
    }
    return records;
  }

  load(response) {
    return this._loadResource(response.data);
  }

  _loadResource(data) {
    let record;
    let { id, type, attributes, relationships } = data;
    if (type === 'bands') {
      let rels = extractRelationships(relationships);
      record = new Band({ id, ...attributes }, rels);
      this.add('band', record);
    }
    if (type === 'songs') {
      let rels = extractRelationships(relationships);
      record = new Song({ id, ...attributes }, rels);
      this.add('song', record);
    }
    return record;
  }

  async fetchRelated(record, relationship) {
    let url = record.relationships[relationship];
    let response = await fetch(url);
    let json = await response.json();
    if (isArray(json.data)) {
      record[relationship] = this.loadAll(json);
    } else {
      record[relationship] = this.load(json);
    }
    return record[relationship];
  }

  _handleUpdate(type, updatedData) {
    const storageKey = type === 'bands' ? 'bands' : 'songs';
    const index = this.storage[storageKey].findIndex(
      (item) => item.id === updatedData.id,
    );

    if (index !== -1) {
      this.storage[storageKey][index] = this._loadResource(updatedData);
      return updatedData;
    }

    return false;
  }

  _handleDeletion(type, id) {
    const storageKey = type === 'bands' ? 'bands' : 'songs';
    const index = this.storage[storageKey].findIndex((item) => item.id === id);

    if (index !== -1) {
      this.storage[storageKey].splice(index, 1);
      return true;
    }

    return false;
  }

  async create(type, attributes, relationships = {}) {
    let payload = {
      data: {
        type: type === 'band' ? 'bands' : 'songs',
        attributes,
        relationships,
      },
    };
    let response = await fetch(
      type === 'band' ? this.bandsURL : this.songsURL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/vnd.api+json',
        },
        body: JSON.stringify(payload),
      },
    );
    let json = await response.json();
    return this.load(json);
  }

  async delete(type, id = {}) {
    const url =
      type === 'bands' ? `${this.bandsURL}/${id}` : `${this.songsURL}/${id}`;
    let response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/vnd.api+json',
      },
    });

    if (await response.ok) {
      return this._handleDeletion(type, id);
    }
    return false;
  }

  async update({ type, id, attributes }) {
    let payload = {
      data: {
        id,
        type: type === 'bands' ? 'bands' : 'songs',
        attributes,
      },
    };

    let url =
      type === 'bands' ? `${this.bandsURL}/${id}` : `${this.songsURL}/${id}`;

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/vnd.api+json',
      },
      body: JSON.stringify(payload),
    });

    const json = await response.json();
    if (json) {
      return this._handleUpdate(type, json.data);
    }

    return false;
  }

  add(type, record) {
    let collection = type === 'band' ? this.storage.bands : this.storage.songs;
    let recordIds = collection.map((record) => record.id);
    if (!recordIds.includes(record.id)) {
      collection.push(record);
    }
  }

  get bands() {
    return this.storage.bands;
  }

  get songs() {
    return this.storage.songs;
  }

  find(type, filterFn) {
    let collection = type === 'band' ? this.bands : this.songs;
    return collection.find(filterFn);
  }
}
