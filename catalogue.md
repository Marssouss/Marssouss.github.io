---
layout: default
title: Catalogue
description: Catalogue de matériel audio et lumière disponible à la location.
---

<section class="section">
  <div class="container">
    <div class="section-header">
      <h1>Catalogue matériel</h1>
      <p class="muted">{{ site.catalogue.intro }}</p>
    </div>
    {% for category in site.catalogue.categories %}
    <div class="section-block">
      <h2>{{ category.name }}</h2>
      <ul class="cards">
        {% for item in category.items %}
        <li class="card">
          <h3>{{ item.name }}</h3>
          <p class="muted">{{ item.description }}</p>
          <p class="price">{{ item.price_per_day }} {{ site.pricing.currency }} <span class="muted">/ jour</span></p>
          <a class="button button--ghost" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Réserver</a>
        </li>
        {% endfor %}
      </ul>
    </div>
    {% endfor %}
    <div class="section-actions">
      <a class="button button--primary" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Demander un devis personnalisé</a>
    </div>
  </div>
</section>
