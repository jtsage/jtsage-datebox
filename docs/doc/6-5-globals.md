---
title: Globals
pagenum: 20
layout: doc
---

# Mis-Named
This section is really sort of misnnamed.  It refers to the data avalable to use 
inside a callback function.

# Callback arguments
Callbacks are called with "this" being set to the datebox widget object.  
Additionally, the close callback is called with an argument[0] of the just set 
javascript date **object**.  Finally, {% api_doc closeCallbackArgs %} is 
appended.  For the open callback, only {% api_doc openCallbackArgs %} is used.

# Useful widget (this) methods and variables

## Variables

 - **lastDuration**: last set duration
 - **theDate**: current set date
 - **d.intHTML**: current widget HTML
 - **options**: the current set options of datebox

## Methods

Of course, all the public functions listed in the [API]({{site.basesite}}api/) 
can be called directly.

Some "private" methods that might be useful (and possibly destructive) are:

 - **_ord(*int*)**: Get a number's ordinal
 - **__(*string*)**: Get an i18n value for string key
 - **_zPad(*int*)**: Zero pad an interger to 2 digits
 - **_dRep(*string*,*int*)**: Convert "string" to (int>0) indic numbers, or (int<0) from indic numbers
 - **_applyCoords()***: Re-compute position of the datebox popup
 - **_grabLabel()***: Grab the most reasonable label for the control. Returns string
