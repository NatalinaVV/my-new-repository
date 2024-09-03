let bandsDB = {
  data: [
    {
      id: 'foo-fighters',
      type: 'bands',
      links: {
        self: 'https://json-api.rockandrollwithemberjs.com/bands/foo-fighters',
      },
      attributes: {
        name: 'Foo Fighters',
        description: null,
      },
      relationships: {
        songs: {
          links: {
            self: 'https://json-api.rockandrollwithemberjs.com/bands/foo-fighters/relationships/songs',
            related:
              'https://json-api.rockandrollwithemberjs.com/bands/foo-fighters/songs',
          },
        },
      },
    },
    {
      id: 'kaya-project',
      type: 'bands',
      links: {
        self: 'https://json-api.rockandrollwithemberjs.com/bands/kaya-project',
      },
      attributes: {
        name: 'Kaya Project',
        description: null,
      },
      relationships: {
        songs: {
          links: {
            self: 'https://json-api.rockandrollwithemberjs.com/bands/kaya-project/relationships/songs',
            related:
              'https://json-api.rockandrollwithemberjs.com/bands/kaya-project/songs',
          },
        },
      },
    },
    {
      id: 'led-zeppelin',
      type: 'bands',
      links: {
        self: 'https://json-api.rockandrollwithemberjs.com/bands/led-zeppelin',
      },
      attributes: {
        name: 'Led Zeppelin',
        description: null,
      },
      relationships: {
        songs: {
          links: {
            self: 'https://json-api.rockandrollwithemberjs.com/bands/led-zeppelin/relationships/songs',
            related:
              'https://json-api.rockandrollwithemberjs.com/bands/led-zeppelin/songs',
          },
        },
      },
    },
    {
      id: 'pearl-jam',
      type: 'bands',
      links: {
        self: 'https://json-api.rockandrollwithemberjs.com/bands/pearl-jam',
      },
      attributes: {
        name: 'Pearl Jam',
        description:
          'Pearl Jam is an American rock band, formed in Seattle, Washington in 1990.',
      },
      relationships: {
        songs: {
          links: {
            self: 'https://json-api.rockandrollwithemberjs.com/bands/pearl-jam/relationships/songs',
            related:
              'https://json-api.rockandrollwithemberjs.com/bands/pearl-jam/songs',
          },
        },
      },
    },
    {
      id: 'radiohead',
      type: 'bands',
      links: {
        self: 'https://json-api.rockandrollwithemberjs.com/bands/radiohead',
      },
      attributes: {
        name: 'Radiohead',
        description: null,
      },
      relationships: {
        songs: {
          links: {
            self: 'https://json-api.rockandrollwithemberjs.com/bands/radiohead/relationships/songs',
            related:
              'https://json-api.rockandrollwithemberjs.com/bands/radiohead/songs',
          },
        },
      },
    },
    {
      id: 'red-hot-chili-peppers',
      type: 'bands',
      links: {
        self: 'https://json-api.rockandrollwithemberjs.com/bands/red-hot-chili-peppers',
      },
      attributes: {
        name: 'Red Hot Chili Peppers',
        description: null,
      },
      relationships: {
        songs: {
          links: {
            self: 'https://json-api.rockandrollwithemberjs.com/bands/red-hot-chili-peppers/relationships/songs',
            related:
              'https://json-api.rockandrollwithemberjs.com/bands/red-hot-chili-peppers/songs',
          },
        },
      },
    },
    {
      id: 'sahara',
      type: 'bands',
      links: {
        self: 'https://json-api.rockandrollwithemberjs.com/bands/sahara',
      },
      attributes: {
        name: 'Sahara',
        description: null,
      },
      relationships: {
        songs: {
          links: {
            self: 'https://json-api.rockandrollwithemberjs.com/bands/sahara/relationships/songs',
            related:
              'https://json-api.rockandrollwithemberjs.com/bands/sahara/songs',
          },
        },
      },
    },
  ],
};

export default bandsDB;
