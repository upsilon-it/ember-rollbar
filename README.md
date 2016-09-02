Ember Addon for [Rollbar](https://rollbar.com).

[![Build Status](https://travis-ci.org/vihryn/ember-rollbar.svg?branch=master)](https://travis-ci.org/vihryn/ember-rollbar)

`By default, Ember.onerror and rejected promises log to Rollbar.`

## Installing

```
ember install ember-rollbar
ember generate ember-rollbar
```

## Usage

Set config rollbar in appllication. It uses for configuring Rollbar.

```
ENV: {
  APP: {
    rollbar: {
      enabled: true,
      captureUncaught: true,
      payload: {
        environment
      }
    }
  }
}
```

You can inject rollbar and get access to configure method and rollbar instance.

```
// component.js

import Ember from 'ember';
const {
  Component,
  inject: { service }
} = Ember;

export default Component.extend({
  rollbarService: service('rollbar'),
  didInserElement() {
    this._super();
    get(this, 'rollbarService.rollbar').error('Error text.');
    get(this, 'rollbarService').configure({ enabled: false });
  }
});
```

## More Info

Please check out [Rollbar JavaScript docs](https://rollbar.com/docs/notifier/rollbar.js/)
