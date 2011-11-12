jQuery-Mobile-DateBox
=====================

DateBox is a jQuery-mobile based date and time picker.

This is based in part on the work of Todd M. Horst, and his [Android Like Date Picker 2](http://toddmhorst.wordpress.com/2010/12/30/android-like-date-picker-with-jquery-mobile-2/)

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
  * Configurable maximum and minimum years (android mode)
  * Configurable maximum and minimum number of days from "today" (both date modes)
  * Allows blacklisting of days of the week or specific dates (calendar mode) 
  * Allows selecting specific day from any week selection (calendar mode)

* Automatically parses hand-entered or pre-entered dates on open

* Auto-bind's to data-type='datebox', options are configurable via data-options.

Suggested Use
-------------

#### No Option Overrides:
		
	<input type="date" data-role="datebox" name="somedate" />
		
#### With Option Overrides:
	
	<input type="date" data-role="datebox" name="somedate" data-options='{"buttonTheme": "b", "dateFormat": "mm/dd/YYYY"}' />
		
#### Global Option Overrides:
	
	// AFTER loading jQM
	jQuery.extend(jQuery.mobile.datebox.prototype.options, {
		'dateFormat': 'dd.mm.yyyy',
		'headerFormat': 'dd.mm.yyyy'
	});

Available Options
-----------------

Please see the full api documentation at: [dev.jtsage.com](http://dev.jtsage.com/jQM-DateBox/demos/api/matrix.html)

Runtime Operation (Scripting / Extending)
-----------------------------------------

Please see the full api documentation at: [dev.jtsage.com](http://dev.jtsage.com/jQM-DateBox/demos/api/events.html)

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
* Any of the calendar of slide mode themes (except the base theme) & disabledDayColor & calWeekModeHighLight
* closeCallback
* These require throwing the 'reset' trigger method, or hardreset() function:
  * Any of the labels on buttons / window titles.
  * Any of the themes on the datebox or time modes.
  * Any of the options related to inline display
  * timeFormat, fieldsOrder

The following options happen to early, and cannot be changed post-initialization by script events.

* Operation mode
* useInline or useInlineBlind
* noButtonFocusMode, useModal, zindex, noAnimation


  
