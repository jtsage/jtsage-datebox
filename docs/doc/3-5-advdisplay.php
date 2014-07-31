<?php
require_once('inc/func.php');
echo do_header("Display Modifiers", array("3-4-display.php","Display Modes"), array('3-6-open.php',"Open Methods"));
echo do_all_lang();
?>
<h1>Display Mode Options</h1>
<p>This page is intended to give you all of the associated options for each open mode.</p>

<h2>General Options</h2>
<p>There are a few "every mode" options available - they will seem familiar from the base jQM.
<ul>
	<li><strong><?php api('display',"transition"); ?></strong>: The transition to use for display, default: <em>'pop'</em></li>
	<li><strong><?php api('display',"useAnimation"); ?></strong>: Enable transition animations, default: <em>true</em></li>
	<li><strong><?php api('display',"zindex"); ?></strong>: The Z-Index of the control, default: <em>1100</em></li>
	<li><strong><?php api('display',"resizeListener"); ?></strong>: Re-position the control on window change (landscape/portait flip for instance), default: <em>true</em></li>
	<li><strong><?php api('display',"hideFixedToolbars"); ?></strong>: Hide "fixed" toolbars on open, default: <em>false</em></li>
</ul></p>


<h2>DateBox Popup</h2>
<p>For the datebox popup mode, there are two options that can control where the popup is located. Note that these may not seem to do much in this demo, as they are more suited to dealing with multi-column layouts.
<ul>
	<li><strong><?php api('display',"centerHoriz"); ?></strong>: Center horizontally in the window</li>
	<li><strong><?php api('display',"centerVert"); ?></strong>: Center vertically in the window</li>
	<li><strong><?php api('display',"useModal"); ?></strong>: Use faded modal background for control (cannot be changed post-init)</li>
</ul></p>

<div class="ui-field-contain">
<label for="cal1a">centerHoriz:</label><select id="cal1a" data-link="cal1" data-opt="centerHoriz" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select></div>
<div class="ui-field-contain">
<label for="cal1b">centerVert:</label><select id="cal1b" data-link="cal1" data-opt="centerHoriz" data-role="flipswitch" class="demopick"><option value="false">False</option><option value="true">True</option></select></div>

<div class="ui-field-contain">
<label for="cal1">Calendar</label>
<input type="text" id="cal1" data-role="datebox" data-options='{"mode":"calbox", "useFocus":true, "useInline":false}'></div>

<h2>Built-In Popup</h2>
<p>The jQM Builtin Popup has a few more options. They are:
<ul>
	<li><strong><?php api('display',"popupForceX"); ?></strong>: Force X Position of popup</li>
	<li><strong><?php api('display',"popupForceY"); ?></strong>: Force Y Position of popup</li>
	<li><strong><?php api('display',"popupPosition"); ?></strong>: Position over a named element</li>
</ul>
Leaving popup position set to false will center the popup over the input <em>if it has a named id</em>, otherwise it will center in the window.<br>You must set it to 'origin' to use the X/Y coordinates.</p>

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
<input id="cal2" type="text" data-role="datebox" data-options='{"mode":"calbox", "useFocus":true, "useInline":false, "enablePopup":true}'></div>


<h2>Dialog, Inline, and Inline-Blind</h2>
<p>At this time, these modes have no additional options associated with them</p>

<?php
echo do_footer();
?>
	
