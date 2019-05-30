## Adding Frameworks

Adding a framework to DateBox actually isn't all that time consuming.

This document will cover what the framework file needs to contain. You should 1000% use one of the existing frameworks as a base, particularly the bootstrap v4 as it's my development base.

Note that the distibution of datebox no contains a "noframe" version, which has an absolute minimum of added classes and styles to ease this process.

This document will not cover adding new theme options to the docs or adding the framework to the build.  If you do significant work, and want help becuase you can't follow my mess of a Gruntfile or the YAML docs, feel free to push just the framework, and the maintainer will be happy to help out.

For testing, take a look at the load order in the work folder.  Because DateBox uses a custom builder, it does not have an autoloader.

### Options

The __mergeOpts()__ function at the top of the framework file can be used to create new options, or override existing ones.  The options you define will take precedence over the defaults in the rest of DateBox

### Functions

This is a list of options that you __MUST__ define.  Note that you can alter the number of arguments you expect to be less than what will be supplied, but can not alter the order of them.

This list now resides in the jsDoc documentation.

<a href="../jsdoc/JTSageDateBox.styleFunctions.html">Read more...</a>
