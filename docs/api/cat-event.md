---
title: Triggers and Listeners
layout: apicat
sect: cat2
---

# {{ page.title }}

<div class="row">
	{% assign counter = 0 %}
	{% for docu in site.pages %}
	{% if docu.layout == "event" or docu.layout == "func2" %}
	{% capture counter %}{{ counter | plus : 1 }}{% endcapture %}
	{% capture style %}{% if docu.depre == "true" %} style="color:#ccc;text-decoration:line-through"{% endif %}{% endcapture %}
	<div class="col-sm-4"><div class="panel panel-default">
		<div class="panel-heading">
			<h3 class="panel-title" {{style}}>
				<a href="{{site.basesite}}{{docu.url | remove_first: "/" }}">{{ docu.title }}</a>
			</h3>
		</div>
		<div class="panel-body">
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
