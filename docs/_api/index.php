<?php
require_once('inc/func.php');
require_once('inc/terms.php');
require_once('inc/text.php');

if ( !isset($_REQUEST['key']) ) {
	echo do_header("API", NULL, NULL, ' ');
	echo "<h1>DateBox API</h1>\n";
	
	foreach($opt as $cat=>$terms) {
		echo "<h2>{$terms[0]}</h2>\n";
		echo "<ul>\n";
	
		foreach($terms[1] as $key=>$term) {
			echo "<li><a href='index.php?idx={$cat}&key={$key}'>{$key}</a> :: {$term[1]}</li>\n";
		}
		echo "</ul>\n";
	}
}
else {
	echo do_header("API:{$_REQUEST['key']}", NULL, NULL, ' ');
	$themodes = array('DateBox','CalBox','FlipBox','SlideBox','TimeBox','TimeFlipBox','DurationBox');
	$thisterm = $opt[$_REQUEST['idx']][1][$_REQUEST['key']];
	$thistext = $text[$_REQUEST['idx']][1][$_REQUEST['key']];
	$type = "Option:: ";
	if ( $_REQUEST['idx'] == "public" ) { $type = "Function:: "; }
	if ( $_REQUEST['idx'] == "event" || $_REQUEST['idx'] == "event2" ) { $type = "Event:: "; }
	echo "<h1>{$type}{$_REQUEST['key']}</h1>\n";
	echo "<h3>{$thisterm[1]} (<em>{$thisterm[2]}</em>)</h3>\n";
	echo "<p>{$thistext}</p>\n";
	if ( ! ( $_REQUEST['idx'] == "public" || $_REQUEST['idx'] == "event" || $_REQUEST['idx'] == "event2" ) ) {
		echo "<p><strong>Default</strong>: ".var_export($thisterm[0], true)."</p>\n";
		echo "<p><strong>Valid Modes</strong>: ";
		if ( $thisterm[3] === true ) {
			echo "ALL";
		} else {
			$good = array();
			for( $i=0; $i<7; $i++ ) {
				if ( $thisterm[3][$i] == 1 ) { array_push($good, $themodes[$i]); }
			}
			echo "<em>".join(", ", $good)."</em>";
		}
		echo "</p>";
	}
}

echo do_footer();
?>
