/*global Rollbar*/
import Ember from 'ember';

const {
  Service,
  set,
  RSVP
} = Ember;

const GLOBAL_ERRORS = [];

window._getErrors = () => GLOBAL_ERRORS;
window._resetErrors = () => GLOBAL_ERRORS.length = 0;

const reportError = (...args) => {
  Rollbar.error.apply(Rollbar, args);
  GLOBAL_ERRORS.push(JSON.parse(JSON.stringify(args)));
};

const reportEmberErrorToRollbar = (error, source) => {
  if (error instanceof Error) {
    reportError(error, { emberSource: `${source} with error object` });
  } else if (error) {
    if (error.message && error.name) {
      reportError(`${error.name}: ${error.message}`,
        { origError: error, emberSource: `${source} with non-error instance` });
    } else {
      reportError(error, { emberSource: `${source} with non-error instance` });
    }
  } else {
    reportError('Error is undefined', { emberSource: `${source} default` });
  }
};

export default Service.extend({
  rollbar: null,

  configure(config = {}) {
    const onError = Ember.onerror;

    if (Rollbar.init) {
      Rollbar.init(config);
    } else {
      Rollbar.configure(config);
    }

    Ember.onerror = (error) => {
      if (onError) {
        onError(error);
      }
      reportEmberErrorToRollbar(error, 'Ember.onerror');
    };

    RSVP.on('error', reportEmberErrorToRollbar);

    set(this, 'rollbar', Rollbar);

    return Rollbar;
  }
});
