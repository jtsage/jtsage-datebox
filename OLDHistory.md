2014-06: This file is long dead.  Available via git log of github

jQM-1.0.0 / 2011-12-01 
======================

  * Small Fixes: #124, #122, #121, #123
  * Merge pull request #118 from Skinney/master
  * Merge pull request #117 from frietsch/master
  * Add versioning to build process - speed up bugfix release process
  * Add option "forceInheritTheme" as a halfway meetign with #110
  * Missed a few use cases on the magic updating set button.  Referenced in #110
  * Fix data-theme inheritance for input element (something was wrong - it grabs the first parent it sees now, or uses "c" as default, same as jQM core
  * Add hidden combo of useInlineHideInput and centerWindow - seems to work as expected
  * Add i8n: it-IT italian
  * Add i8n: Norwegian Bokmaal translation.
  * No idea what the origin of that CSS line was, but with it, the dialog title bar is wider than the dialog body.
  
jQM-1.0rc3 / 2011-11-14
=======================

  * Merge pull request #116 from zmszaman/master
  * Merge pull request #115 from jrunge/master
  * Merge pull request #114 from agcolom/patch-1
  * Merge pull request #113 from jrunge/master
  * Merge pull request #111 from rodrigoalvesvieira/pt-BR
  * Merge pull request #108 from rodrigoalvesvieira/master
  * Fix calStartDay
  * Add Option highDatesAlt - a second highDates options (different theme)
  * passing date and datebox object to closeCallback()
  * changed _update() to hardreset() in _setOptions to properly update option changes
  * Massive overhaul of options matrix documentation - much more readable, and even mostly correct now
  * added jquery widget _setOption  function for changing datebox options after pagecreate
  * Update auto-attach method to make sure not to double-create if retriggered
  * Add a little css tweak for IE8 (maybe others) - Fixes #100
  * Add option "timeFormatOverride" to allow 12/24hr clock setting from data-options if needed
  * Add recuring events demo to site
  * Add create hook so that .trigger(create) will catch data-role="datebox" elements
  * Missed fieldsOrder on language change - add option "fieldsOrderOverride" to mimic old behavoir of this option
  * Update a few more things, make dateFormat part of i8n by default, unless set otherwise.  Closes #107, Closes #104
  * Add _getRecDays() function.  Probably going to expand this at some point, and maybe add it to the docs.
  * Forgot beforeToday option, fixes #106
  * Add i8n: Portuguese (Brazil).
  * Add i8n: Modern Greek (el) - Thanks to Giannis Kosmas
  
jQM-1.0rc2 / 2011-11-04 
=======================

  * BREAKING CHANGE! - Move i8n stuff to a saner place, allow multiple languages to be loaded at once.  BREAKING CHANGE!!
  * Add i8n: Japanese, work by moon dial of B$ - thanks
  * Add i8n: Swedish, Fix spelling errors in en/en-US.  Thanks to Henrik Ekselius for both
  * Add i8n: German, unknown author + google translate (needs work)
  * Add i8n: French
  * Add a few translations, and a CLI translation tool (just run it)
  * Move some stuff - intoduce the "hardreset" function (very cool)
  * Update build process to include copyright/license slug
  * Update license to CC 3.0 Attribution.
  * Merge pull request #98 from Skinney/master
  * default transition is now an option which can be set, instead of being hardcoded 'pop'
  * Add useInlineBlind option - Closes #65
  * Add afterToday and beforeToday on "extra" dates on calendars, Fixes #71
  
jQM-1.0rc1 / 2011-10-14 
=======================

  * Merge pull request #97 from dtao/patch-3
  * Merge pull request #82 from gga/master
  * Merge pull request #90 from evgenyneu/master
  * Merge pull request #83 from eromba/master
  * Merge pull request #89 from bjohn465/add-debug-flag
  * Merge pull request #79 from dtao/patch-2
  * Merge pull request #77 from gstroup/master
  * Merge pull request #66 from ShirtlessKirk/patch-1
  * Merge pull request #67 from dtao/patch-1
  * Merge pull request #75 from kpwebb/patch-1
  * Merge pull request #61 from forrest/master
  * Merge pull request #63 from aliok/add-default-value-option
  * Merge pull request #53 from aliok/disable-manual-input
  * Merge pull request #49 from aliok/master
  * Merge pull request #48 from evgenyneu/master
  * Add hook for orientation change, Closes #95
  * Fix for datebox in listview display.  Fixes #92
  * Add a few standard create hooks from jqm. Addresses #94
  * Add an enableDates option for calendar mode.  Closes #93
  * added check for close button to fix issue #84
  * Add beforeToday check on flipbox, fixes #85
  * Fix title issue on flipbox demo - fixes #80
  * Using media query instead of helper class min-width-480px
  * Added an optional open callback.
  * fixed issue #78: parent page removed from DOM when datebox widget is closed
  * fix to honor noAnimation option when opening calendar.
  * Add dateformat options "mmmm" and "dddd" - Closes #76
  * Work on #61 - Bring duration mode under new RegExp, elimate options: durationNoDays, durationNoSeconds, and durationShort. Add options: durationFormat. - THIS IS A BREAKING CHANGE!
  * Add rolloverMode option, to prevent the pickers from "rolling" the date/month/hour/minute/second. Closes  #57
  * Add some DOM cacheing control - so the parent page does not go away on us - fixes #58 and #59
  * Add modes: "flipbox" and "timeflipbox"
  * Rework slide mode - real draggable input now.  very, very spiffy
  * Make the new RegExp for reading date the default method - NOTE: this *may* be a breaking change for some!
