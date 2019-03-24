# Migrating

Migration from jtsage-datebox is pretty simple.  It is nearly API compatible, but some option names
have changed.

Throughout this document, **bolded** options are new, _italic_ options are old.

## What will break

Nothing actually, although display modes have changed names, so if you weren't using the default, it will not look right.  Same goes for the theme system, as most of those options changed names

# Prerequisites

DateBox now ships with it's pre-requisites compiled in, namely a very stripped down version
of jQueryUI widget, and popper.js if they are not expected to already be present (for
instance, bootstrap v4 requires popper.js, so DateBox does not include a second copy)

Note that this means DateBox now always uses popper.js to position, dropping a whole lot of
nearly duplicate code that used to exist.

DateBox is compatible with jQuery 2 and 3. (3 is not compatible with jQueryMobile)

DateBox no longer requires an icon library. With the exception of jQM, SVG icons are included in
the distribution. (From a variety of sources, mostly hand crafted, but octoicons served as an
inspiration for some)

# Option changes

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