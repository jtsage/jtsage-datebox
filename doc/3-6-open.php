<?php
require_once('inc/func.php');
echo do_header("Open Methods", array('3-5-advdisplay.php',"Display Modifiers"), array('4-limits.php',"Data Limiting"), 'calbox');
?>
<h1>Original Input</h1>
<p>If for some reason you wish you end-user to be able to directly enter a date in the input, set <?php api('common','lockInput'); ?> false</p>

<h1>Input Styles</h1>
<p>There are a number of input styles - my favorite by far is <?php api('display','useNewStyle'); ?>.  But there are other options as well, which I will demonstrate below.</p>

<h3>Default Display</h3>
<p>Note that the button will not display correctly if the input does not have a named ID</p>
<div class="ui-field-contain"><input id="cal1" type="text" data-role="datebox" data-options='{"mode":"calbox","useInline":false,"useNewStyle":false}'></div>


<h3><?php api('display', 'useNewStyle'); ?> coupled with <?php api('display','useFocus'); ?></h3>
<p>You <em>can</em> use this mode without 'useFocus', however I find the button to be too small to acurately click</p>

<div><input type="text" data-role="datebox" data-options='{"mode":"calbox","useInline":false,"useFocus":true}'></div>

<h3><?php api('display','useButton'); ?> false with <?php api('display','useFocus'); ?></h3>
<p>Setting 'useButton' off will prevent the button decoration</p>

<div><input type="text" data-role="datebox" data-options='{"mode":"calbox","useInline":false,"useFocus":true,"useNewStyle":false,"useButton":false}'></div>

<h3><?php api('display','hideInput'); ?> and opening with a link or button</h3>

<div><input id="cal2" type="text" data-role="datebox" data-options='{"mode":"calbox","centerVert":true, "centerHoriz":true,"useInline":false,"hideInput":true}'></div>
<p>This is where the options <?php api('display','centerHoriz'); ?> and <?php api('display','centerVert'); ?> are most useful.</p>
<a href="javascript:$('#cal2').datebox('open');" data-role="button">Open Datebox</a>
<pre class="prettyprint">&lt;a href="javascript:$(input).datebox('open');" data-role="button">Open Datebox&lt;/a></pre>

<h1>Fine-Tuning Input styling</h1>

<h3><?php api('display','useNewStyle'); ?> and <?php api('display','useAltIcon'); ?></h3>
<p>Depending on your theme choice, it may be preferable to use a light colored icon rather than a dark one</p>
<p>If this is still not enough, the option <?php api('display','overrideStyleClass'); ?> allows you to pass your own icon theme to the control.</p>

<div><input data-theme="b" type="text" data-role="datebox" data-options='{"mode":"calbox","useInline":false,"useFocus":true,"useAltIcon":true}'></div>

<h3><?php api('display','usePlaceholder'); ?></h3>
<p>When 'usePlaceholder' is true, it will grab the label of the element and set it as the placeholder. If it is a string, it will use that instead.  You may have also noticed that DateBox always tries to use the label as it's header text, when appropriate.</p>

<div class="ui-field-contain"><label for="cal3">Date Of Birth</label><input id="cal3" type="text" data-role="datebox" data-options='{"mode":"calbox","useInline":false,"useFocus":true,"usePlaceholder":true}'></div>





<?php
echo do_footer();
?>
