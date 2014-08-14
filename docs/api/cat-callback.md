---
title: Option List - Callbacks
layout: apicat
sect: cat
mode: callback
---

# {{ page.title }}

<ul data-role="listview" data-inset="true">
	{% for docu in site.pages %}
	{% if docu.layout == "api" %}
		{% if docu.relat == page.mode %}
		{% capture style %}{% if docu.depre == "true" %} style="color:#ccc;text-decoration:line-through"{% endif %}{% endcapture %}
		<li><a href="{{site.basesite}}{{docu.url | remove_first: "/" }}"><h2{{style}}>{{docu.title}}</h2><p>{{docu.short}}</p></a></li>
		{% endif %}
	{% endif %}
	{% endfor %}
</ul>
