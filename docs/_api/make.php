<?php
require_once('inc/terms.php');
require_once('inc/text.php');

$i = 0;
foreach($opt as $catkey=>$catdata) {
	foreach ( $catdata[1] as $name=>$data ) {
		$out  = "---\n";
		$out .= "title: {$name}\n";
		$out .= "short: {$data[1]}\n";
		$out .= "modes: [\n";
		if ( !is_array($data[3]) && $data[3] == true ) {
			$out .= "\t'datebox',\n\t'timebox',\n\t'calbox',\n\t'slidebox',\n\t'flipbox',\n\t'timeflipbox',\n\t'durationbox',\n\t'durationflipbox'\n";
		}
		if ( is_array($data[3]) ) {
			if ( $data[3][0] == 1 ) { $out .= "\t'datebox',\n"; }
			if ( $data[3][1] == 1 ) { $out .= "\t'calbox',\n"; }
			if ( $data[3][2] == 1 ) { $out .= "\t'flipbox',\n"; }
			if ( $data[3][3] == 1 ) { $out .= "\t'slidebox',\n"; }
			if ( $data[3][4] == 1 ) { $out .= "\t'timebox',\n"; }
			if ( $data[3][5] == 1 ) { $out .= "\t'timeflipbox',\n"; }
			if ( $data[3][6] == 1 ) { $out .= "\t'durationbox',\n"; }
		}
		$out .= "]\n";
		$out .= "cats: [ '$catkey' ]\n";
		$out .= "relat: \"{$catkey}\"\n";
		$out .= "layout: api\n";
		$defval = $data[0];
		if ( is_bool($data[0]) ) {
			if ( $data[0] == true ) { $defval = "true"; } else { $defval = "false"; }
		}
		$out .= "defval: \"{$defval}\"\n";
		$out .= "dattype: \"{$data[2]}\"\n";
		$out .= "---\n\n";
		$out .= $text[$catkey][1][$name];
		$out .= "\n";
		file_put_contents($name.".md",$out);
		echo "Did: {$name}\n";
	}
}

?>
