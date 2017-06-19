---
title: Display Modifiers
pagenum: 8
layout: doc
---

# Display Mode Options

This page is intended to give you all of the associated options for each open mode.

## General Options

There are a few "every mode" options available - they will seem familiar from the base jQM.

 - {% api_doc transition %} : The transition to use for display, jqm default: <em>'pop'</em>, bootstrap default: <em>'fade'</em>
 - {% api_doc useAnimation %} : Enable transition animations, default: <em>true</em>
 - {% api_doc zindex %} : The Z-Index of the control, default: <em>1100</em>

## Bootstrap Options

By default, the display of bootstrap is responsive, it will roll down from the input on large displays, and show in a modal for small displays.

Take a look at these options:

 - {% api_doc bootstrapResponsive %} : choose display mode based on window (device) size.  Set to false to force a mode
 - {% api_doc bootstrapDropdown %} : Use the dropdown version of the display
 - {% api_doc bootstrapDropdownRight %} : When using the dropdown, position on the right (true) or the left (false)
 - {% api_doc bootstrapModal %} : Show the control in a popup modal.  Note that bootstrap.js is required for this to work.

For reference, the modal option will override the dropdown

## jQM Built-In Popup

The jQM Builtin Popup has a few more options. They are:

 - {% api_doc popupForceX %} : Force X Position of popup
 - {% api_doc popupForceY %} : Force Y Position of popup
 - {% api_doc popupPosition %} : Position over a named element
 - {% api_doc useModal %} : Use faded modal background for control (cannot be changed post-init)
 - {% api_doc useModalTheme %} : Background swatch for modal display

Leaving popup position set to false will center the popup over the input *if it has
a named id*, otherwise it will center in the window.

You must set it to 'origin' to use the X/Y coordinates (or rather, should you supply X/Y coordinates, 
it will auto-set to 'origin')


## Inline, and Inline-Blind

At this time, these modes have no additional options associated with them - see next page for somewhat
associated options though.
