/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-rollbar',

  included(app) {
    this._super.included(app);

    app.import(`${ app.bowerDirectory }/rollbar/dist/rollbar.js`);
  }
};
