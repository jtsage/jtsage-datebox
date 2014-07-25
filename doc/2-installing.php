<?php
require_once('inc/func.php');
echo do_header("Installation", array("1-1-features.php","Features"), array('3-first-datebox.php','Your First Datebox'), ' ');
?>

<h1>Requirements</h1>
<p>jQM-Datebox requires a recent version of jQuery (last tested with both 1.9+ and 2.0+), and a close version of jQueryMobile.  There is a version string in jqm-datebox.core.js, on or around line #12 that gives which version of jQueryMobile it was built and tested upon.  Typically, it will work with at least the last major version of jQueryMobile as well.</p>
<pre class="prettyprint">
11                          // All widget options, including some internal runtime details
12                          version: '2-1.4.2-2014072200', // DateBoxVersion-jQMVersion-YrMoDaySerial
</pre>


<h1>Script Includes</h1>
<p>You will need to include the main CSS file, the CORE DateBox file, and <strong>each</strong> of the MODE files you wish to use</p>
<h2>CSS Includes</h2>
<pre class="prettyprint">&lt;link rel="stylesheet" type="text/css" href="http://cdn.jtsage.com/datebox/latest/jqm-datebox.min.css" /></pre>

<h2>CORE Script</h2>
<p>Optionally, you can enable mousewheel support for desktop operation of DateBox by including Brandon Aaron's mousewheel plugin prior to loading DateBox. 
It is available at: <a href="https://github.com/brandonaaron/jquery-mousewheel">github.com/brandonaaron/jquery-mousewheel</a></p>

<pre class="prettyprint">&lt;script type="text/javascript" src="http://cdn.jtsage.com/datebox/latest/jqm-datebox.core.min.js">&lt;/script></pre>

<h2>MODE Options</h2>
<p>You need to include one or more of the following modes for DateBox to function</p>

<h3>CalBox</h3>
<pre class="prettyprint">&lt;script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.mode.calbox.min.js">&lt;/script></pre>
<h3>DateBox / TimeBox</h3>
<pre class="prettyprint">&lt;script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.mode.datebox.min.js">&lt;/script></pre>
<h3>FlipBox / TimeFlipBox</h3>
<pre class="prettyprint">&lt;script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.mode.flipbox.min.js">&lt;/script></pre>
<h3>SlideBox</h3>
<pre class="prettyprint">&lt;script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.mode.slidebox.min.js">&lt;/script></pre>
<h3>DurationBox</h3>
<pre class="prettyprint">&lt;script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.mode.durationbox.min.js">&lt;/script></pre>
<h3>DurationFlipBox</h3>
<pre class="prettyprint">&lt;script type="text/javascript" src="http://dev.jtsage.com/cdn/datebox/latest/jqm-datebox.mode.durationflipbox.min.js">&lt;/script></pre>

<h2>Language File(s)</h2>
<p>You should include at least one language file - you can include multiple, and we will cover later how to go about switching languages on the fly.  However, if you are storing you user's language preference server side, it is far preferable to just send the one file they need.</p>
<h3>US English</h3>
<pre class="prettyprint">&lt;script type="text/javascript" src="http://cdn.jtsage.com/datebox/i18n/jquery.mobile.datebox.i18n.en_US.utf8.js">&lt;/script></pre>
<h3>Other Languages</h3>
<p>Other language files are available at: <a href="http://cdn.jtsage.com/datebox/i18n/">cdn.jtsage.com/datebox/i18n/</a> - More on how the localization system works later</p>

<h2>Installation Alternatives</h2>
<p>As a note, if you have a <strong>production</strong> application, it is <strong>strongly</strong> recomended that you make a local copy of the script files.  I try not to break them, but it happens sometimes.</p>

<h3>"Stable" Versions</h3>
<p>Mostly "stable" versions, and past versions can be found by browsing the <a href="http://cdn.jtsage.com/datebox/">CDN</a>.

<h3>Compiled Single Modes</h3>
<p>If you only plan to *ever* use one mode, you can find complied versions by browsing the <a href="http://cdn.jtsage.com/datebox/">CDN</a> - they have "COMP" in the filename, and include the CORE file</p>

<h3>Custom Builds</h3>
<p>Occasonally, it is prefereable to have the core script, and all of the modes you wish to use in a single file.  There is a python-based build utility specifically for that available <a href="https://github.com/jtsage/jquery-mobile-datebox/tree/master/build">in the repository</a>. Hopefully sometime soon there will be a web-based tool available for this purpose.</p>



<?php
echo do_footer();
?>
