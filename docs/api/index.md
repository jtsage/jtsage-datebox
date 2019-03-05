---
title: API Overview
layout: apicat
sect: none
---

# DateBox Complete Option List
<div class="row">
	{% assign counter = 0 %}
	{% for docu in site.pages %}
	{% if docu.layout == "api" %}
	{% capture style %}{% if docu.depre == "true" %} style="color:#ccc;text-decoration:line-through"{% endif %}{% endcapture %}
	{% capture classy %}{% if docu.relat == "i18n" %}primary{% elsif docu.relat == "limiting" %}warning{% elsif docu.relat == "control" %}success{% elsif docu.relat == "callback" %}danger{% elsif docu.relat == "display" %}info{% else %}default{% endif %}{% endcapture %}
	{% capture counter %}{{ counter | plus : 1 }}{% endcapture %}
	<div class="col-sm-4"><div class="card mb-3">
		<div class="card-header">
			<a class="pull-right btn btn-xs btn-{{ classy }}" href="{{site.basesite}}api/cat-{{docu.relat}}">{{docu.relat}}</a>
			<h5 {{style}}>
				<a href="{{site.basesite}}{{docu.url | remove_first: "/" }}">{{ docu.title }}</a>
			</h5>
		</div>
		<div class="card-body">
			<p>{{docu.short}}</p>
		</div>
	</div></div>
	{% if counter == "3" %}
</div><div class="row">
	{% capture counter %}0{% endcapture %}
	{% endif %}

	{% endif %}
	{% endfor %}
</div>


# Public Functions
<div class="row">
	{% assign counter = 0 %}
	{% for docu in site.pages %}
	{% if docu.layout == "func" or docu.layout == "func2" %}
	{% capture counter %}{{ counter | plus : 1 }}{% endcapture %}
	<div class="col-sm-4"><div class="card mb-3">
		<div class="card-header">
			<a class="pull-right btn btn-xs btn-danger" href="{{site.basesite}}api/cat-public">Function</a>
			<h5 {{style}}>
				<a href="{{site.basesite}}{{docu.url | remove_first: "/" }}">{{ docu.title }}</a>
			</h5>
		</div>
		<div class="card-body">
			<p>{{docu.short}}</p>
		</div>
	</div></div>
	{% if counter == "3" %}
</div><div class="row">
	{% capture counter %}0{% endcapture %}
	{% endif %}

	{% endif %}
	{% endfor %}
</div>


# Listeners and Triggers

<div class="row">
	{% assign counter = 0 %}
	{% for docu in site.pages %}
	{% if docu.layout == "event" or docu.layout == "func2" %}
	{% capture counter %}{{ counter | plus : 1 }}{% endcapture %}
	<div class="col-sm-4"><div class="card mb-3">
		<div class="card-header">
			<a class="pull-right btn btn-xs btn-info" href="{{site.basesite}}api/cat-event">Event</a>
			<h5 {{style}}>
				<a href="{{site.basesite}}{{docu.url | remove_first: "/" }}">{{ docu.title }}</a>
			</h5>
		</div>
		<div class="card-body">
			<p>
			{% if docu.layout == "func2" %}{{ docu.short2 }}{% else %}{{ docu.short }}{% endif %}
			</p>
		</div>
	</div></div>
	{% if counter == "3" %}
</div><div class="row">
	{% capture counter %}0{% endcapture %}
	{% endif %}
	
	{% endif %}
	{% endfor %}
</div>

