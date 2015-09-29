---
title: Including Dates
pagenum: 13
layout: doc
---

# Overview

Including dates is done by a series of highlighting tools - it does not so much include
those dates, as it visually distinguishes them


# Date List Highlights

Note: Please view the API documentation for each option to understand the required data format.

<div class="form-group">
	<label for="cal4a">{% api_doc highDays %}</label>
	<input id="cal4a" data-link="cal4" data-opt="highDays" value="false" type="text" class="form-control demopick" placeholder='[2,4] / false'>
	<span class="help-block">[2,4] / false</span>
</div>
<div class="form-group">
	<label for="cal4b">{% api_doc highDates %}</label>
	<input id="cal4b" data-link="cal4" data-opt="highDates" value="false" type="text" class="form-control demopick" placeholder='["2001-01-01", "2000-12-31"] / false'>
	<span class="help-block">["2001-01-01", "2000-12-31"] / false</span>
</div>
<div class="form-group">
	<label for="cal4c">{% api_doc highDatesAlt %}</label>
	<input id="cal4c" data-link="cal4" data-opt="highDatesAlt" value="false" type="text" class="form-control demopick" placeholder='["2001-01-01", "2000-12-31"] / false'>
	<span class="help-block">["2001-01-01", "2000-12-31"] / false</span>
</div>
<div class="form-group">
	<label for="cal4d">{% api_doc highDatesRec %}</label>
	<input id="cal4d" data-link="cal4" data-opt="highDatesRec" value="false" type="text" class="form-control demopick" placeholder='[[-1,11,31],[-1,0,1]] / false'>
	<span class="help-block">[[-1,11,31],[-1,0,1]] / false</span>
</div>
<div class="form-group">
	<label for="cal4">Lists</label>
	<input class="form-control" type="text" id="cal4" data-role="datebox" data-options='{"mode":"calbox", "hideInput": true, "useInline":true, "useInlineAlign":"center"}'>
</div>


# Date Jump-To List

Note: there is no default list for this option - you must supply one.

<div class="form-group">
	<label for="cal1a">{% api_doc calShowDateList %}</label>
	<select id="cal1a" data-link="cal1" data-opt="calShowDateList" data-role="flipswitch" class="form-control demopick"><option value="false">False</option><option value="true">True</option></select>
</div>
<div class="form-group">
	<label for="cal1d">{% api_doc calDateList %}</label>
	<input id="cal1d" data-link="cal1" data-opt="calDateList" value="false" type="text" class="form-control demopick" placeholder='[["1980-04-25", "JTs Date of Birth"], ["1809-02-12", "Lincolns Birthday"]] / false'>
	<span class="help-block">[["1980-04-25", "JTs Date of Birth"], ["1809-02-12", "Lincolns Birthday"]] / false</span>
</div>
<div class="form-group">
	<label for="cal1">Jumper</label>
	<input type="text" id="cal1" class="form-control" data-role="datebox" data-options='{"mode":"calbox", "hideInput": true, "useInline": true, "useInlineAlign":"center"}'>
</div>
