JTSage-DateBox
=================

DateBox is a jQuery date and time picker. [Full Documentation and Demos](http://dev.jtsage.com/DateBox/), that works
with jQueryMobile, Bootstrap, and/or jQueryUI.


DateBox Features
----------------

 - Framework Agnostic, works with jQM, jQueryUI & Twitter Bootstrap
 - Multiple display and entry modes for dates, times, and durations
   - Android style
   - Full Calendar display (date only)
   - Flip (IOS) style
   - Slide style (date and time only)
 - Multiple window modes (dependant on framework)
   - Popup or Dropdown
   - Inline
   - Inline window-blind
 - Fully localized - 40+ languages pre-configured
 - Fully custiomizable output formats
 - Supports multiple methods of limiting valid date entry
 - Supports entry, exit, creation, selection, change, and more programming hooks

Special Thanks
--------------

An extra special thanks to [Phill Pafford](http://stackoverflow.com/users/93966/phill-pafford) for answering tons of questions about DateBox, and jQueryMobile in general on StackOverflow.

And last but not least, thanks to all the [contributors](https://github.com/jtsage/jquery-mobile-datebox/contributors) to the project on github.

Downloading
-----------

All scripts are available on the cdn:

DateBox uses the following version scheme:

[http://cdn.jtsage.com/jtsage-datebox/&lt;VERSION&gt;/](http//cdn.jtsage.com/jtsage-datebox/)

#### Latest Versions:

[cdn repo](http://cdn.jtsage.com/jtsage-datebox/latest/)

#### Custom Download Builder:

[script](http://dev.jtsage.com/DateBox/builder/)
[css](http://dev.jtsage.com/DateBox/theme/)

Suggested Use
-------------

#### With Option Overrides:
	
	<input type="date" data-role="datebox" name="somedate"
		data-options='{"mode": "datebox", "overrideDateFormat": "%m/%d/%Y"}' />
		
#### Global Option Overrides:
	
	// AFTER loading jQM
	jQuery.extend(jQuery.jtsage.datebox.prototype.options, {
		'overrideDateFormat': '%d.%m.%Y',
	});

Upgradeing
----------
JTSage-DateBox is fully compatible with the old jQM-DateBox, just replace the jQM-DateBox sources with
the new source file.  

If you have written any of your own code referencing jQM-DateBox, note that the namespace of the plugin has changed to "jtsage".

	// Old Way - Data Attribute
	$( "#someInput" ).data('mobile-datebox');

	// New Way - Data Attribute
	$( "#someInput" ).date('jtsage-datebox');


	// Old Way - Prototype Overrides
	jQuery.extend(jQuery.mobile.datebox.prototype.options, {} );

	// New Way - Prototype Overrides
	jQuery.extend(jQuery.jtsage.datebox.prototype.options, {} );

Available Options
-----------------

Please see the full api documentation at: [dev.jtsage.com](http://dev.jtsage.com/DateBox/api/)

Runtime Operation (Scripting / Extending)
-----------------------------------------

Please see the full api documentation at: [dev.jtsage.com](http://dev.jtsage.com/DateBox/api/)

