---
title: Installing
pagenum: 2
layout: doc
---

# Requirements

jQM-Datebox requires a recent version of jQuery (last tested with both 1.9+ and 2.
+).

For jQueryMobile, the current DateBox is usually tested with only the latest point
release, however it will usually work for a few prior releases.

For Twitter Bootstrap operation, the bootstrap css file is required (
the bootstrap JavaScript modal plugin is used).  Additionally,
the jQueryUI Widget Factory is required.  You can either include all of jQueryUI, or you
can build a custom version of jQueryUI containing only the widget factory. Although the default
jQueryUI widgets look poor on bootstrap, they do not actually conflict.

To know what the current recommendation versions are, take a look near the top of the script file.

For jQueryUI framework operation, only the jQueryUI Widget Factory is required. The plugin will assume that a jQueryUI css theme file is present, but you are welcome and encouraged to create your own.  At this time, the .ui-widget-*, .ui-button, .ui-state-*, and .ui-icon-* classes are actually referenced (DatePicker clases are NOT used).  Please see the [jQueryUI ThemeRoller](http://jqueryui.com/themeroller/) for more information.

{% highlight js %}
// Check Header for Build Date.
version: "4.3.1",              // Actually DateBox Version
// These are never used, just information
jqmVersion: "1.4.5",           // Version of jQM used for testing
bootstrapVersion: "3.3.7",     // Version of Twitter Bootstrap used for testing
bootstrap4Version: "4.0.0b2",  // Version of Twitter Bootstrap4 used for testing
jqmuiWidgetVersion: "1.11.4"   // Version of the jQueryUI Widget Factor used for testing
{% endhighlight %}


# Script Includes

You will need to include the CSS and JS file for the framework of your choice. If you wish to customize
which display modes are available, please use the [Download Builder](../../builder/).

Optionally, you can enable mousewheel support for desktop operation of DateBox by
including Brandon Aaron's mousewheel plugin prior to loading DateBox. It is available
at: [mousewheel](https://github.com/brandonaaron/jquery-mousewheel)

<div class="panel panel-default">
<div class="panel-heading">
<h3 class="panel-title">jQueryMobile Version</h3>
</div>
<div class="panel-body">

{% highlight html %}
<link href="https://cdn.jsdelivr.net/npm/jtsage-datebox-jqm@{{ site.dbverdir }}/jtsage-datebox.min.css" rel="stylesheet" type="text/css">
<script src="https://cdn.jsdelivr.net/npm/jtsage-datebox-jqm@{{ site.dbverdir }}/jtsage-datebox.min.js" type="text/javascript"></script>
{% endhighlight %}

</div>
</div>


<div class="panel panel-default">
<div class="panel-heading">
<h3 class="panel-title">Twitter Bootstrap (v3 and v4) Version</h3>
</div>
<div class="panel-body">
<p>Please note: the bootstrap javascript file is required for modal opertaion. Either include it, or turn {% api_doc bootstrapResponsive %} off.</p>

{% highlight html %}
<link href="https://cdn.jsdelivr.net/npm/jtsage-datebox-bootstrap3@{{ site.dbverdir }}/jtsage-datebox.min.css" rel="stylesheet" type="text/css">
<script src="https://cdn.jsdelivr.net/npm/jtsage-datebox-bootstrap3@{{ site.dbverdir }}/jtsage-datebox.min.js" type="text/javascript"></script>

<link href="https://cdn.jsdelivr.net/npm/jtsage-datebox-bootstrap4@{{ site.dbverdir }}/jtsage-datebox.min.css" rel="stylesheet" type="text/css">
<script src="https://cdn.jsdelivr.net/npm/jtsage-datebox-bootstrap4@{{ site.dbverdir }}/jtsage-datebox.min.js" type="text/javascript"></script>
{% endhighlight %}

</div>
</div>

<div class="panel panel-default">
<div class="panel-heading">
<h3 class="panel-title">jQueryUI Version</h3>
</div>
<div class="panel-body">

{% highlight html %}
<link href="https://cdn.jsdelivr.net/npm/jtsage-datebox-jqueryui@{{ site.dbverdir }}/jtsage-datebox.min.css" rel="stylesheet" type="text/css">
<script src="https://cdn.jsdelivr.net/npm/jtsage-datebox-jqueryui@{{ site.dbverdir }}/jtsage-datebox.min.js" type="text/javascript"></script>
{% endhighlight %}

</div>
</div>

## Language File(s)

You should include at least one language file - you can include multiple, and we
will cover later how to go about switching languages on the fly.  However, if you
are storing you user's language preference server side, it is far preferable to just
send the one file they need.

<div class="panel panel-default">
<div class="panel-heading">
<h3 class="panel-title">US English</h3>
</div>
<div class="panel-body">

{% highlight html %}
<script src="https://cdn.jsdelivr.net/npm/jtsage-datebox-i18n/jquery.mobile.datebox.i18n.en_US.utf8.js" type="text/javascript" ></script>
{% endhighlight %}

</div>
</div>

{::options parse_block_html="true" /}
<div class="panel panel-default">
<div class="panel-heading">
<h3 class="panel-title">Other Languages</h3>
</div>
<div class="panel-body">
Other language files are available at: [i18n repo](http://cdn.jtsage.com/jtsage-datebox/i18n) -
Information on how the localization system works can be found in [section 3.2]({{ site.basesite }}doc/3-2-locale).
</div>
</div>


## Installation Alternatives
As a note, if you have a **production** application, it is **strongly** recomended
that you make a local copy of the script files.  My "CDN" is a distibution folder on a single
server, there is no redundancy, and it is occasionally prone to downtime. 

If you prefer bower, <strong>bower install jtsage-datebox</strong> will get you built versions for every library.

<div class="panel panel-default">
<div class="panel-heading">
<h3 class="panel-title">Custom jQueryMobile Builds</h3>
</div>
<div class="panel-body">

If you want to do a custom build of jQueryMobile, I believe the following are the
minimum requirements for DateBox to function properly (as of 1.4.5):

* Core : All
* Events: All (added by Core::init)
* Forms: Fieldcontainers, Controlgroups, Text Inputs & Textareas
* Navigation: All (added by Core::init)
* Transitions: Concurrent, Handlers, Serial, Core (added by Core::init) **AND Pop Transition**
* Utilities: Degrade, Link, Match Media, Zoom (added by Core::init)
* Widgets: First & Last, Loading (added by Core::init) **AND Popups**

</div>
</div>
