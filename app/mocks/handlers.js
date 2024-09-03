import { http, HttpResponse } from 'msw';
import bandsDB from './bands-db';
import songsDB from './songs-db';
import relation from './relations-db';

let bands = bandsDB.data;
let songs = songsDB.data;
let relationships = relation;

export const handlers = [
  http.get('https://json-api.rockandrollwithemberjs.com/bands', () => {
    return HttpResponse.json({ data: bands });
  }),
  http.get(
    'https://json-api.rockandrollwithemberjs.com/bands/:id',
    async ({ params }) => {
      const { id } = params;
      const band = bands.find((band) => band.id === id);
      return HttpResponse.json({ band });
    },
  ),
  http.post(
    'https://json-api.rockandrollwithemberjs.com/bands',
    async ({ request }) => {
      const data = await request.json();
      const band = data.data;
      const id = band.attributes.name.toLowerCase().split(' ').join('-');

      const relationships = {
        songs: {
          links: {
            related: `https://json-api.rockandrollwithemberjs.com/bands/${id}/songs`,
            self: `https://json-api.rockandrollwithemberjs.com/bands/${id}/relationships/songs`,
          },
        },
      };

      const newBand = {
        id,
        type: 'bands',
        attributes: {
          name: band.attributes.name,
          description: band.attributes.name.toUpperCase(),
        },
        relationships,
        links: {
          self: `https://json-api.rockandrollwithemberjs.com/bands/${id}`,
        },
      };
      bands.push(newBand);
      relation.push({ id, type: newBand.type, songs: [] });
      return HttpResponse.json({ data: newBand });
    },
  ),
  http.delete(
    'https://json-api.rockandrollwithemberjs.com/bands/:id',
    ({ params }) => {
      const { id } = params;
      const index = bands.findIndex((band) => band.id === id);
      if (index !== -1) {
        bands.splice(index, 1);
        return HttpResponse.json({ ok: true });
      } else {
        return HttpResponse.json({ error: 'Band not found' });
      }
    },
  ),
  http.patch(
    'https://json-api.rockandrollwithemberjs.com/bands/:id',
    async ({ request, params }) => {
      const { id } = params;
      const updatedData = await request.json();

      const bandIndex = bands.findIndex((band) => band.id === id);

      if (bandIndex === -1) {
        return HttpResponse.json({ error: 'Band not found' });
      }
      bands[bandIndex] = {
        ...bands[bandIndex],
        ...updatedData.data,
      };

      return HttpResponse.json({ data: bands[bandIndex] });
    },
  ),
  //Songs
  http.get('https://json-api.rockandrollwithemberjs.com/songs', () => {
    return HttpResponse.json({ data: songs });
  }),
  http.get(
    'https://json-api.rockandrollwithemberjs.com/bands/:id/songs',
    async ({ params }) => {
      const { id } = params;
      const songsID = relationships.find((relation) => relation.id === id);
      const listSongs = songsID.songs.map((songId) =>
        songs.find((song) => +song.id === songId),
      );
      return HttpResponse.json({ data: listSongs });
    },
  ),
  http.post(
    'https://json-api.rockandrollwithemberjs.com/songs',
    async ({ request }) => {
      const data = await request.json();
      const song = data.data;
      const id = +songs[songs.length - 1].id + 1;
      const bandId = song.relationships.band.data.id;

      const relationships = {
        band: {
          links: {
            self: `https://json-api.rockandrollwithemberjs.com/songs/${id}/relationships/band`,
            related: `https://json-api.rockandrollwithemberjs.com/songs/${id}/band`,
          },
        },
      };

      const newSong = {
        id,
        type: 'songs',
        links: {
          self: `https://json-api.rockandrollwithemberjs.com/songs/${id}`,
        },
        attributes: {
          title: song.attributes.title,
          rating: 0,
        },
        relationships,
      };

      songs.push(newSong);
      relation.find((item) => {
        if (item.id === bandId) {
          item.songs.push(id);
        }
      });
      return HttpResponse.json({ data: newSong });
    },
  ),
  http.patch(
    'https://json-api.rockandrollwithemberjs.com/songs/:id',
    async ({ request, params }) => {
      const { id } = params;
      const updatedData = await request.json();

      const songIndex = songs.findIndex((song) => +song.id === +id);

      if (songIndex === -1) {
        return HttpResponse.json({ error: 'Song not found' });
      }
      songs[songIndex] = {
        ...songs[songIndex],
        ...updatedData.data,
      };

      return HttpResponse.json({ data: songs[songIndex] });
    },
  ),
  http.delete(
    'https://json-api.rockandrollwithemberjs.com/songs/:id',
    ({ params }) => {
      const { id } = params;
      const index = songs.findIndex((song) => song.id === id);
      if (index !== -1) {
        songs.splice(index, 1);
        relation.find((item) => {
          if (item.songs.includes(+id)) {
            item.songs.splice(item.songs.indexOf(+id), 1);
          }
        });

        return HttpResponse.json({ ok: true });
      } else {
        return HttpResponse.json({ error: 'Band not found' });
      }
    },
  ),
];
