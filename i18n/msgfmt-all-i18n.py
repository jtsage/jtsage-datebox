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

langs = listdirs('./locale')

for x in langs:
	p = subprocess.Popen('/usr/bin/msgfmt ./locale/'+x+'/datebox.po -o ./locale/'+x+'/LC_MESSAGES/datebox.mo', shell=True, stdout=subprocess.PIPE)
	for line in p.stdout.readlines():
		print line,
	retval = p.wait()
	print x,retval
	

