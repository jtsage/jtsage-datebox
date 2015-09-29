---
title: Globals
pagenum: 20
layout: doc
---

# Mis-Named
This section is really sort of misnamed.  It refers to the data available to use 
inside of a callback function.

# Callback arguments
Callbacks are called with "this" being set to the DateBox widget object. 

Additionally, the callback is called with an arguments[0] of useful DateBox data.

Finally, {% api_doc closeCallbackArgs %} is appended.  For the open
callback {% api_doc openCallbackArgs %} is used.

The first argument to any callback function, open or close, is an object of "useful" DateBox values.  They are:

 - **date** : The JavaScript date object of the current (chosen) date - Always defined, even if meaningless.
 - **initDate** : The JavaScript date object that holds the widget creation time/date. Always defined.
 - **duration** : The last entered duration, in seconds for duration modes - undefined if not.
 - **custom** : The array of chosen CustomFlip indexes if appropriate, undefined if not.
 
# Useful widget (this) methods and variables

## Variables

 - **lastDuration**: last set duration
 - **theDate**: current set date
 - **d.intHTML**: current widget HTML
 - **options**: the current set options of DateBox

## Methods

Of course, all the public functions listed in the [API]({{site.basesite}}api/) 
can be called directly.

Some "private" methods that might be useful (and possibly destructive) are:

 - **_ord(*int*)**: Get a number's ordinal
 - **__(*string*)**: Get an i18n value for string key
 - **_zPad(*int*)**: Zero pad an integer to 2 digits
 - **_dRep(*string*,*int*)**: Convert "string" to (int>0) indic numbers, or (int<0) from indic numbers
 - **_grabLabel()***: Grab the most reasonable label for the control. Returns string
