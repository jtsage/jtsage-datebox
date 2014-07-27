<?php
require_once('inc/func.php');
echo do_header("Your First Datebox", array("2-installing.php","Installation"), array("3-1-themes.php","Theming"), 'calbox');
?>

<h1>Your First Datebox</h1>
<p>Adding a datebox is as simple as adding a data-role to a date or text input element, and specifying the <?php api('common',"mode"); ?> you wish to use.</p>

<pre class="prettyprint">&lt;input type="text" data-role="datebox" data-options='{"mode":"calbox"}'></pre>

<div><input type="text" data-role="datebox" data-options='{"mode":"calbox"}'></div>


<h1>The "data-options" Object</h1>
<p>The data-options attribue of the input will be your best and worst friend - all configuration of datebox can be done with this object (alternatively, you can do it pogrammatically or with defaults too).  It is important the the object itself be enclosed in single quotes, while each string inside of the object be double quoted.  It can work the other way on some browsers, but not all, and I've yet to find one where this method fails.</p>

<?php
echo do_footer();
?>
