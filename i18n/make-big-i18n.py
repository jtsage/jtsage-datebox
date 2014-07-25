#!/usr/bin/python

# jQuery Mobile Framework : plugin to provide a date and time picker.
# Copyright (c) JTSage
# CC 3.0 Attribution.  May be relicensed without permission/notifcation.
# https://github.com/jtsage/jquery-mobile-datebox
#
# Translation tool - one big file.

import sys
import os
import subprocess

def listdirs(folder):
	return [d for d in os.listdir(folder) if os.path.isdir(os.path.join(folder, d))]

langs = listdirs('./locale')

utFile = "./genny/jqm-datebox.lang.utf8.js"
uf = open(utFile, 'w');
uf.write("/*\n * jQuery Mobile Framework : plugin to provide a date and time picker.\n * Copyright (c) JTSage\n * CC 3.0 Attribution.  May be relicensed without permission/notifcation.\n * https://github.com/jtsage/jquery-mobile-datebox\n *\n */\n\n")
uf.write("jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {\n")

for x in langs:
	p = subprocess.Popen('./generate-i18n.py', env={'LANG': x, 'LMODE': 'False'}, shell=True, stdout=subprocess.PIPE)
	for line in p.stdout.readlines():
		uf.write(line)
	retval = p.wait()
	
uf.write("});\n")
uf.write("jQuery.extend(jQuery.mobile.datebox.prototype.options, {\n\tuseLang: 'en'\n});\n")
		

