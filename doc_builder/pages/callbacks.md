## Interacting with DateBox

There are several ways to interact with DateBox programatically.

DateBox provides a number of callbacks that will run automatically, exports some functions publicly, regularly bubbles it's own events up the DOM tree, and accepts some .trigger()'s.

### Callbacks

This is a list of definable callbacks.  Generally, all callbacks can either be a function, or a string reference to a function defined in the window namespace (If you are unfamiliar with this term, it's somewhat analagous to the global object in a browser)

{{run:apiGen.getCatCallbacks}}

### Public Functions

These are callable functions that leveage aspects of DateBox, or allow you to change aspects of DateBox

{{run:funcGen.getFunc}}

#### Listeners

These are events that happen in the DOM because of something that DateBox has done.  i.e., These are the cause, you choose the effect.

{{run:funcGen.getListen}}

#### Triggers

These are events that change something about DateBox.

{{run:funcGen.getTrigger}}

