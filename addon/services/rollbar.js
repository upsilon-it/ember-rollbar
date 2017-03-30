/*global Rollbar*/
import Ember from 'ember';

export default Ember.Service.extend({
  rollbar: null,

  configure(config = {}) {
    if (Rollbar.init) {
      Rollbar.init(config);
    } else {
      Rollbar.configure(config);
    }

    Ember.set(this, 'rollbar', Rollbar);
    return Rollbar;
  }
});
