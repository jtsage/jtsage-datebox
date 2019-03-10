

## Configuration

There are a number of ways to configure DateBox.  Not all of them are created equally.  This will cover
all of the options. All examples show a "calbox" that allows choosing a date only within 10 days of today.

There are far to many options to cover in the course of this document - have a look at the [Full Options List](../api) or the [Options Demos](../optDemo) for a complete list.

### data-options HTML attribute.

The most used on this documentation site is the data-options attribute.  This is well-formed json encapsulated in the data-options attribute of the input element.  Because it must be truly well-formed, you'll need to surroud the json with single quotes.

##### Example

```html
<input type="text" data-role="datebox" data-options='{"mode":"calbox", "maxDays": 10, "minDays": 10}'>
```

### Long style attribute options

Another option for options is convert them to long style attribute names.  Camel case becomes a dash, and is prefixed with _"data-datebox-"_.  So,

 * mode -> data-datebox-mode
 * minDays -> data-datebox-min-days
 * maxDays -> data-datebox-max-days

##### Example

```html
<input type="text" data-role="datebox" data-datebox-mode="calbox" data-datebox-max-days="10" data-datebox-min-days="10">
```

### Overloading the prototype

If you want to change the defaults on multiple dateboxes, overloading the prototype might be a better option.  Sometime after DateBox is loaded, something like this will do it:

##### Example

```js
jQuery.extend(jQuery.jtsage.datebox.prototype.options, {
	mode: "calbox",
	maxDays: 10,
	minDays: 10
});
```

### Using the constructor

If you prefer to initialize DateBox yourself, you can omit the _data-role="datebox"_ attribute, and call DateBox directly on the input element to enhance.  This does not preclude the first 2 methods above, they will still be read. Note that this method may be the easiest if you wish to run a lot of callbacks, as you don't have to either serialize them, or call them by reference.

```html
<div><input id="someinput" type="text"></div>
```

Then, to enhance it, call datebox() in a script:

```js
$('#someinput').datebox({
	mode: "calbox",
	maxDays: 10,
	minDays: 10
});
```

## Required Options

Only one option is actually required, ___mode___

It can be any of:

 * datebox
     * Control allows input of date using multiple inputs with +/- buttons
 * timebox
     * Control allows input of time using multiple inputs with +/- buttons
 * datetimebox
     * Control allows input of date & time using multiple inputs with +/- buttons
 * calbox
     * Control allows input of date using a calendar grid
 * flipbox
     * Control allows input of date using draggable columns
 * timeflipbox
     * Control allows input of time using draggable columns
 * datetimeflipbox
     * Control allows input of date & time using draggable columns
 * slidebox
     * Control allows input of date using draggable rows
 * durationbox
     * Control allows input of duration using multiple inputs with +/- buttons
 * durationflipbox
     * Control allows input of duration using draggable columns

Additionally, you may want to override the default on ___displayMode___.  It can be the following 

 * dropdown
     * Display the control as a popover attached to the input (default)
 * inline
     * Display the control inline in the page, under the input, always visible
 * blind
     * Display the control inline in the page, under the input, sliding up and down
 * modal
     * Display the control in a full window modal