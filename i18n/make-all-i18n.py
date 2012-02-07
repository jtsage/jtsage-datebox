#!/usr/bin/python

# jQuery Mobile Framework : plugin to provide a date and time picker.
# Copyright (c) JTSage
# CC 3.0 Attribution.  May be relicensed without permission/notifcation.
# https://github.com/jtsage/jquery-mobile-datebox
#
# Translation tool - gotta make em all.

import sys
import os
import subprocess

def listdirs(folder):
	return [d for d in os.listdir(folder) if os.path.isdir(os.path.join(folder, d))]

langs = listdirs('./po')

for x in langs:
	p = subprocess.Popen('./generate-i18n.py', env={'LANG': x}, shell=True, stdout=subprocess.PIPE)
	utfFile = "./genny/jquery.mobile.datebox.i8n."+x+".utf8.js"
	ascFile = "./genny/jquery.mobile.datebox.i8n."+x+".asc.js"
	af = open(ascFile, 'w');
	uf = open(utfFile, 'w');
	for line in p.stdout.readlines():
		af.write(line.decode('utf-8').encode('ascii', 'xmlcharrefreplace'))
		uf.write(line)
	retval = p.wait()
	

