## Description
DateBox is a jQuery plugin that aims to make user interaction with dates and times simple and intuitive. It is a colloborative work, with a full range of features allowing easy implementation, and painless extensibility.

## Conventions
These demos use a good bit of pseduo-code - remember to look at the page source to get the whole story. Also, a few options are locked on for all of these demos, mainly the control displays “inline” - that is, as part of the page rather than a popup (the default behavior).  Note also these demos use the Bootstrap v4 version of DateBox, and the markup conventions of Bootstrap.

## Sample
This sample is the most simple version of the "calbox" varient. Note that DateBox automatically enhances properlly tagged elements.  If you need a simple date input with no limits, logic, or customization, it is as simple as adding an input element. __Note the use of the data-role attribute__, which is what allows DateBox to automaticaly enhance.  At least the mode option is required if your build includes more than one mode.

<div class="form-group">
	<label class="control-label"for="db1">CalBox style DateBox</label>
	<input class="form-control" name="db1" type="text" data-role="datebox" data-datebox-mode="calbox" id="db1">
</div>

<div class="form-group">
	<label class="control-label"for="db2">DateBox style DateBox</label>
	<input class="form-control" name="db2" type="text" data-role="datebox" data-datebox-mode="datebox" id="db2">
</div>

<div class="form-group">
	<label class="control-label"for="db3">FlipBox style DateBox</label>
	<input class="form-control" name="db3" type="text" data-role="datebox" data-datebox-mode="flipbox" id="db3">
</div>

<div class="form-group">
	<label class="control-label"for="db4">SlideBox style DateBox</label>
	<input class="form-control" name="db4" type="text" data-role="datebox" data-datebox-mode="slidebox" id="db4">
</div>

##### Code

```html
<div class="form-group">
	<label class="control-label"for="db1">CalBox style DateBox</label>
	<input class="form-control" name="db1" type="text" data-role="datebox" data-datebox-mode="calbox" id="db1">
</div>
```

##### Placement Override

Should you wish to direct the placement of the rendered DateBox control for inline or blind display methods, Drop a named div anywhere on the page with the id of __[DateBox ID]-dbAttach__.  Note that this may very well break positioning on the dropdown mode, but is very useful for inline and blind modes.

```html
<div id="db1-dbAttach"></div>
```

## Features

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

## Requirements

DateBox requires [jQuery](https://jquery.com), version 2 or 3, and will run fine with the "slim" builds of version 3.

DateBox requires a modern browser. IE8 is unsupported as of v5, but with a polyfill library loaded, will probably run.

DateBox requires the [jQueryUI](https://jqueryui.com/) widget library. Built versions of DateBox include it in their source files, unless the framework in use typically has it already. (Example: jQM uses an altered, but API compatible version).

## Frameworks

DateBox is currently has builds for the following:

{{cnf:supports}}

## Download or Link

Downloading your own build of DateBox is the prefeerred method of installing DateBox. To build your own download, head to the [DateBox Download Builder](https://datebox.jtsage.dev/builder/). Prebuilt versions are also available through [npm](https://www.npmjs.com/search?q=jtsage-datebox) and [Github](https://github.com/jtsage/datebox-builds).

### CDN

If you prefer to have the files elsewhere, complete (all modes) builds are available on the jsdelivr CDN.

##### Bootstrap v3

```html
<script src="https://cdn.jsdelivr.net/npm/jtsage-datebox-bootstrap3@{{cnf:version}}/jtsage-datebox.min.js" type="text/javascript"></script>
```

##### Bootstrap v4

```html
<script src="https://cdn.jsdelivr.net/npm/jtsage-datebox-bootstrap4@{{cnf:version}}/jtsage-datebox.min.js" type="text/javascript"></script>
```

##### Bulma

```html
<script src="https://cdn.jsdelivr.net/npm/jtsage-datebox-bulmas@{{cnf:version}}/jtsage-datebox.min.js" type="text/javascript"></script>
```

##### Foundation v6

```html
<script src="https://cdn.jsdelivr.net/npm/jtsage-datebox-foundation6@{{cnf:version}}/jtsage-datebox.min.js" type="text/javascript"></script>
```

##### Fomantic UI v6

```html
<script src="https://cdn.jsdelivr.net/npm/jtsage-datebox-fomanticui@{{cnf:version}}/jtsage-datebox.min.js" type="text/javascript"></script>
```

##### jQueryMobile

```html
<script src="https://cdn.jsdelivr.net/npm/jtsage-datebox-jqm@{{cnf:version}}/jtsage-datebox.min.js" type="text/javascript"></script>
```

##### UIKit

```html
<script src="https://cdn.jsdelivr.net/npm/jtsage-datebox-uikit@{{cnf:version}}/jtsage-datebox.min.js" type="text/javascript"></script>
```

### Language / Localization

You should (but are not required) to include at least one language file. The defaults in DateBox are sort of an international english, with a bent of following ISO-8601. To find the most appropriate language, browse the list on the [i18n CDN](https://cdn.jsdelivr.net/npm/jtsage-datebox-i18n/). It is also possible to serve the ".lang" file and leverage the ___useLang___ option (discussed later).

##### US English
```html
<script src="https://cdn.jsdelivr.net/npm/jtsage-datebox-i18n/jquery.mobile.datebox.i18n.en_US.utf8.js" type="text/javascript" ></script>
```

## Upgrading

Upgrading from version 4?  Most things will work as-is.  Check out the UPGRADEING.md document in the repository for details.
