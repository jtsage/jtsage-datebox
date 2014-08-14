---
title: API Overview
layout: apicat
sect: none
---

# DateBox Complete Option List
<form class="ui-filterable">
<input id="filter-input" data-type="search">
</form>
<ul data-role="listview" data-filter="true" data-input="#filter-input" data-autodividers="true" data-inset="true">
	{% for docu in site.pages %}
	{% if docu.layout == "api" %}
	{% capture style %}{% if docu.depre == "true" %} style="color:#ccc;text-decoration:line-through"{% endif %}{% endcapture %}
	<li><a href="{{site.basesite}}{{docu.url | remove_first: "/" }}"><h2{{style}}>{{docu.title}}</h2><p class="ui-li-count">{{docu.relat}}</p><p>{{docu.short}}</p></a></li>
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
