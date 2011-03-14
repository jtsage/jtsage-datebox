jQuery-Mobile-DateBox
=====================

DateBox is a small, android-esk date picker, using as many of the native 
jQueryMobile controls as possible.

This is based in part on the work of Todd M. Horst, and his [Android Like Date Picker 2](http://toddmhorst.wordpress.com/2010/12/30/android-like-date-picker-with-jquery-mobile-2/)


DateBox Features
----------------

* Two display modes, Android style datepicker and a Calendar style.

* Auto-parses text entered into form element on open.
	*(any valid date string in your browsers locale, uses javascript:Date())*

* Attempts to position itself centered over the input, however, for small screens, it will open a dialog window instead.

* Click outside the widget to close.

* Auto-bind's to data-type='datebox', options are configurable via data-options.

* Configurable date format output.

* Configurable Month and Day names for localization.
	
* Android Mode: Input items on DateBox are directly editable, allowing for quick date change.

* Android Mode: Auto-corrects out of bounds (calendar invalid) dates into the closest real date *(e.g. Feb 31st becomes March 2nd or 3rd depending on the year)*

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

Available Options
-----------------

_These can be passed to datebox via an object set at the data-options attribute, or in the standard method_

### Themeing:
* __theme__ : Theme for original input element
* __pickPageTheme__ : Theme for popup window or dialog
* __pickPageInputTheme__ : Android Mode - Month/Date/Year Input Elements
* __pickPageButtonTheme__ : Both Modes - Widget buttons
* __pickPageHighButtonTheme__ : Calendar Mode - "Today" and "Selected" Day highlighting
* __zindex__ : Z-Index for popup window (default: 500)

### Internationalization:
* __setDateButtonLabel__ : Android Mode - The label displayed in the set date button, default is "Set date"
* __daysOfWeek__ : Android Mode - An array of the days of the week, Sunday -> Saturday
* __daysOfWeekShort__ : Calendar Mode - An Array of abreviations for days of the week, Sunday -> Saturday
* __monthsOfYear__ : Both Modes - An Array of months of the year, January -> December
* __fieldsOrder__ : Android Mode - Define the order of the fields, default is m-d-y
* __headerFormat__ : Both Modes - Return header format - (YYYY = Year, MM = Zero Padded Month, mm = Month, mmm = Month of year, DD = Zero Padded Day, dd = Day, ddd = day of week)
* __dateFormat__ : Both Modes - Return date format - (YYYY = Year, MM = Zero Padded Month, mm = Month, DD = Zero Padded Day, dd = Day)

### Customization:
* __mode__ : Mode of operation - either 'datebox' (android) or 'calbox' (calendar)
* __calShowDays__ : Calendar mode - Boolean show day names in grid
* __calShowOnlyMonth__ : Calendar mode - show *only* this month, do not fill in empty boxes (default: false)
* __useDialogForceTrue__ : Boolean *Always* use Dialog Window, regardless of screen size
* __useDialogForceFalse__ : Boolean *Never* use Dialog Window, regardless of screen size
* __useModal__ : Use modal styling (background fades out) on popup (default: false)
* __noButtonFocusMode__ : Suppress button, open on element focus instead

_To disable the element, use the standard disabled='disabled' in your markup._
