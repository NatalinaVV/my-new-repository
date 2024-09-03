import loadInitializers from 'ember-load-initializers';
import Application from '@ember/application';
import Resolver from 'ember-resolver';
import config from 'rock-and-roll/config/environment';
import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faStar,
  faAngleUp,
  faAngleDown,
  faSearch,
  faCommentDots,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

library.add(
  faStar,
  faStarRegular,
  faAngleUp,
  faAngleDown,
  faSearch,
  faCommentDots,
  faEdit,
  faTrash,
);

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
