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
    <ul class="cards pack-grid">
      {% for pack in site.data.packs.items %}
      <li class="card pack-card">
        <div class="pack-card__header">
          <div>
            <h3>{{ pack.title }}</h3>
            {% if pack.tagline %}<p class="muted">{{ pack.tagline }}</p>{% endif %}
          </div>
          <div class="pack-card__meta">
            {% if pack.capacity %}<span class="list-pill">{{ pack.capacity }}</span>{% endif %}
            {% if pack.weekend_price %}
            <p class="price">{{ pack.weekend_price }} {{ site.pricing.currency }} <span class="muted">forfait week-end</span></p>
            {% endif %}
          </div>
        </div>
        {% if pack.description %}<p class="muted">{{ pack.description }}</p>{% endif %}
        {% if pack.includes %}
        <h4>Comprend</h4>
        <ul class="pack-card__includes">
          {% for include in pack.includes %}
            {% assign include_label = include.label | default: include %}
            {% assign include_href = include.href %}
            {% if include_href %}
              {% if include_href contains '://' %}
                {% assign include_url = include_href %}
              {% else %}
                {% assign include_url = include_href | relative_url %}
              {% endif %}
              <li><a href="{{ include_url }}">{{ include_label }}</a></li>
            {% else %}
              <li>{{ include_label }}</li>
            {% endif %}
          {% endfor %}
        </ul>
        {% endif %}
        {% if pack.notes %}
        <ul class="pack-card__notes muted">
          {% for note in pack.notes %}
          <li>{{ note }}</li>
          {% endfor %}
        </ul>
        {% endif %}
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
