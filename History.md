
jQM-1.0.0 / 2011-12-01 
======================

  * Just a little demo cleanup
  * Whoops, fix closeCallback - closes #123
  * Fix typo - closes #124
  * Fix type - closes #122
  * Add i8n: it-IT italian
  * Hopefully a fix for #121
  * Add versioning to build process - speed up bugfix release process
  * Add option "forceInheritTheme" as a halfway meetign with #110
  * Missed a few use cases on the magic updating set button.  Referenced in #110
  * Update index to 1.0 too.  oops
  * Update for jQM-1.0
  * Oops, it be markdown, not txt
  * Update README
  * Fix data-theme inheritance for input element (something was wrong - it grabs the first parent it sees now, or uses "c" as default, same as jQM core
  * Add hidden combo of useInlineHideInput and centerWindow - seems to work as expected
  * Update lang switch demo
  * Merge pull request #118 from Skinney/master
  * Merge pull request #117 from frietsch/master
  * Made some tweaks, added credits and changed norwegian letters into html representation for better portability.
  * Added Norwegian Bokmaal translation.
  * No idea what the origin of that CSS line was, but with it, the dialog title bar is wider than the dialog body.
  * Removed extra commas, which don't allow compiling the script in closure compiler (in fact a good thing; IE fails on extra commas). Minor typo.

jQM-1.0rc3 / 2011-11-14
=======================

  * Fix a theme problem with demos
  * Update to RC3
  * Merge pull request #116 from zmszaman/master
  * Fix calStartDay
  * Small typo with highDatesAlt
  * Add Option highDatesAlt - a second highDates options (different theme)
  * Merge pull request #115 from jrunge/master
  * Do not use "in", use "inArray()"
  * Slightly modify _setOption function - refernces #113
  * Merge pull request #114 from agcolom/patch-1
  * Merge pull request #113 from jrunge/master
  * Update README.md
  * passing date and datebox object to closeCallback()
  * changed _update() to hardreset() in _setOptions to properly update option changes
  * Massive overhaul of options matrix documentation - much more readable, and even mostly correct now
  * added jquery widget _setOption  function for changing datebox options after pagecreate
  * Update auto-attach method to make sure not to double-create if retriggered
  * Add a little css tweak for IE8 (maybe others) - Fixes #100
  * Add option "timeFormatOverride" to allow 12/24hr clock setting from data-options if needed
  * fix defaults for slideFieldsOrder (was not defined)
  * Add recuring events demo to site
  * Add create hook so that .trigger(create) will catch data-role="datebox" elements
  * Missed fieldsOrder on language change - add option "fieldsOrderOverride" to mimic old behavoir of this option
  * Merge pull request #111 from rodrigoalvesvieira/pt-BR
  * Tweaking time format to 24.
  * revert to jquery 1.6.4 - 1.7 fails on IE8 with jQM
  * Fix a css regression - got a little to ambitious on the internal input element
  * Update a few more things, make dateFormat part of i8n by default, unless set otherwise.  Closes #107, Closes #104
  * UTF8 -> html entities (don't rely on browser compatability).  Reorder language loads to default back to en-US (sorry, easier for me to read)
  * Merge pull request #108 from rodrigoalvesvieira/master
  * Adding tests.
  * Adding internationalization file for Portuguese (Brazil).
  * Add i8n: Modern Greek (el) - Thanks to Giannis Kosmas
  * Add _getRecDays() function.  Probably going to expand this at some point, and maybe add it to the docs.
  * Forgot beforeToday option, fixes #106
  * Update css to be inline with jQM sources again (trim down height - should mirror text input now
  * Bring demos up to jquery 1.7, fix char encoding in LICENSE, clean up main README
  * Reorder open method, add open call to fix inline mode.  Typo to fix dialog title
  * Fix durationFormat issue (was missing), add a few standalone demos
  * Stop using php, add a readme
  
jQM-1.0rc2 / 2011-11-04 
=======================

  * Move some stuff - intoduce the "hardreset" function (very cool)
  * Move a few checks outside of per-mode to save about 1K.
  * Add i8n: Japanese, work by moon dial of B$ - thanks
  * Add i8n: Swedish, Fix spelling errors in en/en-US.  Thanks to Henrik Ekselius for both
  * Fix for calendar not opening - dumb logic bug.  Fixes #105
  * Simplify language demo a bit
  * BREAKING CHANGE! - Move i8n stuff to a saner place, allow multiple languages to be loaded at once.  BREAKING CHANGE!!
  * Cleanup tests folder
  * Add i8n: German, unknown author + google translate (needs work)
  * Add i8n: French
  * Fix stupid typo in install docs
  * Update demos to RC2 / jQ 1.6.4
  * Add RTL option, although not used yet
  * Update i8n file name scheme
  * Add a few translations, and a CLI translation tool (just run it)
  * Remove change event from open - closes #104
  * Begin true i8n support - work in progress, please help.
  * Update build process to include copyright/license slug
  * Update license to CC 3.0 Attribution.
  * Merge pull request #98 from Skinney/master
  * changed "pop" to 'pop' to match convention
  * default transition is now an option which can be set, instead of being hardcoded 'pop'
  * Add useInlineBlind option - Closes #65
  * Update install docs to JQM RC1
  * Add afterToday and beforeToday on "extra" dates on calendars, Fixes #71
  
jQM-1.0rc1 / 2011-10-14 
=======================

  * Add hook for orientation change, Closes #95
  * Fix for datebox in listview display.  Fixes #92
  * Add a few standard create hooks from jqm. Addresses #94
  * Small fix for double letter conflicts in formatter.  Still working on this.
  * Add an enableDates option for calendar mode.  Closes #93
  * Merge pull request #97 from dtao/patch-3
  * added check for close button to fix issue #84
  * Fix dynamic start date demo
  * Document openCallback - documents #82
  * Update demos to jQM-RC1
  * Fix a brain fart typo - fixes #50
  * Add beforeToday check on flipbox, fixes #85
  * Fix title issue on flipbox demo - fixes #80
  * Merge pull request #82 from gga/master
  * Merge pull request #90 from evgenyneu/master
  * Merge pull request #83 from eromba/master
  * Merge pull request #89 from bjohn465/add-debug-flag
  * Using media query instead of helper class min-width-480px
  * Placing console.log behind debug flag
  * Fixed setting timeflipbox minutes via drag & drop
  * Added an optional open callback.
  * Merge pull request #79 from dtao/patch-2
  * fixed issue #78: parent page removed from DOM when datebox widget is closed
  * Merge pull request #77 from gstroup/master
  * fix to honor noAnimation option when opening calendar.
  * Add dateformat options "mmmm" and "dddd" - Closes #76
  * From previous, fix documentation - missed a line
  * Work on #61 - Bring duration mode under new RegExp, elimate options: durationNoDays, durationNoSeconds, and durationShort. Add options: durationFormat. - THIS IS A BREAKING CHANGE!
  * Fixes #74 - store parsed date value to a temporary array, and set in one go to avoid odd rollovers near the end of the month
  * Add rolloverMode option, to prevent the pickers from "rolling" the date/month/hour/minute/second. Closes  #57
  * Add minuteStep to timeflipbox mode - closes #70
  * Fix for #73, slidebox and flipbox boundry checking on date for 31 vs 30 days
  * Merge pull request #66 from ShirtlessKirk/patch-1
  * Merge pull request #67 from dtao/patch-1
  * Merge pull request #75 from kpwebb/patch-1
  * fixed 12-hour format--was using GG for 24 hour representation
  * removed 'options.open' state-holding member in favor of checking directly whether the calendar page is visible
  * 794: Corrected o.pickPageButtoTheme to o.pickPageButtonTheme
  * Add some DOM cacheing control - so the parent page does not go away on us - fixes #58 and #59
  * Fix timeFormat issues - fixes #62
  * Merge pull request #61 from forrest/master
  * Merge pull request #63 from aliok/add-default-value-option
  * removing debug alert
  * adding durationNoSeconds
  * Fix demo type (issue #55) and update to jQM beta2
  * Flip "disableManualInput" to use the readonly attribute instead, re-indent / re-space to match the rest of the code
  * Merge pull request #53 from aliok/disable-manual-input
  * Merge branch 'master' of github.com:jtsage/jquery-mobile-datebox
  * Add option "nestedBox" so datebox can live inside of a simpleDialog
  * Merge pull request #49 from aliok/master
  * Typo correction
  * Renamed defaultDate option with defaultPickerValue option.
  * Added support for defaultTime just like defaultDate
  * Added 'disableManualInput' option. Added an example in the calendar examples.
  * Added a simple example for durationOrder
  * Update demos to not use experimentalReg setting (redundant) or degradeInputs (soon to be depreciated)
  * Code Comments, 2 of 2
  * Degrade date inputs in the plugin, jQM no longer does this for us
  * Code commenting - part 1 of 2
  * conform to jQM standard method of plugin initilization
  * Add option to use defaultDate as integer seconds for default durationbox (doc)
  * Add option to use defaultDate as integer seconds for default durationbox
  * Update build system for flipbox mode
  * Add "jump to today" button option to calendar mode.  Fixes #47
  * Merge pull request #48 from evgenyneu/master
  * Differentiate time and date "set" button labels.  Fixes #46
  * Typo on field type
  * Making am/pm optional for timebox
  * Fix demo typos
  * Update demos with "flipbox" and "timeflipbox", a few extra test cases, add a screenshot of flipbox
  * Previous month incorrectly calculated on calStartDay > 0, fixes #42
  * mousewheel did not trigger event on calendar, fixes #43
  * flip varients: mousewheel now works in magnifier
  * Add documentation for slide mode with time, cleanup formatting docus.
  * Oops, seconds didn't parse'
  * Remove console.log() - my bad.
  * Bugfix for 24 hour format
  * Fix drag in magnifier not working - flip varients
  * Beginning bits of "flipbox" and "timeflipbox"
  * Add hour and minute options to slide mode, some extra css for the next big feature.  Demos next
  * Fold timebox regex into experimentalRegex, send timebox output through _formatter, remove experimentalReg option (always on now)
  * Consolidate datebox/timebox creation function - drop about 1.4k of duplicate code
  * Add drag movement to duration/android/time mode as well - drag the input box up/down for extra special super fun tim
  * Oops, missed some comments
  * Rework slide mode - real draggable input now.  very, very spiffy
  * Make the new RegExp for reading date the default method - NOTE: this *may* be a breaking change for some!
  * Add "stable" version links to install/download info
