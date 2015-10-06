import Ember from 'ember';
import { initialize } from '../../../initializers/add-pod-class';
import { module, test } from 'qunit';

var registry, application;

module('Unit | Initializer | add pod class', {
  beforeEach: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      registry = application.registry;
      application.deferReadiness();
    });
  }
});

test('Standard controller podClass works', function(assert) {
  initialize(registry, application);

  Ember.COMPONENT_CSS_LOOKUP = {
    'test-abc': 'abc-worked'
  };

  const controller = Ember.Controller.create({
    toString() {
      return '<ember-pod-css@controller:test-abc::1234>';
    }
  });

  assert.equal(controller.get('podClass'), 'abc-worked', 'standard controller named parsed correctly');
});

test('Generated controller podClass works', function(assert) {
  initialize(registry, application);

  Ember.COMPONENT_CSS_LOOKUP = {
    'test-xyz': 'xyz-worked'
  };

  const controller = Ember.Controller.create({
    isGenerated: true,
    toString() {
      return '(generated test-xyz controller)';
    }
  });

  assert.equal(controller.get('podClass'), 'xyz-worked', 'generated controller named parsed correctly');
});

test('Component podClass works', function(assert) {
  initialize(registry, application);

  const component = Ember.Component.create({
    classNames: ['test-123']
  });

  assert.equal(component.get('podClass'), 'test-123', 'component podClass exists');
});
