jQuery-Mobile-DateBox
=====================

DateBox is a small, android-esk date picker, using as many of the native 
jQueryMobile controls as possible.

This is based in part on the work of Todd M. Horst, and his [Android Like Date Picker 2](http://toddmhorst.wordpress.com/2010/12/30/android-like-date-picker-with-jquery-mobile-2/)


DateBox Features
----------------

* Auto-parses text entered into form element on open [any valid date string in your browsers locale, uses javascript:Date()]
* Input items on DateBox are directly editable, allowing for quick date change.
* Auto-corrects out of bounds (calendar invalid) dates into the closest real date *(e.g. Feb 31st becomes March 2nd or 3rd depending on the year)*
* Attempts to position itself centered over the input, however, the top will never be less than 45px from the top boundry of the document, nor will the popup unessasarily extend the document.
* Click outside to close, configurable with option 'clickOutsideClose'
* Press ESC to close, configurable with option 'closeEscape' 
* .datebox('enable') and .datebox('disable') now fully functional.
* Auto-bind's to data-type='datebox' input elements
* Set data-options to override default widget options
* Outputs ISO 8601 Dates (YYYY-MM-DD)
* Localization possible with daysOfWeek and monthsOfYear options


Suggested Use
-------------

	// BEFORE loading jQM
	$( document ).bind( "mobileinit", function(){
		$.mobile.page.prototype.options.degradeInputs.date = 'text';
	});

### No Option Overrides:
		
	<input type="date" data-role="datebox" name="some_date" />
		
### With Option Overrides:
	
	<input type="date" data-role="datebox" name="some_date" data-options='{"buttonTheme": "b", "daysOfWeek" : ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"]}' />
