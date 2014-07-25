<?php
require_once('inc/func.php');
echo do_header("Main Documentation", NULL, array("1-1-features.php","Features"));
?>

<h1>Description</h1>
<p>DateBox is a jQueryMobile plugin that aims to make user interaction with dates and times simple and intuitive. It is a colloborative work, with a full range of features allowing easy implementation, and painless extensibility.</p>


<h1>Conventions</h1>
<p>These demos use a good bit of pseduo-code - remember to look at the page source to get the whole story.  Also, a few options are locked on for all of these demos, mainly, the control displays "inline" - that is, as part of the page rather than a popup (the default behavior).  It also has the "new" style forced on for most of the demos (somewhere under display options I'll show the old method).</p>
<p>I've also specifically turned jQM's Ajax Navigation OFF - this is not because DateBox has any problems working with correctly when it's enabled, it was purely to make sure that bookmarks to specific parts of this documentation are easy to follow</p>


<h1>Navigation</h1>
<p>A the top of each page, you can naviagte through this like a giant how-to, or jump to the Table of Contents</p>

<?php
echo do_footer();
?>
