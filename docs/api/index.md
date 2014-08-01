---
title: API Overview
layout: apicat
sect: none
---

# DateBox Complete Option List

<ul data-role="listview" data-autodividers="true" data-filter="true" data-inset="true">
	{% for docu in site.pages %}
	{% if docu.layout == "api" %}
	<li><a href="{{site.basesite}}{{docu.url | remove_first: "/" }}"><h2>{{docu.title}}</h2><p class="ui-li-count">{{docu.relat}}</p><p>{{docu.short}}</p></a></li>
	{% endif %}
	{% endfor %}
</ul>

# Public Functions
<ul data-role="listview" data-inset="true">
	{% for docu in site.pages %}
	{% if docu.layout == "func" %}
	<li><a href="{{site.basesite}}{{docu.url | remove_first: "/" }}"><h2>{{docu.title}}</h2><p>{{docu.short}}</p></a></li>
	{% endif %}
	{% if docu.layout == "func2" %}
	<li><a href="{{site.basesite}}{{docu.url | remove_first: "/" }}"><h2>{{docu.title}}</h2><p>{{docu.short}}</p></a></li>
	{% endif %}
	{% endfor %}
</ul>


# Listeners and Triggers
<ul data-role="listview" data-inset="true">
	{% for docu in site.pages %}
	{% if docu.layout == "event" %}
	<li><a href="{{site.basesite}}{{docu.url | remove_first: "/" }}"><h2>{{docu.title}}</h2><p>{{docu.short}}</p></a></li>
	{% endif %}
	{% if docu.layout == "func2" %}
	<li><a href="{{site.basesite}}{{docu.url | remove_first: "/" }}"><h2>{{docu.title}}</h2><p>{{docu.short2}}</p></a></li>
	{% endif %}
	{% endfor %}
</ul>
