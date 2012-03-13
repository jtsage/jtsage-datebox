#!/usr/bin/python

from optparse import OptionParser
import subprocess as sp
import re
import os

usage = "usage: %prog [options]";
parser = OptionParser(usage=usage)
parser.add_option('-b', '--build', action="store", help="Set version to build", type="string", default="latest", dest="ver");
parser.add_option('-v', '--verbose', action="store_true", help="Verbose mode", dest="verbose", default=True);
parser.add_option('-q', '--quiet', action="store_false", help="Quiet mode", dest="verbose");

(options, args) = parser.parse_args();

javapath = sp.check_output(["which", "java"]);

infile = [
	'../js/jqm-datebox.core.js',
	'../js/jqm-datebox.mode.calbox.js',
	'../js/jqm-datebox.mode.datebox.js',
	'../js/jqm-datebox.mode.durationbox.js',
	'../js/jqm-datebox.mode.flipbox.js',
	'../js/jqm-datebox.mode.slidebox.js',
]
files = {}

slugtext = "/*\n * jQuery Mobile Framework : plugin to provide a date and time picker.\n * Copyright (c) JTSage\n * CC 3.0 Attribution.  May be relicensed without permission/notifcation.\n * https://github.com/jtsage/jquery-mobile-datebox\n */\n"

print 'jQM-DateBox Build Process'
print '-=-=-=-=-=-=-=-=-=-=-=-=-'
print 'Building Version: ' + options.ver

for ifile in infile:
	if ( options.verbose ):
		print ' - Reading File: ' + re.sub(r'../js/', '', ifile)
	key = re.sub(r'../js/jqm-datebox.', '', ifile)
	key = re.sub(r'.js','',key)
	f = open(ifile, 'r')
	uncomp = f.read();
	f.close();
	if ( options.verbose ): 
		print ' -- Compressing...'
	comp = sp.check_output(javapath.rstrip() + ' -jar ../external/yuicompressor-2.4.6.jar ' + ifile, shell=True);
	if ( options.verbose ): 
		print '  - In Size:  ' + str(len(uncomp)) + ' bytes'
		print '  - Out Size: ' + str(len(comp)) + ' bytes'
	files[key] = (uncomp,comp);
	
if not os.path.exists(options.ver):
	os.makedirs(options.ver)

if ( options.ver != 'latest' ):
	fprefix = 'jqm-datebox-'+options.ver+'.'
else :
	fprefix = 'jqm-datebox.'
		
f = open('../css/jqm-datebox.css','r');
uncomp = f.read();
f.close()
comp = sp.check_output(javapath.rstrip() + ' -jar ../external/yuicompressor-2.4.6.jar ../css/jqm-datebox.css', shell=True);

f = open('./'+options.ver+'/'+fprefix+'css', 'w')
f.write(uncomp)
f.close()
f = open('./'+options.ver+'/'+fprefix+'min.css', 'w')
f.write(slugtext)
f.write(comp)
f.close()

if ( options.verbose ):
		print ' - Writing File:' + fprefix + 'css'
		print ' - Writing File:' +fprefix+ 'min.css'
		
for key in files:
	fname = fprefix+key+'.js'
	fnamem = fprefix+key+'.min.js'
		
	if ( options.verbose ):
		print ' - Writing File:' + fname
		print ' - Writing File:' + fnamem
	
	f = open('./'+options.ver+'/'+fname, 'w')
	f.write(files[key][0])
	f.close()
	f = open('./'+options.ver+'/'+fnamem, 'w')
	f.write(slugtext)
	f.write(files[key][1])
	f.close()
	
	if ( key != 'core' ):
		fnamev = fprefix + 'comp.' + re.sub(r'mode.','',key) + '.js'
		fnamevm = fprefix + 'comp.' + re.sub(r'mode.','',key) + '.min.js'
		
		if ( options.verbose ):
			print ' - Writing File:' + fnamev
			print ' - Writing File:' + fnamevm
		
		f = open('./'+options.ver+'/'+fnamev, 'w')
		f.write(files['core'][0])
		f.write(files[key][0])
		f.close()
		f = open('./'+options.ver+'/'+fnamevm, 'w')
		f.write(slugtext)
		f.write(files['core'][1])
		f.write(files[key][1])
		f.close()




