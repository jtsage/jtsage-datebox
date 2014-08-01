---
title: Option List - CustomBox/CustomFlip
layout: apicat
sect: cat
mode: custom
---

# {{ page.title }}

<ul data-role="listview" data-inset="true">
	{% for docu in site.pages %}
	{% if docu.layout == "api" %}
		{% if docu.relat == page.mode %}
		<li><a href="{{site.basesite}}{{docu.url | remove_first: "/" }}"><h2>{{docu.title}}</h2><p>{{docu.short}}</p></a></li>
		{% endif %}
	{% endif %}
	{% endfor %}
</ul>
