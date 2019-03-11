## Option Demos

The pages linked below are a per-mode page that include a fair cross section of the available configuration options for that mode.  Not included in these pages are any of the i18n modes, at least for the time being.  The sole i18n option demoed is below, for the dateFormat option with a calbox.

#### Individual Modes:

 * [calbox](../optDemo-calbox/)



#### dateFormat demo

<div class="form-group">
	<label><strong>dateFormat (overrideDateFormat)</strong></label>
	<input class="form-control demopick" data-link="db" data-opt="overrideDateFormat" value="" placeholder="">
	<small class="form-text text-muted">Format for returned date<br><strong>Sample: </strong>%-m/%-d/%y</small>
</div>
<div class="form-group">
	<label for="db">CalBox</label>
	<input class="form-control" id="db" type="text" data-role="datebox" data-options='{"mode":"calbox","displayMode":"inline"}' />
</div>

