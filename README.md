jQuery-Mobile-DateBox
=====================

DateBox is a jQuery-mobile based date and time picker.

This is based in part on the work of Todd M. Horst, and his [Android Like Date Picker 2](http://toddmhorst.wordpress.com/2010/12/30/android-like-date-picker-with-jquery-mobile-2/)

DateBox Features
----------------

* Multiple Data-Entry Modes:
  * Android style date picker
  * Calendar style date picker
  * 12 and 24 hour time picker

* 4 Different display modes:
  * Standard, click-outside-to-close popup mode
  * Forced input modal popup mode
  * Unique page dialog mode
  * Inline mode

* Fully localized:
  * Configurable Month names
  * Configurable Day Names
  * All labels and buttons configuratble

* Supports data-limiting of input:
  * Configurable maximum and minimum years (android mode)
  * Configurable maximum and minimum number of days from "today" (both date modes)
  * Allows blacklisting of days of the week or specific dates (calendar mode) 
  * Allows selecting specific day from any week selection (calendar mode)

* Automatically parses hand-entered or pre-entered dates on open

* Auto-bind's to data-type='datebox', options are configurable via data-options.

Suggested Use
-------------

	// BEFORE loading jQM
	$( document ).bind( "mobileinit", function(){
		$.mobile.page.prototype.options.degradeInputs.date = 'text';
	});

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

These can be passed to datebox via an object set at the data-options attribute, or in the standard method.

* _(operation mode)_ __option__ : Description _(default value)_

### Themeing:
* _(all)_ __theme__ : Theme for original input element. _(c)_
* _(all)_ __pickPageTheme__ : Theme for popup window or dialog. _(b)_
* _(all)_ __pickPageButtonTheme__ : Widget buttons. _(a)_
* _(all)_ __zindex__ : Z-Index for popup window. _(500)_
* _(all)_ __noAnimation__ : Disable popup window animations. _(false)_
* _(android)_ __pickPageInputTheme__ : Month/Date/Year Input Elements. _(e)_
* _(calendar)_ __pickPageHighButtonTheme__ : "Today" and "Selected" Day highlighting. _(e)_
* _(calendar)_ __disabledDayColor__ : Text color for disabled days with date limiting. _(#888)_

### Date Formats and Text Internationalization
* _(android)_ __daysOfWeek__ : An array of the days of the week. _(['Sunday', 'Monday', ... 'Saturday'])_
* _(android)_ __fieldsOrder__ : Define the order of the fields. _(['m', 'd', 'y'])_
* _(calendar)_ __daysOfWeekShort__ : An Array of abreviations for days of the week. _(['Su', 'Mo', ... 'Sa'])_
* _(both date)_ __monthsOfYear__ : An Array of months of the year. _(['January', 'February', ... 'December'])_
* _(both date)_ __headerFormat__ : Return header format. _(ddd, mmm dd, YYYY)_
  * __YYYY__ : 4 Digit Year
  * __MM__ : 2 Digit Month (zero pad)
  * __mm__ : 1 or 2 Digit Month
  * __mmm__ : Text Month
  * __DD__ : 2 Digit Day (zero pad)
  * __dd__ : 1 or 2 Digit Day
  * __ddd__ : Day of week
* _(both date)_ __dateFormat__ : Return date format. _(YYYY-MM-DD)_
  * __YYYY__ : 4 Digit Year
  * __MM__ : 2 Digit Month (zero pad)
  * __mm__ : 1 or 2 Digit Month
  * __DD__ : 2 Digit Day (zero pad)
  * __dd__ : 1 or 2 Digit Day
* _(time)_ __timeFormat__ : Either '12' or '24' - The clock mode, 12hr or 24hr. _(24)_
* _(time)_ __meridiemLetters__ : Meridiem notation _(['AM', 'PM'])_

### Data Limits:
* _(both date)_ __defaultDate__ : Default date when nothing entered into input box. _(null)_
* _(both date)_ __afterToday__ : Limit date to "today" or after. _(false)_
* _(both date)_ __maxDays__ : Set the upper limit to this # of days after today. _(false)_
* _(both date)_ __minDays__ : Set the lower limit to this # of days before today. _(false)_
* _(android)_ __maxYear__ : Maximum year allowed in controls (non-constrained in text box). _(false)_
* _(android)_ __minYear__ : Minimum year allowed in controls (non-constrained in text box). _(false)_
* _(calendar)_ __calWeekMode__ : Boolean, week mode on or off (choose only a specific DAY). _(false)_
* _(calendar)_ __calWeekModeFirstDay__ : Day of week to choose with week mode (numeric, 0=sun ... 6=sat). _(1)_
* _(calendar)_ __blackDays__ : An array of days of the week to blacklist. _(false)_
  * ___example___ : [0,2] : Blacklist sunday and tuesday.
* _(calendar)_ __blackDates__ : A complex object tree or simple array of individual dates to blacklist. _(false)_
  * ___example___ : {"y2001": {'m12': [24,25] } } : Blacklist December 24th &amp; 25th, 2001.
  * ___example___ : [ '2010-12-24', '2010-12-25' ] : Blacklist December 24th &amp; 25th, 2010.
* _(time)_ __minuteStep__ : Number of minutes to step per button press in timebox mode. _(1)_

### User Interface:
* __mode__ : Mode of operation. _(datebox)_
  * __datebox__ : Android Style Datepicker
  * __calbox__ : Calendar Datepicker
  * __timebox__ : Android Style Time Picker
* _(all)_ __useDialogForceTrue__ : Boolean *Always* use Dialog Window, regardless of screen size. _(false)_
* _(all)_ __useDialogForceFalse__ : Boolean *Never* use Dialog Window, regardless of screen size. _(false)_
* _(all)_ __useModal__ : Use modal styling (background fades out) on popup. _(false)_
* _(all)_ __noButtonFocusMode__ : Suppress button, open on element focus instead. _(false)_
* _(all)_ __useInline__ : Show datebox inline on page, no dialog or popup. _(false)_
* _(all)_ __useInlineHideInput__ : When using inline mode, do not show the input box. _(false)_
* _(all)_ __titleDialogLabel__: Dialog label override. _(false)_
* _(android)_ __setDateButtonLabel__ : The label displayed in the set date button. _(Set Date)_
* _(calendar)_ __calShowDays__ : Boolean show day names in grid. _(true)_
* _(calendar)_ __calShowOnlyMonth__ : show *only* this month, do not fill in empty boxes. _(false)_
* _(both date)_ __titleDateDialogLabel__: Dialog label for date mode. _(Set Date)_
* _(time)_ __setTimeButtonLabel__ : The label displayed in the set time button. _(Set Time)_
* _(time)_ __titleTimeDialogLabel__: Dialog label for time mode. _(Set Time)_

To disable the element, use the standard disabled='disabled' in your markup.
