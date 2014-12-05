---
title: Triggers
pagenum: 19
layout: doc
---

# Triggers
Datebox also contains quite a number of triggers and listeners, which are all 
passed as a 'method' of the 'datebox' listener/trigger. Usage of each is 
detailed in the API documentation, but they are:

 - {% api_doc open %} : Send: Open Datebox
 - {% api_doc close %} : Send: Close Datebox
 - {% api_doc doset %} : Send: Refresh input element
 - {% api_doc doclear %} : Send: Clear input element
 - {% api_doc dorefresh %} : Send: Refresh control
 - {% api_doc dooffset %} : Send: Change the date
 - {% api_doc set %} : Send &amp; Receive: Set the date, or date has been set
 - {% api_doc enable %} : Receive: Datebox has been enabled
 - {% api_doc disable %} : Receive: Datebox has been disabled
 - {% api_doc refresh %} : Receive: Datebox has been refreshed
 - {% api_doc clear %} : Receive: Datebox input has been cleared
 - {% api_doc offset %} : Receive: Date has been changed
 - {% api_doc displayChange %} : Receive: Calendar date display has been changed, and selected date is not in currently displayed month.
