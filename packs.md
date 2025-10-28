---
layout: default
title: Packs
description: Packs sono et lumière prêts à l’emploi pour soirées, mariages et événements.
---

<section class="section">
  <div class="container">
    <div class="section-header">
      <h1>Packs sono & lumière</h1>
      <p class="muted">{{ site.data.packs.intro }}</p>
    </div>
    <ul class="cards">
      {% for pack in site.data.packs.items %}
      <li class="card">
        <h3>{{ pack.title }}</h3>
        <p class="muted">{{ pack.description }}</p>
        <span class="list-pill">{{ pack.duration }}</span>
        <p class="price">{{ pack.price_per_day }} {{ site.pricing.currency }} <span class="muted">/ jour</span></p>
        <p class="muted">Week-end : {{ pack.weekend_price }} {{ site.pricing.currency }}</p>
        <ul>
          {% for item in pack.includes %}
          <li>{{ item | markdownify | strip_newlines }}</li>
          {% endfor %}
        </ul>
        <a class="button button--primary" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Demander ce pack</a>
      </li>
      {% endfor %}
    </ul>
    <div class="note">
      <h3>Infos pratiques</h3>
      <p>{{ site.pricing.weekend }}</p>
      <p>{{ site.pricing.caution_policy }}</p>
      <p>{{ site.pricing.notes }}</p>
    </div>
  </div>
</section>
