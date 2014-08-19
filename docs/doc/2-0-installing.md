---
title: Installing
pagenum: 2
layout: doc
---

# Requirements

jQM-Datebox requires a recent version of jQuery (last tested with both 1.9+ and 2.
+), and a close version of jQueryMobile.  There is a version string in jqm-datebox
core.js, on or around line #12 that gives which version of jQueryMobile it was built
and tested upon.  Typically, it will work with at least the last major version of
jQueryMobile as well.

{% highlight js %}
// All widget options, including some internal runtime details
version: '2-1.4.2-2014072200', // DateBoxVersion-jQMVersion-YrMoDaySerial
{% endhighlight %}


# Script Includes

You will need to include the main CSS file, the CORE DateBox file, and **each**
of the MODE files you wish to use.  Alternatively, you can include only the monolithic file 
that includes *all* modes, however, this may introduce unessesary code bloat.  Also check out
the [Download Builder](../../builder/).

## CSS Includes

{% highlight html %}
<link rel="stylesheet" type="text/css" href="http://cdn.jtsage.com/datebox/latest/jqm-datebox.min.css">
{% endhighlight %}

## CORE Script

Optionally, you can enable mousewheel support for desktop operation of DateBox by
including Brandon Aaron's mousewheel plugin prior to loading DateBox. It is available
at: [mousewheel](https://github.com/brandonaaron/jquery-mousewheel)

{% highlight html %}
<script type="text/javascript" src="http://cdn.jtsage.com/datebox/latest/jqm-datebox.core.min.js"></script>
{% endhighlight %}

## MODE Options
You need to include one or more of the following modes for DateBox to function

### CalBox
{% highlight html %}
<script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.mode.calbox.min.js"></script>
{% endhighlight %}

### DateBox / TimeBox / DurationBox
{% highlight html %}
<script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.mode.datebox.min.js"></script>
{% endhighlight %}

### FlipBox / TimeFlipBox / DurationFlipBox
{% highlight html %}
<script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.mode.flipbox.min.js"></script>
{% endhighlight %}

### SlideBox
{% highlight html %}
<script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.mode.slidebox.min.js"></script>
{% endhighlight %}

### CustomFlip
{% highlight html %}
<script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.mode.customflip.min.js"></script>
{% endhighlight %}
## Language File(s)

You should include at least one language file - you can include multiple, and we
will cover later how to go about switching languages on the fly.  However, if you
are storing you user's language preference server side, it is far preferable to just
send the one file they need.

### US English

{% highlight html %}
<script type="text/javascript" src="http://cdn.jtsage.com/datebox/i18n/jquery.mobile.datebox.i18n.en_US.utf8.js"></script>
{% endhighlight %}

### Other Languages
Other language files are available at: [i18n repo](http://cdn.jtsage.com/datebox/i18n) -
More on how the localization system works later


## Installation Alternatives
As a note, if you have a **production** application, it is **strongly** recomended
that you make a local copy of the script files.  I try not to break them, but it
happens sometimes.

### "Stable" Versions
Mostly "stable" versions, and past versions can be found by browsing the [CDN](http://cdn.jtsage.com/datebox/).

### The Version Tester
[Version Tester](http://dev.jtsage.com/jQM-DateBox/tests/dev.php?ver=1.4.3&verB=1.4.3) allows you to test different 
versions of jQM (ver) against DateBox (verB).  Chances are if you understand why this might be helpful, you also know
how to edit a query string.  This is mentioned here only as a time saver.

### Compiled Single Modes
If you only plan to *ever* use one mode, you can find complied versions by browsing
the [CDN](http://cdn.jtsage.com/datebox/) - they have "COMP" in the filename, and
include the CORE file.

## Full Script
Also in the [CDN](http://cdn.jtsage.com/datebox/) are a few "full" versions - they have .all in the 
name.  .all.extras includes customflip, other .all's do not.  The one with .amd in the filename also
has require.js bindings.

### Custom Builds
Occasonally, it is prefereable to have the core script, and all of the modes you
wish to use in a single file.  There is a python-based build utility specifically
for that available [in the repository](https://github.com/jtsage/jquery-mobile-datebox/tree/master/build).
Hopefully sometime soon there will be a web-based tool available for this purpose.


