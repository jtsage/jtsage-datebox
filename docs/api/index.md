---
title: API Overview
layout: apicat
sect: none
---

# DateBox Complete Option List
<div class="row">
	{% for docu in site.pages %}
	{% if docu.layout == "api" %}
	{% capture style %}{% if docu.depre == "true" %} style="color:#ccc;text-decoration:line-through"{% endif %}{% endcapture %}
	{% capture classy %}{% if docu.relat == "i18n" %}primary{% elsif docu.relat == "limiting" %}warning{% elsif docu.relat == "control" %}success{% elsif docu.relat == "callback" %}danger{% elsif docu.relat == "display" %}info{% else %}default{% endif %}{% endcapture %}
	<div class="col-sm-4"><div class="panel panel-default">
		<div class="panel-heading">
			<a class="pull-right btn btn-xs btn-{{ classy }}" href="{{site.basesite}}api/cat-{{docu.relat}}">{{docu.relat}}</a>
			<h3 class="panel-title" {{style}}>
				<a href="{{site.basesite}}{{docu.url | remove_first: "/" }}">{{ docu.title }}</a>
			</h3>
		</div>
		<div class="panel-body">
			<p>{{docu.short}}</p>
		</div>
	</div></div>
	{% endif %}
	{% endfor %}
</div>

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
