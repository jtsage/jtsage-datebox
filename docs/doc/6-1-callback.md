---
title: Callbacks / Listeners
pagenum: 16
layout: doc
---

# Callbacks

DateBox provides both and open and close callback hook as an option.  See 
the next page for a bit on usage, and the API documents on usage enviroment.

 - {% api_doc openCallback %} : Callback function to run on control open
 - {% api_doc openCallbackArgs %} : Extra arguments to pass to open callback.
 - {% api_doc closeCallback %} : Callback function to run on control close
 - {% api_doc closeCallbackArgs %} : Extra arguments to pass to close callback.


# Listeners

DateBox also provides a few "global" listeners.  They are:

 - {% api_doc dateboxbeforecreate %} : Triggered on every page if datebox is loaded. Somewhat useless
 - {% api_doc dateboxcreate %} : Triggered when a datebox is enhanced - but thrown prior to initialization. Useful only to check if there *is* a datebox on the page
 - {% api_doc dateboxaftercreate %} : Triggered when after a datebox is enhanced
