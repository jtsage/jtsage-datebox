jQuery-Mobile-DateBox
=====================

DateBox is a jQuery-mobile based date and time picker. [Full Documentation and Demos](http://dev.jtsage.com/jQM-DateBox/)

DateBox Features
----------------

* Multiple Data-Entry Modes:
  * Android style date picker
  * Calendar style date picker
  * Slide style date picker
  * Flip Wheel style date or time picker
  * 12 and 24 hour time picker
  * Duration time picker

* 4 Different display modes:
  * Standard, click-outside-to-close popup mode
  * Forced input modal popup mode
  * Unique page dialog mode
  * Inline mode

* Fully localized:
  * Configurable Month names
  * Configurable Day Names
  * All labels and buttons configuratble
  * Multiple languages can be loaded at once for dynamic reconfigure

* Supports data-limiting of input:
  * Minimum and Maximum Years, Hours, number of days, etc...
  * Disabled days, dates, and hours, etc...

* Automatically parses hand-entered or pre-entered dates on open

* Auto-bind's to data-type='datebox', options are configurable via data-options.

Special Thanks
--------------

This is based in part on the work of Todd M. Horst, and his [Android Like Date Picker 2](http://toddmhorst.wordpress.com/2010/12/30/android-like-date-picker-with-jquery-mobile-2/)

Some features inspired by [mobiscroll](http://code.google.com/p/mobiscroll/) - Specifically the IOS-ish flipbox.

An extra special thanks to [Phill Pafford](http://stackoverflow.com/users/93966/phill-pafford) for answering tons of questions about DateBox, and jQueryMobile in general on StackOverflow.

And last but not least, thanks to all the [contributors](https://github.com/jtsage/jquery-mobile-datebox/contributors) to the project on github.

Downloading
-----------

All scripts are available on the cdn:

DateBox uses the following version scheme:

[http://cdn.jtsage.com/datebox/&lt;jqm VERSION&gt;/](http//cdn.jtsage.com/datebox/)

You must load:
* jqm-datebox.core.js (or min)
* AND:: jqm-datebox.mode.&lt;yourmode&gt;.js

OR (if using only one mode)
* jqm-datebox.comp.&lt;yourmode&gt;.js

#### Latest Versions:

[cdn repo](http://cdn.jtsage.com/datebox/latest/)

Suggested Use
-------------

#### With Option Overrides:
	
	<input type="date" data-role="datebox" name="somedate"
		data-options='{"mode": "datebox", "overrideDateFormat": "mm/dd/YYYY"}' />
		
#### Global Option Overrides:
	
	// AFTER loading jQM
	jQuery.extend(jQuery.mobile.datebox.prototype.options, {
		'overrideDateFormat': 'dd.mm.yyyy',
	});

Available Options
-----------------

Please see the full api documentation at: [dev.jtsage.com](http://dev.jtsage.com/jQM-DateBox/api/)

Runtime Operation (Scripting / Extending)
-----------------------------------------

Please see the full api documentation at: [dev.jtsage.com](http://dev.jtsage.com/jQM-DateBox/api/)

