#!/usr/bin/perl -w

$javapath = `which java`;
chomp $javapath;
$version = '';

@files = (
	'jquery.mobile.datebox.min.js',
	'jquery.mobile.datebox.min.css',
	'jquery.mobile.datebox.calbox.min.js',
	'jquery.mobile.datebox.datebox.min.js',
	'jquery.mobile.datebox.slidebox.min.js',
	'jquery.mobile.datebox.timebox.min.js',
	'jquery.mobile.datebox.durationbox.min.js',
	'jquery.mobile.datebox.flipbox.min.js',
	'jquery.mobile.datebox.calbox.js',
	'jquery.mobile.datebox.datebox.js',
	'jquery.mobile.datebox.slidebox.js',
	'jquery.mobile.datebox.timebox.js',
	'jquery.mobile.datebox.flipbox.js',
	'jquery.mobile.datebox.durationbox.js');

$slugtext = "/*\n * jQuery Mobile Framework : plugin to provide a date and time picker.\n * Copyright (c) JTSage\n * CC 3.0 Attribution.  May be relicensed without permission/notifcation.\n * https://github.com/jtsage/jquery-mobile-datebox\n */\n";

if ( $javapath eq '' ) {
	die "Java not found, can not continue\n";
}

if ( $ARGV[0] ) {
	
	if ( $ARGV[0] eq 'clean' ) {
		print "Cleaning up old javascript files... ";
		foreach ( @files ) {
			unlink($_);
		}
		print "DONE.\n";
	}
	elsif ( $ARGV[0] eq 'min' ) {
		print "Making just main script... \n";
		make_master();
	}
	elsif ( $ARGV[0] eq 'all' ) {
		if ( defined($ARGV[1]) ) {
			$version = "-".$ARGV[1];
		}
		print "Making all usual variants... ($version)\n";
		
		make_datebox();
		make_calbox();
		make_slidebox();
		make_timebox();
		make_durbox();
		make_flipbox();
		make_master();
		$last = (stat "../js/jquery.mobile.datebox.js")[9];
		open OUTFILE, ">current_build.txt";
		print OUTFILE $last;
		close OUTFILE;
		print "BUILD FINISHED.\n";
	}
	elsif ( $ARGV[0] eq 'check' ) {
		$last = (stat "../js/jquery.mobile.datebox.js")[9];
		$lastmod = ( stat "current_build.txt" )[9];
		$allhere = 1;
		$allcurrent = 1;
		open INFILE, "<current_build.txt";
		@lines = <INFILE>;
		close INFILE;
		if ( $lines[0] != $last ) { 
			print "Built Scripts are OLD, run './make.pl all'\n";
		} else {
			foreach ( @files ) {
				if ( ! -e $_ ) { $allhere = 0; }
			}
			if ( !$allhere ) {
				print "Some Scripts are MISSING, run './make.pl all'\n"; 
			} else {
				foreach ( @files ) {
					$thismod = ( stat $_ )[9];
					if ( $thismod > $lastmod ) { $allcurrent = 0; }
				}
				if ( !$allcurrent ) {
					print "Some Scripts appear modified since last build, run ./make.pl all\n";
				} else {
					print "Build scripts appear to be CURRENT.\n";
				}
			}
		}
	}
	else {
		show_usage();
	}
	
} else {
	show_usage();
}

sub show_usage {
	print "\nDateBox Build Script\n";
	print "--------------------\n";
	print "Targets: (./make.pl <target>)\n";
	print " all   :-: Build all scripts\n";
	print " usage :-: Show this information\n";
	print " min   :-: Only minimize main script\n";
	print " clean :-: Clean the build directory\n";
	print " check :-: Check build status of scripts\n\n";
}

sub make_master {
	print "Build :-: Combinded Script... ";
	if ( $version ne '' ) {
		system("cp", "../js/jquery.mobile.datebox.js", "jquery.mobile.datebox".$version.".js");
		system("cp", "../css/jquery.mobile.datebox.css", "jquery.mobile.datebox".$version.".css");
	}
	print "compressing... ";
	system($javapath, "-jar", "../external/yuicompressor-2.4.6.jar", "-o", "./jquery.mobile.datebox".$version.".min.js", "../js/jquery.mobile.datebox.js");
	print "DONE.\n";
	print "Build :-: CSS File... ";
	print "compressing... ";
	system($javapath, "-jar", "../external/yuicompressor-2.4.6.jar", "-o", "./jquery.mobile.datebox".$version.".min.css", "../css/jquery.mobile.datebox.css");
	do_slug("./jquery.mobile.datebox".$version.".min.js");
	print "DONE.\n";
}

sub do_slug {
	local @ARGV = ($_[0]);
	local $^I = '.bac';
	while(<>){
		if ($. == 1) {
			print "$slugtext$/";
			print;
		} else {
			print;
		}
	}
}

sub make_durbox {
	print "Build :-: DurationBox Only... ";
	open INFILE, "<", "../js/jquery.mobile.datebox.js";
	open OUTFILE, ">", "jquery.mobile.datebox.durationbox".$version.".js";
	my @lines = <INFILE>;
	my $file = join("", @lines);
	foreach ( 'TIMEBOX', 'DATEBOX', 'FLIPBOX', 'SLIDEBOX', 'CALBOX', 'DATETIME' ) {
		$file =~ s#BEGIN:$_ \*/.+?/\* END:$_#CLIP:$_#sg;
	}
	$file =~ s#/\* BUILD:MODE \*/#o.mode = 'durationbox'#;
	print OUTFILE $file;
	print "compressing... ";
	system($javapath, "-jar", "../external/yuicompressor-2.4.6.jar", "-o", "./jquery.mobile.datebox.durationbox".$version.".min.js", "jquery.mobile.datebox.durationbox".$version.".js");
	print "DONE.\n";
	close INFILE; close OUTFILE;
	do_slug("./jquery.mobile.datebox.durationbox".$version.".min.js");
}

