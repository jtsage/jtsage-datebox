#!/usr/bin/python

# jQuery Mobile Framework : plugin to provide a date and time picker.
# Copyright (c) JTSage
# CC 3.0 Attribution.  May be relicensed without permission/notifcation.
# https://github.com/jtsage/jquery-mobile-datebox
#
# Translation tool - homespun

import time

transName = raw_input("Please enter your name: ")
transEmail = raw_input("Please enter your e-mail: ")
transLang = raw_input("Language code to produce?: ")

transFile = "./jquery.mobile.datebox.i8n."+transLang+".js."+str(int(time.time()))
f = open(transFile, 'w');

f.write("/*\n * jQuery Mobile Framework : plugin to provide a date and time picker.\n * Copyright (c) JTSage\n * CC 3.0 Attribution.  May be relicensed without permission/notifcation.\n * https://github.com/jtsage/jquery-mobile-datebox\n *\n")
f.write(" * Translation by: "+transName+" <"+transEmail+">\n */\n\n")
f.write("jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {\n\t'"+transLang+"': {\n")

f.write("\t\tsetDateButtonLabel: '"+raw_input("Set Date Button Label <Set Date> : ")+"',\n")
f.write("\t\tsetTimeButtonLabel: '"+raw_input("Set Time Button Label <Set Time> : ")+"',\n")
f.write("\t\tsetDurationButtonLabel: '"+raw_input("Set Duration Button Label <Set Duration> : ")+"',\n")
f.write("\t\tcalTodayButtonLabel: '"+raw_input("Set 'Jump to Today' Button Label <Jump to Today> : ")+"',\n")
f.write("\t\ttitleDateDialogLabel: '"+raw_input("Set Date Dialog Title <Set Date> : ")+"',\n")
f.write("\t\ttitleTimeDialogLabel: '"+raw_input("Set Time Dialog Title <Set Time> : ")+"',\n")
f.write("\t\tdaysOfWeek: ['" +
	raw_input("Day of Week 0 <Sunday> : ")+"','"+
	raw_input("Day of Week 1 <Monday> : ")+"','"+
	raw_input("Day of Week 2 <Tueday> : ")+"','"+
	raw_input("Day of Week 3 <Wednesday> : ")+"','"+
	raw_input("Day of Week 4 <Thursday> : ")+"','"+
	raw_input("Day of Week 5 <Friday> : ")+"','"+
	raw_input("Day of Week 6 <Saturday> : ")+"'],\n")
f.write("\t\tdaysOfWeekShort: ['" +
	raw_input("Short Day of Week 0 <Su> : ")+"','"+
	raw_input("Short Day of Week 1 <Mo> : ")+"','"+
	raw_input("Short Day of Week 2 <Tu> : ")+"','"+
	raw_input("Short Day of Week 3 <We> : ")+"','"+
	raw_input("Short Day of Week 4 <Th> : ")+"','"+
	raw_input("Short Day of Week 5 <Fr> : ")+"','"+
	raw_input("Short Day of Week 6 <Sa> : ")+"'],\n")
f.write("\t\tmonthsOfYear: ['" +
	raw_input("Month of Year 1 <January> : ")+"','"+
	raw_input("Month of Year 2 <February> : ")+"','"+
	raw_input("Month of Year 3 <March> : ")+"','"+
	raw_input("Month of Year 4 <April> : ")+"','"+
	raw_input("Month of Year 5 <May> : ")+"','"+
	raw_input("Month of Year 6 <June> : ")+"','"+
	raw_input("Month of Year 7 <July> : ")+"','"+
	raw_input("Month of Year 8 <August> : ")+"','"+
	raw_input("Month of Year 9 <September> : ")+"','"+
	raw_input("Month of Year 10 <October> : ")+"','"+
	raw_input("Month of Year 11 <Novemeber> : ")+"','"+
	raw_input("Month of Year 12 <December> : ")+"'],\n")
f.write("\t\tmonthsOfYearShort: ['" +
	raw_input("Short Month of Year 1 <Jan> : ")+"','"+
	raw_input("Short Month of Year 2 <Feb> : ")+"','"+
	raw_input("Short Month of Year 3 <Mar> : ")+"','"+
	raw_input("Short Month of Year 4 <Apr> : ")+"','"+
	raw_input("Short Month of Year 5 <May> : ")+"','"+
	raw_input("Short Month of Year 6 <Jun> : ")+"','"+
	raw_input("Short Month of Year 7 <Jul> : ")+"','"+
	raw_input("Short Month of Year 8 <Aug> : ")+"','"+
	raw_input("Short Month of Year 9 <Sep> : ")+"','"+
	raw_input("Short Month of Year 10 <Oct> : ")+"','"+
	raw_input("Short Month of Year 11 <Nov> : ")+"','"+
	raw_input("Short Month of Year 12 <Dec> : ")+"'],\n")
f.write("\t\tdurationLabel: ['" +
	raw_input("Duration label for Days <Days> : ")+"','"+
	raw_input("Duration label for Hours <Hours> : ")+"','"+
	raw_input("Duration label for Minutes <Minutes> : ")+"','"+
	raw_input("Duration label for Seconds <Seconds> : ")+"'],\n")
f.write("\t\tdurationDays: ['" +
	raw_input("Duration output for 1 Day <Day> : ")+"','"+
	raw_input("Duration output for 2+ Days <Days> : ")+"'],\n")
f.write("\t\ttimeFormat: "+raw_input("Is clock 12 or 24 hour? <24> : ")+",\n")
f.write("\t\tdateFieldOrder: "+raw_input("Date field order prefered <['m', 'd', 'y']> : ")+",\n")
f.write("\t\ttimeFieldOrder: "+raw_input("Time field order prefered <['h', 'i', 'a']> : ")+",\n")
f.write("\t\tslideFieldOrder: "+raw_input("Slide field order prefered <['y', 'm', 'd']> : ")+",\n")
f.write("\t\theaderFormat: '"+raw_input("Format for date header <ddd, mmm dd, YYYY> : ")+"',\n")
f.write("\t\tuseArabicIndic: "+raw_input("Does this language use Arabic-Indic (Eastern Arabic) numerals? <false> : ")+"\n")
f.write("\t\tisRTL: "+raw_input("Does text flow Right-To-Left in this language? <false> : ")+"\n")
f.write("});\n");
f.write("jQuery.extend(jQuery.mobile.datebox.prototype.options, {\n\tuseLang: '"+transLang+"': });\n")
