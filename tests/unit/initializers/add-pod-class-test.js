import Ember from 'ember';
import { initialize } from '../../../initializers/add-pod-class';
import { module, test } from 'qunit';

var registry, application;

module('Unit | Initializer | add pod class', {
  beforeEach: function() {
    Ember.run(function() {
      Ember.COMPONENT_CSS_LOOKUP = {
        'test-abc': 'abc-worked',
        'test-xyz': 'xyz-worked',
      };
      
      application = Ember.Application.create();
      registry = application.registry;
      application.deferReadiness();
    });
  }
});

test('it works', function(assert) {
  initialize(registry, application);

  const standardController = Ember.Controller.create({
    toString() {
      return '<ember-pod-css@controller:test-abc::1234>';
    }
  });

  const generatedController = Ember.Controller.create({
    isGenerated: true,
    toString() {
      return '(generated test-xyz controller)';
    }
  });

  const component = Ember.Component.create({
    classNames: ['test-123']
  });

  assert.equal(standardController.get('podClass'), 'abc-worked', 'standard controller named parsed correctly');
  assert.equal(generatedController.get('podClass'), 'xyz-worked', 'generated controller named parsed correctly');
  assert.equal(component.get('podClass'), 'test-123', 'component podClass exists');
});
