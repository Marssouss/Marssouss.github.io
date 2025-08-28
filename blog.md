---
layout: default
title: Blog
description: Articles techniques sur Talend, Power BI, ETL, DAX, performance et DataOps.
---

<h1>Blog</h1>
<p class="lead">Notes techniques, retours d’expérience et petits guides.</p>

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <small>— {{ post.date | date: "%d %b %Y" }}</small>
    </li>
  {% endfor %}
</ul>
