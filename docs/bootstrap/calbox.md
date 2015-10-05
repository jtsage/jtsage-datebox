---
title: CalBox
layout: demoboot
pagenum: not0
---



<div class="row">
<div class="col-sm-8">

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc afterToday %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="afterToday" value='false'>
			<option value="false">False</option>
			<option value="true">True</option>
		</select>
		<span class="help-block">Only allow dates after "today" to be selected</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc beforeToday %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="beforeToday" value='false'>
			<option value="false">False</option>
			<option value="true">True</option>
		</select>
		<span class="help-block">Only allow dates before "today" to be selected</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc blackDates %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="blackDates" value='false'>
		<span class="help-block">ISO Style Dates to block</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc blackDatesRec %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="blackDatesRec" value='false'>
		<span class="help-block">Recurring Dates to block</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc blackDays %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="blackDays" value='false'>
		<span class="help-block">Days of the week to block</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc calDateList %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="calDateList" value='false'>
		<span class="help-block">List of dates for quick picker - [["1980-04-25", "JTs Date of Birth"], ["1809-02-12", "Lincolns Birthday"]]</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc calShowDateList %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="calShowDateList">
			<option value="false">False</option>
			<option value="true">True</option>
		</select>
		<span class="help-block">Show the quick jump date list</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc calHighPick %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="calHighPick">
			<option value="false">False</option>
			<option value="true" selected="selected">True</option>
		</select>
		<span class="help-block">Highlight the chosen date</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc calHighToday %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="calHighToday">
			<option value="false">False</option>
			<option value="true" selected="selected">True</option>
		</select>
		<span class="help-block">Highlight today's date</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc calNextMonthIcon %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="calNextMonthIcon" value='plus'>
		<span class="help-block">Icon class for next month icon</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc calPrevMonthIcon %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="calPrevMonthIcon" value='plus'>
		<span class="help-block">Icon class for previous month icon</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc calOnlyMonth %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="calOnlyMonth">
			<option value="false">False</option>
			<option value="true">True</option>
		</select>
		<span class="help-block">Hide previous and next month dates in the display</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc calShowDays %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="calShowDays">
			<option value="false">False</option>
			<option value="true" selected="selected">True</option>
		</select>
		<span class="help-block">Show the day of week labels on the top row of the control</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc calShowWeek %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="calShowWeek">
			<option value="false">False</option>
			<option value="true">True</option>
		</select>
		<span class="help-block">Show the ISO week number as the first column of the control</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc calUsePickers %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="calUsePickers">
			<option value="false">False</option>
			<option value="true">True</option>
		</select>
		<span class="help-block">Show the month and year selects at the top of the control</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc calYearPickMax %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="calYearPickMax" value='6'>
		<span class="help-block">Max year to show in year select (+/- or hard limit)</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc calYearPickMin %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="calYearPickMin" value='-6'>
		<span class="help-block">Min year to show in year select (+/- or hard limit)</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc calNoHeader %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="calNoHeader">
			<option value="false">False</option>
			<option value="true">True</option>
		</select>
		<span class="help-block">Suppress the standard header at the top of the control</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc calUsePickersIcons %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="calUsePickersIcons">
			<option value="false">False</option>
			<option value="true">True</option>
		</select>
		<span class="help-block">Still show the +/- Month buttons when calUsePickers and calNoHeader are both true</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc calWeekMode %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="calWeekMode">
			<option value="false">False</option>
			<option value="true">True</option>
		</select>
		<span class="help-block">Choose by week, not by day</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc calWeekModeDay %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="calWeekModeDay" value='1'>
		<span class="help-block">Day of week to select when in week mode</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label><small>override</small>{% api_doc dateFormat %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="overrideDateFormat" value=''>
		<span class="help-block">The format the control returns to the input</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc enableDates %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="enableDates" value='false'>
		<span class="help-block">ISO Style Dates to exclusively allow</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc highDates %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="highDates" value='false'>
		<span class="help-block">ISO Style Dates to highlight</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc highDatesAlt %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="highDatesAlt" value='false'>
		<span class="help-block">ISO Style Dates to highlight, list 2</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc highDatesRec %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="highDatesRec" value='false'>
		<span class="help-block">Recurring Style Dates to highlight</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc highDays %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="highDays" value='false'>
		<span class="help-block">List of days of the week to highlight</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc maxDays %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="maxDays" value='false'>
		<span class="help-block">Maximum number of days forward to allow</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc minDays %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="minDays" value='false'>
		<span class="help-block">Maximum number of days backward to allow</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc notToday %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="notToday">
			<option value="false">False</option>
			<option value="true">True</option>
		</select>
		<span class="help-block">Do not allow "today" to be selected</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc themeDate %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="themeDate" value='default'>
		<span class="help-block">Theme for the non-selected Date Buttons</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc themeDatePick %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="themeDatePick" value='success'>
		<span class="help-block">Theme for the selected Date Buttons</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc themeDateHigh %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="themeDateHigh" value='warning'>
		<span class="help-block">Theme for "highDates"</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc themeDateHighAlt %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="themeDateHighAlt" value='danger'>
		<span class="help-block">Theme for "highDatesAlt"</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc themeDateHighRec %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="themeDateHighRec" value='warning'>
		<span class="help-block">Theme for "highDatesRec"</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc themeDayHigh %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="themeDayHigh" value='warning'>
		<span class="help-block">Theme for "highDays"</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc themeDateToday %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="themeDateToday" value='info'>
		<span class="help-block">Theme for the "today" Date Button</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc themeCancelButton %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="themeCancelButton" value='default'>
		<span class="help-block">Theme for the "cancel" Button</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc themeClearButton %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="themeClearButton" value='default'>
		<span class="help-block">Theme for the "clear" Button</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc themeSetButton %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="themeSetButton" value='default'>
		<span class="help-block">Theme for the "set" Button</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc themeTodayButton %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="themeTodayButton" value='default'>
		<span class="help-block">Theme for the "jump to today" Button</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc themeTomorrowButton %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="themeTomorrowButton" value='default'>
		<span class="help-block">Theme for the "jump to tomorrow" Button</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc useCancelButton %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="useCancelButton">
			<option value="false">False</option>
			<option value="true">True</option>
		</select>
		<span class="help-block">Show the "clear input" button</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc useClearButton %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="useClearButton">
			<option value="false">False</option>
			<option value="true">True</option>
		</select>
		<span class="help-block">Show the "clear input" button</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc useCollapsedBut %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="useCollapsedBut">
			<option value="false">False</option>
			<option value="true">True</option>
		</select>
		<span class="help-block">Attempt to show all buttons on one line</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc useLang %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="useLang" value='en'>
		<span class="help-block">ISO Language code to use.</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc useSetButton %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="useSetButton">
			<option value="false">False</option>
			<option value="true" selected="selected">True</option>
		</select>
		<span class="help-block">Show the "set" button</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc useTodayButton %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="useTodayButton">
			<option value="false">False</option>
			<option value="true">True</option>
		</select>
		<span class="help-block">Show the "jump to today" button</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc useTomorrowButton %}</label></div>
	<div class="col-xs-9">
		<select class="form-control demopick" data-link="db" data-opt="useTomorrowButton">
			<option value="false">False</option>
			<option value="true">True</option>
		</select>
		<span class="help-block">Show the "jump to tomorrow" button</span>
	</div>
</div>

<div class="form-group row">
	<div class="col-xs-3"><label>{% api_doc whiteDates %}</label></div>
	<div class="col-xs-9">
		<input class="form-control demopick" data-link="db" data-opt="whiteDates" value='false'>
		<span class="help-block">ISO Style Dates to re-allow</span>
	</div>
</div>


</div>
<div class="col-sm-4" style="position:fixed; right:0;">

<div class="form-group">
<label for="db">CalBox</label>
<input class="form-control" id="db" type="text" data-role="datebox" data-options='{"mode":"calbox","useInline":true,"useInlineAlign":"center"}'>
</div>
</div>