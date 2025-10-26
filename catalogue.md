---
layout: default
title: Catalogue
description: Catalogue de matériel audio et lumière disponible à la location.
---

# Catalogue

<ul class="cards">
  {% for g in site.data.gear %}
  <li class="card">
    <img src="{{ g.image | default: '/assets/placeholder-gear.jpg' }}" alt="{{ g.name }}" class="rounded">
    <h3>{{ g.name }}</h3>
    <p class="muted">{{ g.category }}</p>
    <p>{{ g.description }}</p>
    <p><strong>{{ g.price_per_day }} {{ site.pricing.currency }}</strong> / jour</p>
    {% if g.specs %}
    <details>
      <summary>Spécifications</summary>
      <ul>
        {% for s in g.specs %}
        <li>{{ s }}</li>
        {% endfor %}
      </ul>
    </details>
    {% endif %}
    <a class="btn" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Réserver</a>
  </li>
  {% endfor %}
</ul>
