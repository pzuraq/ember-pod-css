# Ember-pod-css

This Ember addon adds a `podClass` property to Controllers and Components in
Ember apps that use `ember-component-css`. It allows users to hook into the
component class and control where styles are applied, which may be useful in
pod based routes and tagless components.

Note that this addon was purposefully made separate from ember-component-css
because it is experimental and may potentially cause deviation from the future
of pod based styles. It is meant as a stop-gap measure until pod based styles
have been implemented in a more standardized way. YMMV.
