# Migrating

Migration from jtsage-datebox is pretty simple.  It is nearly API compatible, but some option names
have changed.

Throughout this document, **bolded** options are new, _italic_ options are old.

## What will break

Nothing actually, although display modes have changed names, so if you weren't using the default, it will not look right.  Same goes for the theme system, as most of those options changed names

# Prerequisites

DateBox now ships with it's pre-requisites compiled in, namely a very stripped down version
of jQueryUI widget

DateBox is compatible with jQuery 2 and 3. (3 is not compatible with jQueryMobile)

## Icons

DateBox no longer requires an icon library. With the exception of jQM, SVG icons are included in
the distribution. (From a variety of sources, mostly hand crafted, but octoicons served as an
inspiration for some).

Note that if you were using custom icons, those theme options will break (although, in most cases they
have been re-named anyway.)

# Callback / Listeners / Trigger changes

## displayChange

The conditions of when this fire have changes, as has the payload of the event.

This only fires for calbox mode, and means an view change has occured (the offset listener
_may_ still fire), but the user selected date has not changed. The view __has__ changed

In the payload is -

```js
{
  // Method happening, in this case "displayChange"
  method             : "displayChange",
  
  // The date that the user has selected, or the default, or today
  selectedDate       : [JavaScript Date Object],
  
  // The date that is shown (place where the calculations begin)
  
  shownDate          : [JavaScript Date Object],
  
  // Which part of the date to change: y,m,d,h,i,s,a OR 'p' (a picker was used)
  thisChange         : [char : y|m|d|i|s|a|p], 
  
  // How much to change OR null (for pickers)
  thisChangeAmount   : [integer]
  
  // What is the date (object) where the grid starts? (ignores calOnlyMonth)
  gridStart          : [JavaScript Date Object],
  
  // What is the date (object) where the grid ends? (ignore calOnlyMonth)
  gridEnd            : [JavaScript Date Object],
  
  // Is the selected date in the grid / view (might be part of previous/next month)
  selectedInGrid     : [boolean],
  
  // Is the selected date in bound - so, must be in view, cannot be part of the previous or
  // next month.  selectedInBounds cannot be true without selectedInGrid being true, hoever, 
  // selectedInGrid may be true and selectedInBounds false.
  
  // If you are using calOnlyMonth, isSelectedInBounds is a better test for visibility.
  selectedInBounds   : [boolean]
}
```
## runOnBlurCallback

Operation of this changed significantly.

First off, __safeEdit__ will do the job for most installs, unless you want to handle errors yourself,
or bolt another parsing library onto datebox.  ___safeEdit___, on by default, will drop the input back
to the last known good date on edit error.

This option can only be supplied as a function (or a string reference to a global).  It will recieve an object containing:

  * oldDate - the Date that existed prior to the control closing.  The __internal__ date
  * origDate - last confirmed, good, user set date. Does not reflect changes in the control prior to a set button being clicked.
  * newDate - should the input be re-read, this is the date the control thinks it is.
  * isGood - the input was be succesfully processed
  * isBad - the input was NOT be succesfully processed
  * input - Value of the input

The function return either:

  * A new date OBJECT to set the control today.

__OR__

  * false ( in fact, anything other than an object), meaning that the date is fine - and DateBox should use the value of newDate instead.

Sample:

```js
function( obj ) {
  if ( obj.isGood ) {
    // Good date parsed, do nothing.
    return false;
  }

  var newd = chrono.parseDate(obj.input);

  if ( newd === null ) {
    return new Date();
  } else {
    return newd;
  }
}
```


# Option changes

## min/max Attribute

These are now mapped to minDate and maxDate, ___NOT___ minDays and maxDays.  This may break some code!!

## New Options

 * **calHighOutOfBounds** - apply a different class to dates that fall outside the displayed
 month (calbox)

 * **disabledState** - class to add to disabled UI elements. Only used a few places in the
 base code. Not used at all in the framework code.

 * **slideHighToday** - highlight today in slide mode

 * **slideHighPick** - highlight chosen date in slide mode

 * **breakPointWidth** - when to show the control full width instead.

 * **controlWidth** - width of the control when it's not full width. 290px from v4

 * **flipboxAdjustLens** - some themes need a hardcoded lens adjustment up or down.  in px.

 * **slideUsePickers** - same as calUsePickers, for slidebox

 * **slideYearPickMin/Max** - same as for calbox

 * **slideNoHeader** - same as calNoHeader, for slidebox

 * **slideDateList** / **slideShowDateList** - same as for calbox


## Changed Options

 * **displayInlinePosition** - was _useInlineAlign_

 * **displayDropdownPosition** - was a few things, none named well.

 * **displayMode** - was _useInline_, _useInlineBlind_, _useModal_, etc...

 * **linkedField** - now accepts an object of arrays for multiple outputs.  Old way still works as
 expected
 

## Removed Options

 * _calControlGroup_ - no longer applicable.  calbox is a table, like it always should have been.

 * _theme_ - broken into new areas

# Theme system

This went through a major re-write, most of the names have changed.  Note that this will not break
your current install, it just won't look right.

For a full list of these, go here: https://datebox.jtsage.dev/themes/

# SlideBox

SlideBox shares a name with the old slidebox mode, but it otherwise a completely new mode.  It is a
replacement for the old one, and it is not expected that the old version will be brough into
version 5.  The old way was cumbersome and prone to display errors - for all of HTML's strengths,
fixed width items in a reponsive way is not one of them.