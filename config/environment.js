'use strict';
require('dotenv').config();

const key = process.env.API_KEY;
const endpoint = process.env.API_URL;

module.exports = function (environment) {
  const ENV = {
    modulePrefix: 'rock-and-roll',
    environment,
    rootURL: '/',
    locationType: 'history',
    apiUrl: endpoint,
    apiKey: key,
    EmberENV: {
      EXTEND_PROTOTYPES: false,
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  if (environment === 'development') {
    ENV['ember-cli-mirage'] = {
      enabled: false,
    };
    ENV.apiHost = 'https://json-api.rockandrollwithemberjs.com';
  }

  if (environment === 'test') {
    ENV['ember-cli-mirage'] = {
      enabled: true,
    };
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
    ENV['ember-cli-mirage'] = {
      enabled: false,
    };
    ENV.apiHost = 'https://json-api.rockandrollwithemberjs.com';
  }

  return ENV;
};
