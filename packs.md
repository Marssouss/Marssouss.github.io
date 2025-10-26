---
layout: default
title: Packs
description: Packs sono et lumière prêts à l’emploi pour soirées, mariages et événements.
---

# Packs

<ul class="cards">
  {% for pack in site.data.packs %}
  <li class="card">
    <h3>{{ pack.title }}</h3>
    <p class="muted">{{ pack.description }}</p>
    <ul>
      {% for item in pack.items %}
      <li>{{ item }}</li>
      {% endfor %}
    </ul>
    <p><strong>{{ pack.price_per_day }} {{ site.pricing.currency }}</strong> / jour — **{{ pack.weekend_price }} {{ site.pricing.currency }}** week-end</p>
    <a class="btn" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Réserver</a>
  </li>
  {% endfor %}
</ul>
