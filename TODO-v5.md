# Refactor TODO:

 - get rid of styleFunction.baseInputButtonFinder, force a "dbOpenButton" class instead.
 - widgetHeader : close --> dbCloser

# "Done" files:

Everything needs love with docs and style.  This is a massive pile of "oh, just add this"

Finished-ish:
 - all the modes
 - boilerplate.js
 - autoInit.js
 - baseObject.js


# Frameworks:

 - jQuery (maybe)
 - jQM (meh. likely)
 - Skeleton (likely)
 - Foundation 6 (very likely)
 - Bulma (very likely)
 - purecss (probably

# Build:

 - there has to be a better way.

 Ideally, send all the files to the builder, frameworks seperate, have it loop through those.  so adding a new framework does not require editing the massive Gruntfile.

# Broken:

 - runOnBlur.  maybe.  need to look at what it's actually supposed to do again.

# Docs:

not even close.  