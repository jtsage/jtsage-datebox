---
title: Display Modifiers
pagenum: 8
layout: doc
---

# Display Mode Options

This page is intended to give you all of the associated options for each open mode.

## General Options

There are a few "every mode" options available - they will seem familiar from the base jQM.

 - {% api_doc transition %} : The transition to use for display, default: <em>'pop'</em>
 - {% api_doc useAnimation %} : Enable transition animations, default: <em>true</em>
 - {% api_doc zindex %} : The Z-Index of the control, default: <em>1100</em>

## Built-In Popup

The jQM Builtin Popup has a few more options. They are:

 - {% api_doc popupForceX %} : Force X Position of popup
 - {% api_doc popupForceY %} : Force Y Position of popup
 - {% api_doc popupPosition %} : Position over a named element
 - {% api_doc useModal %} : Use faded modal background for control (cannot be changed post-init)
 - {% api_doc useModalTheme %} : Background swatch for modal display

Leaving popup position set to false will center the popup over the input *if it has
a named id*, otherwise it will center in the window.

You must set it to 'origin' to use the X/Y coordinates (or rather, should you supply X/Y coordinates, 
it will auto-set to 'origin')

<div class="ui-field-contain">
<label for="cal2a">"popupForceX"</label><input data-link="cal2" data-opt="popupForceX" id="cal2a" type="text" class="demopick" value="false"></div>
<div class="ui-field-contain">
<label for="cal2b">"popupForceY"</label><input data-link="cal2" data-opt="popupForceY" id="cal2b" type="text" class="demopick" value="false"></div>
<div class="ui-field-contain">
<label for="cal2c">"popupPosition"</label><select data-link="cal2" data-opt="popupPosition" id="cal2c" class="demopick">
  <option value="false">false : center on input or window</option>
  <option value="origin">origin : use X/Y coordinates above</option>
  <option value="window">window: center in window</option>
  <option value="#cal2label">#cal2label: Center over the calendars label (named id)</option>
</select></div>

<div class="ui-field-contain">
	<label for="cal2" id="cal2label">Calendar</label>
	<input id="cal2" type="text" data-role="datebox" data-options='{"mode":"calbox", "useFocus":true}'>
</div>


## Dialog, Inline, and Inline-Blind

At this time, these modes have no additional options associated with them - see next page for somewhat
associated options though.
