import Ember from 'ember';

const { computed } = Ember;
const { reads } = computed;

let didRun = false;

export function initialize() {
  if (didRun) {
    return;
  }

  didRun = true;

  Ember.Controller.reopen({
    init(...args) {
      this._super(...args);

      const namePattern = this.isGenerated ? /.+\s(\S+)\s.+/ : /.+controller:(.+?):.+/;

      const name = this.toString().replace(namePattern, "$1");

      this.set('podClass', Ember.COMPONENT_CSS_LOOKUP[name]);
    }
  });

  Ember.Component.reopen({
    podClass: reads('classNames.lastObject')
  });
}

export default {
  name: 'controller-pod-class-initializer',
  initialize: initialize
};
