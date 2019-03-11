JTSage-DateBox
=================

DateBox is a jQuery date and time picker. [Full Documentation and Demos](http://dev.jtsage.com/DateBox/), that works with a multitude of CSS frameworks.


DateBox Features
----------------

DateBox is extreamlly full featured.  Included are:

 * Control to pick date, time, duration, or nearly any combination of the above.
 * Limiting on nearly any criteria on the date, time, or duration.
 * Callbacks and Triggers on create, open, close, change, destroy and several other-progress moments of execution
 * Display as a popover, modal, slide down, or inline control with the form.  Including hiding the actually input element if desired.
 * Ability to output to multiple input elements to send differing formats or parts of the date to the server easily.
 * 4 different visualation modes
    * A calendar
    * Input boxes for each date part with +/- buttons
    * Slidable columns where the date reads right-to-left or left-to-right
    * Slidable rows where the date reads top-to-bottom
 * Full localization with translations in 40+ languages and locales
 * CSS Framework agnostic.  If there is not a pre-configured version for your preferred choice, adding it is simple.
 * No CSS includes, all styling done by CSS framework or very sparing style hooks.

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

Available Options
-----------------

Please see the full api documentation at: [dev.jtsage.com](http://dev.jtsage.com/DateBox/)

Developers
----------

To build locally:

The full release : `grunt release`

Update dist/latest only : `grunt latest`

Run the test suite : `grunt fulltest`

Build the documentation : `grunt web`


