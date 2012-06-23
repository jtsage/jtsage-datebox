jQuery-Mobile-DateBox
=====================

DateBox is a jQuery-mobile based date and time picker. [Full Documentation and Demos](http://dev.jtsage.com/jQM-DateBox2/)

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

http://dev.jtsage.com/cdn/datebox/<jqm VERSION>/

You must load:
* jqm-datebox.core.js (or min)
* AND:: jqm-datebox.mode.<yourmode>.js

OR (if using only one mode)
* jqm-datebox.comp.<yourmode>.js

#### Latest Versions:

[cdn repo](http://dev.jtsage.com/cdn/datebox/latest/)

Suggested Use
-------------

#### With Option Overrides:
	
	<input type="date" data-role="datebox" name="somedate" data-options='{"mode": "datebox", "overrideDateFormat": "mm/dd/YYYY"}' />
		
#### Global Option Overrides:
	
	// AFTER loading jQM
	jQuery.extend(jQuery.mobile.datebox.prototype.options, {
		'overrideDateFormat': 'dd.mm.yyyy',
	});

Available Options
-----------------

Please see the full api documentation at: [dev.jtsage.com](http://dev.jtsage.com/jQM-DateBox2/demos/fullopt.html)

Runtime Operation (Scripting / Extending)
-----------------------------------------

Please see the full api documentation at: [dev.jtsage.com](http://dev.jtsage.com/jQM-DateBox2/demos/fullopt.html)

### Just-In-Time options updating

The following options **can** be changed after initialization (i.e. in per-page scripts after load). Almost all will require you to refresh the control.

* Data limiting:
  * minDays & maxDays & afterToday
  * minYear & maxYear
  * blackDays & blackDates
  * calWeekMode & calWeekModeFirstDay
  * minuteStep
* Display / Internationalization:
  * calStartDay
  * daysOfWeek, daysOfWeekShort, monthsOfYear, monthsOfYearShort, headerFormat
  * dateFormat _(probably - it will throw off reopens though)_
  * Dialog mode forcing (either on or off)
* Any of the calendar or slide mode themes (except the base theme) & disabledDayColor & calWeekModeHighLight
* closeCallback, openCallback
* These require throwing the 'refresh' trigger method, or refresh() function:
  * Any of the labels on buttons / window titles.
  * Any of the themes on the datebox or time modes.
  * Any of the options related to inline display
  * timeFormat, fieldsOrder

The following options happen to early, and cannot be changed post-initialization by script events.

* useInline, useInlineBlind, hideInput
* useButton, useModal, zindex, useAnimation, useNewStyle, useAltIcon, overrideStyleClass


  
