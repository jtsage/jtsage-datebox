<?php
require_once('inc/func.php');
echo do_header("Localizing Datebox", array("3-3-output.php","Output Formats"), array('3-5-advdisplay.php', "Display Modifiers"), 'calbox');
echo do_all_lang();
?>
<h1>Display Modes</h1>
<p>This page will give you an overview of the available display modes.  Please take a look at the next page as well, as all of these modes have 
quite a number of small associated options.</p>

<h2>DateBox Popup - Default</h2>
<p>Given no other options, datebox will default to using it's own popup method - while this method is perhaps not the most
efficient and clean available (see below: Built-In Popup), it uses none of jQM's built in methods to place the control - so
it should work on "top" of other dialogs, popups, panels, etc. It is also the method used in development, so it tends to work
with new versions first.<p>
	
<div><input type="text" data-role="datebox" data-options='{"mode":"calbox", "useFocus":true, "useInline":false}'></div>

<h2>Built-In Popup</h2>
<p>With the option "enablePopup", DateBox will use jQM's built in popup method.  It is very clean, very fast, and offers a couple of 
extra options not available with DateBox's own popup method.</p>

<pre class="prettyprint">&lt;input type="text" data-role="datebox" data-options='{"mode":"calbox", "enablePopup":true}'></pre>

<div><input type="text" data-role="datebox" data-options='{"mode":"calbox", "useFocus":true, "useInline":false, "enablePopup":true}'></div>

<h2>Dialog</h2>
<p>DateBox can also take advantage of jQM's dialog pages.  Please note that this method is tested pretty much last, as it's a holdover 
from the initial versions of jQM, and I'm not sure it has a lot of utility left.  You can enable the dialog mode with "dialogEnable" - 
which means if the window width is less than 400px (very small displays), it will use the dialog mode - otherwise it will use the DateBox 
Popup method.  To force the control to <strong>always</strong> be in a dialog, also set "dialogForce"</p>

<pre class="prettyprint">&lt;input type="text" data-role="datebox" data-options='{"mode":"calbox", "dialogEnable":true, "dialogForce":true}'></pre>

<div><input type="text" data-role="datebox" data-options='{"mode":"calbox", "useFocus":true, "useInline":false, "dialogEnable":true, "dialogForce":true}'></div>

<h2>Inline and Inline-Blind</h2>
<p>Sometimes (such as in these documents), it is preferable to have the control simply appear inline with the rest of the form.  To 
show the control inline, with no hiding, set "useInline".</p>

<pre class="prettyprint">&lt;input type="text" data-role="datebox" data-options='{"mode":"calbox", "useInline":true}'></pre>

<div><input type="text" data-role="datebox" data-options='{"mode":"calbox"}'></div>

<p>Or, you might want DateBox to mimic the behavior of jQuery-UI - that is, to slide down the control when you click the input.  To
do this, set "useInlineBlind"</p>

<pre class="prettyprint">&lt;input type="text" data-role="datebox" data-options='{"mode":"calbox", "useInlineBlind":true}'></pre>

<div><input type="text" data-role="datebox" data-options='{"mode":"calbox", "useInline":false, "useInlineBlind":true, "useFocus":true}'></div>


<?php
echo do_footer();
?>
	
