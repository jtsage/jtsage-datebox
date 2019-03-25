## Interacting with DateBox

There are several ways to interact with DateBox programatically.

If you are simply trying to get multiple date formats, or parts of the date, this is much easier
to accomplish with the ___linkedField___ option.

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

### Example - Linked Dateboxes

<script type="text/javascript">
function linker(obby, nextDatebox) {
    var setDate = obby.date;

    setDate.adj(2, 1); // Add One Day

    // Format the date for min/max attribute
    minDateString = this.callFormat('%Y-%m-%d', setDate);

    // Set min date and a default on "next" datebox
    $('#' + nextDatebox).datebox({
        minDate      : minDateString,
        defaultValue : setDate
    });

    // Open "next" datebox
    $('#' + nextDatebox).datebox('open');
}
</script>
<div class="form-group">
	<label for="in_date">Check In Date</label>
	<input id="in_date" class="form-control" data-role="datebox" data-options='{"mode":"calbox","afterToday":true,"closeCallback":"linker","closeCallbackArgs":["out_date"]}' type="text">
</div>
<div class="form-group">
	<label for="out_date">Check Out Date</label>
	<input id="out_date" class="form-control" data-role="datebox" data-options='{"mode":"calbox"}' type="text">
</div>

##### Source - Script
```js
function linker(obby, nextDatebox) {
    var setDate = obby.date;

    setDate.adj(2, 1); // Add One Day

    // Format the date for min/max attribute
    minDateString = this.callFormat('%Y-%m-%d', setDate);

    // Set min date and a default on "next" datebox
    // We set the min to not allow dates before a day after checkin to be picked.
    // We set the default to make sure the view is appropriate.

    // In this case, should you want to "suggest" a one week stay, add 6 more days to
    // setDate, *after* pulling the minimum date ISO string.
    $('#' + nextDatebox).datebox({
        minDate      : minDateString,
        defaultValue : setDate
    });

    // Open "next" datebox
    $('#' + nextDatebox).datebox('open');
}
```

##### Source - HTML
```html
<div class="form-group">
	<label for="in_date">Check In Date</label>
	<input id="in_date" class="form-control" data-role="datebox" data-options='{"mode":"calbox","afterToday":true,"closeCallback":"linker","closeCallbackArgs":["out_date"]}' type="text">
</div>
<div class="form-group">
	<label for="out_date">Check Out Date</label>
	<input id="out_date" class="form-control" data-role="datebox" data-options='{"mode":"calbox"}' type="text">
</div>
``` 
