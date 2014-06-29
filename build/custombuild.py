#!/usr/bin/python

import argparse
import subprocess as sp
import re
import os
import sys
import time

parser = argparse.ArgumentParser(description='Make a custom datebox build');
parser.add_argument('-v', '--verbose', action="store_true", help="Verbose mode", dest="verbose", default=True);
parser.add_argument('-q', '--quiet', action="store_false", help="Verbose mode", dest="verbose");
parser.add_argument('-f', '--file', action="store", help="File to output (jqm-datebox)", dest="filename", default="jqm-datebox");
parser.add_argument('--version', action="version", version='%(prog)s 1.0');
parser.add_argument('mods', nargs='+');
args = parser.parse_args();

corefile = "../js/jqm-datebox.core.js";

modfiles = {
	'calbox':'../js/jqm-datebox.mode.calbox.js',
	'datebox':'../js/jqm-datebox.mode.datebox.js',
	'durationbox':'../js/jqm-datebox.mode.durationbox.js',
	'durationflipbox':'../js/jqm-datebox.mode.durationflipbox.js',
	'flipbox':'../js/jqm-datebox.mode.flipbox.js',
	'slidebox':'../js/jqm-datebox.mode.slidebox.js',
	'customflip':'../js/jqm-datebox.mode.customflip.js',
	'custombox':'../js/jqm-datebox.mode.custombox.js',
}
goodargs = ['calbox', 'datebox', 'durationbox', 'durationflipbox', 'flipbox', 'slidebox', 'customflip', 'custombox']

cleanmods = [];

for mod in args.mods :
	if ( mod == 'timebox' ) :
		 cleanmods.append('datebox'); 
	else:
		if ( mod == 'timeflipbox' ) :
			cleanmods.append('flipbox'); 
		else :
			if ( mod in  goodargs ) :
				cleanmods.append(mod); 
			else :
				sys.exit('Unknown module called');

setmods = set(cleanmods);
cleanmods = list(setmods);

if ( len(cleanmods) < 1 ) : sys.exit('No modules to add!');

filelist = [];
filelist.append(corefile);

for mod in cleanmods:
	filelist.append(modfiles[mod]);

javapath = sp.check_output(["which", "java"]);

files = {}

slugtext = "/*\n * jQuery Mobile Framework : plugin to provide a date and time picker.\n * Copyright (c) JTSage\n * CC 3.0 Attribution.  May be relicensed without permission/notification.\n * https://github.com/jtsage/jquery-mobile-datebox\n */\n";
slugtext += "\n/* Custom build: " + ", ".join(cleanmods) + " :: " + time.strftime("%Y-%m-%d %H:%M:%S") + " */\n\n";

print 'jQM-DateBox Build Process'
print '-=-=-=-=-=-=-=-=-=-=-=-=-'
print 'Building Version: ' + ", ".join(cleanmods)

for ifile in filelist:
	if ( args.verbose ):
		print ' - Reading File: ' + re.sub(r'../js/', '', ifile)
	key = re.sub(r'../js/jqm-datebox.', '', ifile)
	key = re.sub(r'.js','',key)
	f = open(ifile, 'r')
	uncomp = f.read();
	f.close();
	if ( args.verbose ): 
		print ' -- Compressing...'
	comp = sp.check_output(javapath.rstrip() + ' -jar ../external/yuicompressor-2.4.6.jar ' + ifile, shell=True);
	if ( args.verbose ): 
		print '  - In Size:  ' + str(len(uncomp)) + ' bytes'
		print '  - Out Size: ' + str(len(comp)) + ' bytes'
	files[key] = (uncomp,comp);

bigfile = open('./'+args.filename+'.js', 'w');
smlfile = open('./'+args.filename+'.min.js', 'w');

if ( args.verbose ):
	print ' - Opening: ./'+args.filename+'.js'
	print ' - Opening: ./'+args.filename+'.min.js'

bigfile.write(slugtext);

if ( args.verbose ):
		print '  -- Writing Portion: core'

bigfile.write(files['core'][0]);
smlfile.write(files['core'][1]);

for key in files:
	if ( key != 'core' ):
		if ( args.verbose ):
			print '  -- Writing Portion: ' + key
		bigfile.write(files[key][0]);
		smlfile.write(files[key][1]);

if ( args.verbose ):
	print ' - Closing: ./'+args.filename+'.js'
	print ' - Closing: ./'+args.filename+'.min.js'

bigfile.close();
smlfile.close();
