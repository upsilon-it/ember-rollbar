/* global Rollbar */
import Ember from 'ember';

const {
  Logger,
  typeOf
} = Ember;

const stringify = function (object) {
  return JSON ? JSON.stringify(object) : object.toString();
};

const isError = function (object) {
  return typeOf(object) === 'error';
};

export default {
  name: 'rollbar',

  initialize: function () {
    var errorLogger = Logger.error;
    Logger.error = function (...args) {
      let err = isError(args[0]) ? args[0] : new Error(stringify(args));
      if (Rollbar) {
        Rollbar.error.call(Rollbar, err);
      }
      errorLogger.apply(this, arguments);
    };

    var warnLogger = Logger.warn;
    Logger.warn = function () {
      if (Rollbar) {
        Rollbar.warning.apply(Rollbar, arguments);
      }
      warnLogger.apply(this, arguments);
    };

    var infoLogger = Logger.info;
    Logger.info = function () {
      if (Rollbar) {
        Rollbar.info.apply(Rollbar, arguments);
      }
      infoLogger.apply(this, arguments);
    };

    var debugLogger = Logger.debug;
    Logger.debug = function () {
      if (Rollbar) {
        Rollbar.debug.apply(Rollbar, arguments);
      }
      debugLogger.apply(this, arguments);
    };
  }
};
