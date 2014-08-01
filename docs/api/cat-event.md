---
title: Triggers and Listeners
layout: apicat
sect: cat2
---

# {{ page.title }}

<ul data-role="listview" data-inset="true">
	{% for docu in site.pages %}
	{% if docu.layout == "event" %}
		<li><a href="{{site.basesite}}{{docu.url | remove_first: "/" }}"><h2>{{docu.title}}</h2><p>{{docu.short}}</p></a></li>
	{% endif %}
	{% if docu.layout == "event" %}
		<li><a href="{{site.basesite}}{{docu.url | remove_first: "/" }}"><h2>{{docu.title}}</h2><p>{{docu.short}}</p></a></li>
	{% endif %}
	{% endfor %}
</ul>
