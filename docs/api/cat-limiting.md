---
title: Option List - Limiting
layout: apicat
sect: cat
mode: limiting
---

# {{ page.title }}

<div class="row">
	{% assign counter = 0 %}
	{% for docu in site.pages %}
	{% if docu.layout == "api" and docu.relat == page.mode %}
	{% capture counter %}{{ counter | plus : 1 }}{% endcapture %}
	{% capture style %}{% if docu.depre == "true" %} style="color:#ccc;text-decoration:line-through"{% endif %}{% endcapture %}
	<div class="col-sm-4"><div class="card mb-3">
		<div class="card-header">
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

