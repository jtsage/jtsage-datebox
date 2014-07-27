<?php
require_once('inc/func.php');
echo do_header("Themeing Datebox", array("3-first-datebox.php","Your FIrst Datebox"), array("3-2-locale.php","Localization"));
?>

<h1>Themeing Datebox</h1>
<p>An overall theme of datebox is easy - just specify it like any other element.  Of course, datebox will do it's best to inherit it's theme from it's parent(s) if you don't specify, finally falling back on 'a' if none is specified anywhere.</p>

<pre class="prettyprint">&lt;input type="text" data-role="datebox" data-theme="c" data-options='{"mode":"calbox"}'></pre>

<div><input type="text" data-role="datebox" data-theme="c" data-options='{"mode":"calbox"}'></div>

<p>The results from this are usually pretty hideous - so, DateBox provides a method in which the theme individual elements of each control, for the look you want (jQM really doesn't provide enough variations in a single theme for quick reading of compex data).  This method is used for the basic bits of each control - background, set button, etc.</p>

<h1>Themeing CalBox</h1>
<p>CalBox has a number of theme options that can be added to the "data-options" attribute, - they are:
<ul>
	<li><strong><?php api('themes',"themeDate"); ?></strong>: Theme for otherwise un-specified date buttons</li>
	<li><strong><?php api('themes',"themeDateToday"); ?></strong>: Theme for "today"</li>
	<li><strong><?php api('themes',"themeDatePick"); ?></strong>: Theme for choosen date (used last after other options fail)</li>
	<li><strong><?php api('themes',"themeDayHigh"); ?></strong>: Theme for highlighted DAYS</li>
	<li><strong><?php api('themes',"themeDateHigh"); ?></strong>: Theme for highlighted DATES</li>
	<li><strong><?php api('themes',"themeDateHighAlt"); ?></strong>: Theme for highlighted ALTERNATE DATES</li>
	<li><strong><?php api('themes',"themeDateHighRec"); ?></strong>: Theme for highlighted RECURRING DATES</li>
</ul>
</p>
		
<div class="ui-field-contain"><label for="cal1dateb">themeDate</label><select name="cal1dateb" class="demopick" data-link="cal1" data-opt="themeDate"><option value="a">A</option><option value="b">B</option><option value="c">C</option><option value="d">D</option></select></div>
<div class="ui-field-contain"><label for="cal1datec">themeDatePick</label><select name="cal1datec" class="demopick" data-link="cal1" data-opt="themeDatePick"><option value="a">A</option><option value="b" selected="selected">B</option><option value="c">C</option><option value="d">D</option></select></div>
<div class="ui-field-contain"><label for="cal1dated">themeDateToday</label><select name="cal1dated" class="demopick" data-link="cal1" data-opt="themeDateToday"><option value="a">A</option><option value="b" selected="selected">B</option><option value="c">C</option><option value="d">D</option></select></div>

<div><input type="text" data-role="datebox" data-options='{"mode":"calbox"}' id="cal1"></div>

<h1>Themeing DateBox/TimeBox/DurationBox</h1>
<p>DateBox/TimeBox/DurationBox have a number of theme options that can be added to the "data-options" attribute, - they are:
<ul>
	<li><strong><?php api('themes',"themeButton"); ?></strong>: Theme for +/- buttons</li>
	<li><strong><?php api('themes',"themeInput"); ?></strong>: Theme for text inputs</li>
</ul>
</p>
		
<div class="ui-field-contain"><label for="db1a">themeButton</label><select name="db1a" class="demopick" data-link="db1" data-opt="themeButton"><option value="a">A</option><option value="b">B</option><option value="c">C</option><option value="d">D</option></select></div>
<div class="ui-field-contain"><label for="db1b">themeInput</label><select name="db1b" class="demopick" data-link="db1" data-opt="themeInput"><option value="a">A</option><option value="b">B</option><option value="c">C</option><option value="d">D</option></select></div>

<div><input type="text" data-role="datebox" data-options='{"mode":"datebox"}' id="db1"></div>

<h1>Themeing FlipBox/TimeFlipBox</h1>
<p>FlipBox/TimeFlipBox have a number of theme options that can be added to the "data-options" attribute, - they are:
<ul>
	<li><strong><?php api('themes',"themeDate"); ?></strong>: Theme for default dates</li>
	<li><strong><?php api('themes',"themeDateHigh"); ?></strong>: Theme for "today"</li>
	<li><strong><?php api('themes',"themeDatePick"); ?></strong>: Theme for choosen date</li>
</ul>
</p>
		
<div class="ui-field-contain"><label for="fb1a">themeDate</label><select name="fb1a" class="demopick" data-link="fb1" data-opt="themeDate"><option value="a">A</option><option value="b">B</option><option value="c">C</option><option value="d">D</option></select></div>
<div class="ui-field-contain"><label for="fb1b">themeDatePick</label><select name="fb1b" class="demopick" data-link="fb1" data-opt="themeDatePick"><option value="a">A</option><option value="b" selected="selected">B</option><option value="c">C</option><option value="d">D</option></select></div>
<div class="ui-field-contain"><label for="fb1c">themeDateHigh</label><select name="fb1c" class="demopick" data-link="fb1" data-opt="themeDateHigh"><option value="a">A</option><option value="b" selected="selected">B</option><option value="c">C</option><option value="d">D</option></select></div>

<div><input type="text" data-role="datebox" data-options='{"mode":"flipbox"}' id="fb1"></div>

<h1>Themeing SlideBox</h1>
<p>SlideBox have a number of theme options that can be added to the "data-options" attribute, - they are:
<ul>
	<li><strong><?php api('themes',"themeDate"); ?></strong>: Theme for default dates</li>
	<li><strong><?php api('themes',"themeDateHigh"); ?></strong>: Theme for "today"</li>
	<li><strong><?php api('themes',"themeDatePick"); ?></strong>: Theme for choosen date</li>
</ul>
</p>
		
<div class="ui-field-contain"><label for="sb1a">themeDate</label><select name="sb1a" class="demopick" data-link="sb1" data-opt="themeDate"><option value="a">A</option><option value="b">B</option><option value="c">C</option><option value="d">D</option></select></div>
<div class="ui-field-contain"><label for="sb1b">themeDatePick</label><select name="sb1b" class="demopick" data-link="sb1" data-opt="themeDatePick"><option value="a">A</option><option value="b" selected="selected">B</option><option value="c">C</option><option value="d">D</option></select></div>
<div class="ui-field-contain"><label for="sb1c">themeDateHigh</label><select name="sb1c" class="demopick" data-link="sb1" data-opt="themeDateHigh"><option value="a">A</option><option value="b" selected="selected">B</option><option value="c">C</option><option value="d">D</option></select></div>

<div><input type="text" data-role="datebox" data-options='{"mode":"slidebox"}' id="sb1"></div>

<?php
echo do_footer();
?>
