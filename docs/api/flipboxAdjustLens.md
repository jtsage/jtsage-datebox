---
title: flipboxAdjustLens
short: After-calculation of "lens" for flip modes
modes: [
	'flipbox',
	'timeflipbox',
]
cats: [ 'control' ]
relat: "control"
layout: api
defval: "false"
dattype: "Integer"
dyn: "True"
---

An adjustment, in pixels to move the lens on the flipbox modes, *after* the calculation to find center.

Sometimes, external themes don't play nicely and you'll need a few pixels either way - in particular, 
the default bootstrap4 theme needs 5 pixels positive (hardcoded), while most of the 3rd party color themes
for bootstrap4 do not require any movement (set it to zero).

