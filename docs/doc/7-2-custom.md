---
title: CustomBox / CustomFlip
pagenum: 23
layout: doc
---

<script type="text/javascript" src="/jQM-DateBox/js/jqm-datebox.mode.customflip.js"></script>
<script type="text/javascript">
	var selectdata = ['Single', 'Separated', 'Involved', 'Married', 'Widowed', 'Lover', 'Other'];
	jQuery.extend(jQuery.mobile.datebox.prototype.options, {
		'customData': [{
			'input': true,
			'name': '',
			'data': selectdata
		}],
		"customDefault": [0,0,0],
		"useNewStyle": true,
		"enablePopup": false,
		"useFocus": true,
		"useHeader": true,
		"customFormat": "%Xa",
	});
	jQuery.extend(jQuery.mobile, { ajaxEnabled: false });
</script>


# CustomBox / CustomFlip

The custom modes allow you display and select data that has absolutly nothing to 
do with dates.  It uses the bare minimum of the datebox framework to provide the 
same UI to any matrix data you might have.

Shown below are the configuration options.  This is the most complete 
documentation for this mode, but it does appear in the API as well.

## Options

### Simple Options

 - {% api_doc themeOptPick %} : Theme for centered data (flip)
 - {% api_doc themeOpt %} : Theme for all other data (flip)
 - {% api_doc themeButton %} : Theme for +/- buttons (box)
 - {% api_doc themeInput %} : Theme for input box data (box)
 - {% api_doc useSetButton %} : Show a set button (box)

### {% api_doc overrideCustomSet %}

Set button text.  Note that this really should be set in a language pack.  But 
included here for easy use. If you needed to do a lot on a per page basis, 
something like:

{% highlight js %}
jQuery.mobile.datebox.prototype.options.lang['en'].customSet = "English"; //etc...
{% endhighlight %}
	
### {% api_doc customHead %}

Allows you to force the header text to whatever you specify.  Leaving it false 
allows datebox to work as normal, grabbing either the placeholder attribute, or 
the label text (in that order of preference).  If neither is found, it will be 
blank. Note that this option is **not** i18n aware.

### {% api_doc customFormat %}

The intended output format for the data.  At a glance, valid options are %Xa ... %Xe 
and %X1 ... %X6 - if numeric, it will output the **index** of the data, if 
alphabetic, it will be the actual data.  Note that re-opening the control when 
outputting the actual data is **very** error-prone, usually resulting in the 
control reverting to the "default" values. When left 'false', datebox will build 
an appropriate format of just the indexes.

### {% api_doc customDefault %}

The default selection for the data.  This is an array of **indexes**.  This 
**must** be set, as datebox can not really take a reasonable guess at your data.
By default it is [0,0,0], which will choose the first data element of up to 
three sources.

### {% api_doc customData %}

customData takes an array of data objects, up to 6. (a/n: probably this isn't 
checked, but 6 can be made to display somewhat ok).  The objects must contain:

 - **input**: Only used for customBox - show data in an input (true) or a div (false).
 - **name**: The header text for the field - can be blank.
 - **data**: A simple array of your data. Your data must be a string. Otherwise, it can be anything, including valid HTML.

## Working Example

<div class="ui-field-contain">
	<label for="headd">customHead</label>
	<input type="text" id="headd" class="demopick" data-link="cf" data-opt="customHead">
</div>
<div class="ui-field-contain">
	<label for="setd">overrideCustomSet</label>
	<input type="text" id="setd" class="demopick" data-link="cf" data-opt="overrideCustomSet">
</div>
<div class="ui-field-contain">
	<label for="setf">customFormat</label>
	<input type="text" id="setf" class="demopick" data-link="cf" data-opt="customFormat" value="%Xa">
</div>
<div class="ui-field-contain">
	<label for="dat">customData</label>
	<textarea id="dat" class="demopick" data-link="cf" data-opt="customData">[{
"input": true,
"name": "",
"data": ["Single", "Separated", "Involved", "Married", "Widowed", "Lover", "Other"]
}]</textarea>
</div>
		
<div class="ui-field-contain">
	<label for="cf">CustomFlip</label>
	<input name="cf" type="date" data-role="datebox" id="cf" data-options='{"mode": "customflip"}' />
</div>

# Sample Data

Default.  (customFormat === '%Xa')

{% highlight json %}
[{
  "input": true,
  "name": "",
  "data": ["Single", "Separated", "Involved", "Married", "Widowed", "Lover", "Other"]
}]
{% endhighlight %}

Slot Machine! (SET customFormat === '%X1,%X2,%X3' FIRST)

{% highlight json %}
[
  {"input": false, "name": "Wheel1", "data":[
    "<img src='../img/slot1.png'>","<img src='../img/slot2.png'>","<img src='../img/slot3.png'>","<img src='../img/slot4.png'>"
  ]},
  {"input": false, "name": "Wheel2", "data":[
    "<img src='../img/slot1.png'>","<img src='../img/slot2.png'>","<img src='../img/slot3.png'>","<img src='../img/slot4.png'>"
  ]},
  {"input": false, "name": "Wheel3", "data":[
    "<img src='../img/slot1.png'>","<img src='../img/slot2.png'>","<img src='../img/slot3.png'>","<img src='../img/slot4.png'>"
  ]}
]
{% endhighlight %}
