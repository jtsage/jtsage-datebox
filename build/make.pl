#!/usr/bin/perl -w

$javapath = `which java`;
chomp $javapath;

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
		print "Making all usual variants...\n";
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
	print "compressing... ";
	system($javapath, "-jar", "../external/yuicompressor-2.4.6.jar", "-o", "./jquery.mobile.datebox.min.js", "../js/jquery.mobile.datebox.js");
	print "DONE.\n";
	print "Build :-: CSS File... ";
	print "compressing... ";
	system($javapath, "-jar", "../external/yuicompressor-2.4.6.jar", "-o", "./jquery.mobile.datebox.min.css", "../css/jquery.mobile.datebox.css");
	print "DONE.\n";
}

sub make_durbox {
	print "Build :-: DurationBox Only... ";
	open INFILE, "<", "../js/jquery.mobile.datebox.js";
	open OUTFILE, ">", "jquery.mobile.datebox.durationbox.js";
	my @lines = <INFILE>;
	my $file = join("", @lines);
	foreach ( 'TIMEBOX', 'DATEBOX', 'FLIPBOX', 'SLIDEBOX', 'CALBOX', 'DATETIME' ) {
		$file =~ s#BEGIN:$_ \*/.+?/\* END:$_#CLIP:$_#sg;
	}
	$file =~ s#/\* BUILD:MODE \*/#o.mode = 'durationbox'#;
	print OUTFILE $file;
	print "compressing... ";
	system($javapath, "-jar", "../external/yuicompressor-2.4.6.jar", "-o", "./jquery.mobile.datebox.durationbox.min.js", "jquery.mobile.datebox.durationbox.js");
	print "DONE.\n";
	close INFILE; close OUTFILE;
}

sub make_slidebox {
	print "Build :-: SlideBox Only... ";
	open INFILE, "<", "../js/jquery.mobile.datebox.js";
	open OUTFILE, ">", "jquery.mobile.datebox.slidebox.js";
	my @lines = <INFILE>;
	my $file = join("", @lines);
	foreach ( 'TIMEBOX', 'DATEBOX', 'DURATIONBOX', 'CALBOX', 'DATETIME', 'FLIPBOX' ) {
		$file =~ s#BEGIN:$_ \*/.+?/\* END:$_#CLIP:$_#sg;
	}
	$file =~ s#/\* BUILD:MODE \*/#o.mode = 'slidebox'#;
	print OUTFILE $file;
	print "compressing... ";
	system($javapath, "-jar", "../external/yuicompressor-2.4.6.jar", "-o", "./jquery.mobile.datebox.slidebox.min.js", "jquery.mobile.datebox.slidebox.js");
	print "DONE.\n";
	close INFILE; close OUTFILE;
}

sub make_flipbox {
	print "Build :-: FlipBox Only... ";
	open INFILE, "<", "../js/jquery.mobile.datebox.js";
	open OUTFILE, ">", "jquery.mobile.datebox.flipbox.js";
	my @lines = <INFILE>;
	my $file = join("", @lines);
	foreach ( 'TIMEBOX', 'DATEBOX', 'DURATIONBOX', 'SLIDEBOX', 'DATETIME', 'CALBOX' ) {
		$file =~ s#BEGIN:$_ \*/.+?/\* END:$_#CLIP:$_#sg;
	}
	print OUTFILE $file;
	print "compressing... ";
	system($javapath, "-jar", "../external/yuicompressor-2.4.6.jar", "-o", "./jquery.mobile.datebox.flipbox.min.js", "jquery.mobile.datebox.flipbox.js");
	print "DONE.\n";
	close INFILE; close OUTFILE;
}

sub make_calbox {
	print "Build :-: CalBox Only... ";
	open INFILE, "<", "../js/jquery.mobile.datebox.js";
	open OUTFILE, ">", "jquery.mobile.datebox.calbox.js";
	my @lines = <INFILE>;
	my $file = join("", @lines);
	foreach ( 'TIMEBOX', 'DATEBOX', 'DURATIONBOX', 'SLIDEBOX', 'DATETIME', 'FLIPBOX' ) {
		$file =~ s#BEGIN:$_ \*/.+?/\* END:$_#CLIP:$_#sg;
	}
	$file =~ s#/\* BUILD:MODE \*/#o.mode = 'calbox'#;
	print OUTFILE $file;
	print "compressing... ";
	system($javapath, "-jar", "../external/yuicompressor-2.4.6.jar", "-o", "./jquery.mobile.datebox.calbox.min.js", "jquery.mobile.datebox.calbox.js");
	print "DONE.\n";
	close INFILE; close OUTFILE;
}

sub make_timebox {
	print "Build :-: TimeBox Only... ";
	open INFILE, "<", "../js/jquery.mobile.datebox.js";
	open OUTFILE, ">", "jquery.mobile.datebox.timebox.js";
	my @lines = <INFILE>;
	my $file = join("", @lines);
	foreach ( 'CALBOX', 'DATEBOX', 'DURATIONBOX', 'SLIDEBOX', 'FLIPBOX' ) {
		$file =~ s#BEGIN:$_ \*/.+?/\* END:$_#CLIP:$_#sg;
	}
	$file =~ s#/\* BUILD:MODE \*/#o.mode = 'timebox'#;
	print OUTFILE $file;
	print "compressing... ";
	system($javapath, "-jar", "../external/yuicompressor-2.4.6.jar", "-o", "./jquery.mobile.datebox.timebox.min.js", "jquery.mobile.datebox.timebox.js");
	print "DONE.\n";
	close INFILE; close OUTFILE;
}

sub make_datebox {
	print "Build :-: DateBox Only... ";
	open INFILE, "<", "../js/jquery.mobile.datebox.js";
	open OUTFILE, ">", "jquery.mobile.datebox.datebox.js";
	my @lines = <INFILE>;
	my $file = join("", @lines);
	foreach ( 'TIMEBOX', 'CALBOX', 'DURATIONBOX', 'SLIDEBOX', 'FLIPBOX' ) {
		$file =~ s#BEGIN:$_ \*/.+?/\* END:$_#CLIP:$_#sg;
	}
	$file =~ s#/\* BUILD:MODE \*/#o.mode = 'datebox'#;
	print OUTFILE $file;
	print "compressing... ";
	system($javapath, "-jar", "../external/yuicompressor-2.4.6.jar", "-o", "./jquery.mobile.datebox.datebox.min.js", "jquery.mobile.datebox.datebox.js");
	print "DONE.\n";
	close INFILE; close OUTFILE;
}

#			print 'Usage'; }
