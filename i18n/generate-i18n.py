#!/usr/bin/python

# jQuery Mobile Framework : plugin to provide a date and time picker.
# Copyright (c) JTSage
# CC 3.0 Attribution.  May be relicensed without permission/notifcation.
# https://github.com/jtsage/jquery-mobile-datebox
#
# Translation tool - homespun

import sys, gettext, os, translators


gettext.install('datebox', './locale', unicode=1)

def doTrans(lang,name):
	outtext = "/*\n * jQuery Mobile Framework : plugin to provide a date and time picker.\n * Copyright (c) JTSage\n * CC 3.0 Attribution.  May be relicensed without permission/notifcation.\n * https://github.com/jtsage/jquery-mobile-datebox\n *\n * Translation by: "+name+"\n *\n */\n\n"
	outtext += "jQuery.extend(jQuery.mobile.datebox.prototype.options.lang, {\n"
	outtext += "\t'" + lang + "': {\n"
	outtext += "\t\tsetDateButtonLabel: '" + _('Set Date') + "',\n"
	outtext += "\t\tsetTimeButtonLabel: '" + _('Set Time') + "',\n"
	outtext += "\t\tsetDurationButtonLabel: '" + _('Set Duration') + "',\n"
	outtext += "\t\tcalTodayButtonLabel: '" + _('Jump to Today') + "',\n"
	outtext += "\t\ttitleDateDialogLabel: '" + _('Set Date') + "',\n"
	outtext += "\t\ttitleTimeDialogLabel: '" + _('Set Time') + "',\n"
	outtext += "\t\tdaysOfWeek: ['" + _('Sunday') + "', '" + _('Monday') + "', '" + _('Tuesday') + "', '" + _('Wednesday') + "', '" + _('Thursday') + "', '" + _('Friday') + "', '" + _('Saturday') + "'],\n"
	outtext += "\t\tdaysOfWeekShort: ['" + _('Su') + "', '" + _('Mo') + "', '" + _('Tu') + "', '" + _('We') + "', '" + _('Th') + "', '" + _('Fr') + "', '" + _('Sa') + "'],\n"
	outtext += "\t\tmonthsOfYear: ['" + _('January') + "', '" + _('February') + "', '" + _('March') + "', '" + _('April') + "', '" + _('May') + "', '" + _('June') + "', '" + _('July') + "', '" + _('August') + "', '" + _('September') + "', '" + _('October') + "', '" + _('November') + "', '" + _('December') + "'],\n"
	outtext += "\t\tmonthsOfYearShort: ['" + _('Jan') + "', '" + _('Feb') + "', '" + _('Mar') + "', '" + _('Apr') + "', '" + _('Ma') + "', '" + _('Jun') + "', '" + _('Jul') + "', '" + _('Aug') + "', '" + _('Sep') + "', '" + _('Oct') + "', '" + _('Nov') + "', '" + _('Dec') + "'],\n"
	outtext += "\t\tdurationLabel: ['" + _('Days') + "', '" + _('Hours') + "', '" + _('Minutes') + "', '" + _('Seconds') + "'],\n"
	outtext += "\t\tdurationDays: ['" + _('Day') + "', '" + _('Days') + "'],\n"
	outtext += "\t\ttooltip: '" + _('Open Date Picker') + "',\n"
	outtext += "\t\tnextMonth: '" + _('Next Month') + "',\n"
	outtext += "\t\tprevMonth: '" + _('Previous Month') + "',\n"
	outtext += "\t\ttimeFormat: "+ _('24') + ",\n"
	outtext += "\t\theaderFormat: '" + _('%A, %B %-d, %Y') + "',\n"
	outtext += "\t\tdateFieldOrder: [" + _("'m', 'd', 'y'") + "],\n"
	outtext += "\t\ttimeFieldOrder: [" + _("'h', 'i', 'a'") + "],\n"
	outtext += "\t\tslideFieldOrder: [" + _("'y', 'm', 'd'") + "],\n"
	outtext += "\t\tdateFormat: '" + _('%Y-%m-%d') + "',\n"
	outtext += "\t\tuseArabicIndic: " + _('false1') + ",\n"
	outtext += "\t\tisRTL: " + _('false2') + "\n"
	outtext += "\t}\n});\n"
	outtext += "jQuery.extend(jQuery.mobile.datebox.prototype.options, {\n\tuseLang: '" + lang + "'\n});\n"
	return outtext

try:
	lang = os.environ['LANG']
	if ( translators.trans.has_key(lang) ):
		transname = translators.trans[lang]
	else:
		transname = 'Unknown'
	print doTrans(lang,transname).encode('utf-8')
except KeyError as e:
	print 'Lang not set!'