sub make_slidebox {
	print "Build :-: SlideBox Only... ";
	open INFILE, "<", "../js/jquery.mobile.datebox.js";
	open OUTFILE, ">", "jquery.mobile.datebox.slidebox".$version.".js";
	my @lines = <INFILE>;
	my $file = join("", @lines);
	foreach ( 'TIMEBOX', 'DATEBOX', 'DURATIONBOX', 'CALBOX', 'DATETIME', 'FLIPBOX' ) {
		$file =~ s#BEGIN:$_ \*/.+?/\* END:$_#CLIP:$_#sg;
	}
	$file =~ s#/\* BUILD:MODE \*/#o.mode = 'slidebox'#;
	print OUTFILE $file;
	print "compressing... ";
	system($javapath, "-jar", "../external/yuicompressor-2.4.6.jar", "-o", "./jquery.mobile.datebox.slidebox".$version.".min.js", "jquery.mobile.datebox.slidebox".$version.".js");
	print "DONE.\n";
	close INFILE; close OUTFILE;
	do_slug("./jquery.mobile.datebox.slidebox".$version.".min.js");
}

sub make_flipbox {
	print "Build :-: FlipBox Only... ";
	open INFILE, "<", "../js/jquery.mobile.datebox.js";
	open OUTFILE, ">", "jquery.mobile.datebox.flipbox".$version.".js";
	my @lines = <INFILE>;
	my $file = join("", @lines);
	foreach ( 'TIMEBOX', 'DATEBOX', 'DURATIONBOX', 'SLIDEBOX', 'DATETIME', 'CALBOX' ) {
		$file =~ s#BEGIN:$_ \*/.+?/\* END:$_#CLIP:$_#sg;
	}
	print OUTFILE $file;
	print "compressing... ";
	system($javapath, "-jar", "../external/yuicompressor-2.4.6.jar", "-o", "./jquery.mobile.datebox.flipbox".$version.".min.js", "jquery.mobile.datebox.flipbox".$version.".js");
	print "DONE.\n";
	close INFILE; close OUTFILE;
	do_slug("./jquery.mobile.datebox.flipbox".$version.".min.js");
}

sub make_calbox {
	print "Build :-: CalBox Only... ";
	open INFILE, "<", "../js/jquery.mobile.datebox.js";
	open OUTFILE, ">", "jquery.mobile.datebox.calbox".$version.".js";
	my @lines = <INFILE>;
	my $file = join("", @lines);
	foreach ( 'TIMEBOX', 'DATEBOX', 'DURATIONBOX', 'SLIDEBOX', 'DATETIME', 'FLIPBOX' ) {
		$file =~ s#BEGIN:$_ \*/.+?/\* END:$_#CLIP:$_#sg;
	}
	$file =~ s#/\* BUILD:MODE \*/#o.mode = 'calbox'#;
	print OUTFILE $file;
	print "compressing... ";
	system($javapath, "-jar", "../external/yuicompressor-2.4.6.jar", "-o", "./jquery.mobile.datebox.calbox".$version.".min.js", "jquery.mobile.datebox.calbox".$version.".js");
	print "DONE.\n";
	close INFILE; close OUTFILE;
	do_slug("./jquery.mobile.datebox.calbox".$version.".min.js");
}

sub make_timebox {
	print "Build :-: TimeBox Only... ";
	open INFILE, "<", "../js/jquery.mobile.datebox.js";
	open OUTFILE, ">", "jquery.mobile.datebox.timebox".$version.".js";
	my @lines = <INFILE>;
	my $file = join("", @lines);
	foreach ( 'CALBOX', 'DATEBOX', 'DURATIONBOX', 'SLIDEBOX', 'FLIPBOX' ) {
		$file =~ s#BEGIN:$_ \*/.+?/\* END:$_#CLIP:$_#sg;
	}
	$file =~ s#/\* BUILD:MODE \*/#o.mode = 'timebox'#;
	print OUTFILE $file;
	print "compressing... ";
	system($javapath, "-jar", "../external/yuicompressor-2.4.6.jar", "-o", "./jquery.mobile.datebox.timebox".$version.".min.js", "jquery.mobile.datebox.timebox".$version.".js");
	print "DONE.\n";
	close INFILE; close OUTFILE;
	do_slug("./jquery.mobile.datebox.timebox".$version.".min.js");
}

sub make_datebox {
	print "Build :-: DateBox Only... ";
	open INFILE, "<", "../js/jquery.mobile.datebox.js";
	open OUTFILE, ">", "jquery.mobile.datebox.datebox".$version.".js";
	my @lines = <INFILE>;
	my $file = join("", @lines);
	foreach ( 'TIMEBOX', 'CALBOX', 'DURATIONBOX', 'SLIDEBOX', 'FLIPBOX' ) {
		$file =~ s#BEGIN:$_ \*/.+?/\* END:$_#CLIP:$_#sg;
	}
	$file =~ s#/\* BUILD:MODE \*/#o.mode = 'datebox'#;
	print OUTFILE $file;
	print "compressing... ";
	system($javapath, "-jar", "../external/yuicompressor-2.4.6.jar", "-o", "./jquery.mobile.datebox.datebox".$version.".min.js", "jquery.mobile.datebox.datebox".$version.".js");
	print "DONE.\n";
	close INFILE; close OUTFILE;
	do_slug("./jquery.mobile.datebox.datebox".$version.".min.js");
}

