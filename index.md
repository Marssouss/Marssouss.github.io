---
layout: default
title: Accueil
permalink: /
description: Location de sonorisation et jeux de lumiÃ¨re en Gironde. Packs prÃªts Ã  l'emploi, livraison par zones et installation sur demande.
---

{% assign hero = site.branding.hero %}
{% assign hero_image = hero.image %}
{% if hero_image %}
  {% if hero_image contains '://' %}
    {% assign hero_src = hero_image %}
  {% else %}
    {% assign hero_src = hero_image | relative_url %}
  {% endif %}
{% endif %}

<section class="hero">
  <div class="container hero-inner">
    <div class="hero-copy">
      {% if hero.eyebrow %}<p class="eyebrow">{{ hero.eyebrow }}</p>{% endif %}
      {% if hero.highlight_badge %}<span class="badge badge--glow">{{ hero.highlight_badge }}</span>{% endif %}
      <h1>{{ hero.title }}</h1>
      <p>{{ hero.subtitle }}</p>
      <div class="hero-actions">
        {% if hero.ctas.primary %}
          {% assign primary_url = hero.ctas.primary.url %}
          {% unless hero.ctas.primary.external %}
            {% assign primary_url = hero.ctas.primary.url | relative_url %}
          {% endunless %}
          <a class="button button--primary" href="{{ primary_url }}" {% if hero.ctas.primary.external %}target="_blank" rel="noopener"{% endif %}>{{ hero.ctas.primary.label }}</a>
        {% endif %}
        {% if hero.ctas.secondary %}
          {% assign secondary_url = hero.ctas.secondary.url %}
          {% unless hero.ctas.secondary.external %}
            {% assign secondary_url = hero.ctas.secondary.url | relative_url %}
          {% endunless %}
          <a class="button button--ghost" href="{{ secondary_url }}" {% if hero.ctas.secondary.external %}target="_blank" rel="noopener"{% endif %}>{{ hero.ctas.secondary.label }}</a>
        {% endif %}
        {% if hero.ctas.catalogue %}
          {% assign catalogue_url = hero.ctas.catalogue.url %}
          {% unless hero.ctas.catalogue.external %}
            {% assign catalogue_url = hero.ctas.catalogue.url | relative_url %}
          {% endunless %}
          <a class="button button--outline" href="{{ catalogue_url }}" {% if hero.ctas.catalogue.external %}target="_blank" rel="noopener"{% endif %}>{{ hero.ctas.catalogue.label }}</a>
        {% endif %}
      </div>
    </div>
    <div class="hero-visual">
      <div class="hero-visual__frame">
        {% if hero_src %}
        <div class="hero-visual__image">
          <img src="{{ hero_src }}" alt="{{ hero.title }}">
        </div>
        {% else %}
        <div class="hero-visual__image hero-visual__image--placeholder" aria-hidden="true"></div>
        {% endif %}
        {% if hero.stats %}
        <ul class="stat-group">
          {% for stat in hero.stats %}
          <li>
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </li>
          {% endfor %}
        </ul>
        {% endif %}
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-header">
      <h2>{{ site.branding.differentiators.title }}</h2>
      <p class="muted">{{ site.description }}</p>
    </div>
    <div class="feature-grid">
      {% for feature in site.branding.features %}
      <article class="feature-card">
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
      </article>
      {% endfor %}
    </div>
  </div>
</section>

{% assign differentiators = site.branding.differentiators.items %}
{% if differentiators %}
<section class="section">
  <div class="container differentiators">
    {% for diff in differentiators %}
    {% case diff.icon %}
      {% when 'spark' %}{% assign icon_char = 'âœ¨' %}
      {% when 'beam' %}{% assign icon_char = 'ðŸ”†' %}
      {% when 'shield' %}{% assign icon_char = 'ðŸ›¡' %}
      {% when 'wave' %}{% assign icon_char = 'ðŸŒŠ' %}
      {% else %}{% assign icon_char = 'ðŸŽµ' %}
    {% endcase %}
    <article class="diff-card">
      <span class="diff-icon" aria-hidden="true">{{ icon_char }}</span>
      <h3>{{ diff.title }}</h3>
      <p class="muted">{{ diff.text }}</p>
    </article>
    {% endfor %}
  </div>
</section>
{% endif %}

<section class="section">
  <div class="container split-grid">
    <div>
      <div class="section-header">
        <h2>Livraison & installation</h2>
        <p class="muted">Des zones tarifaires claires, installation sur demande &agrave; partir de {{ site.delivery.install_price_from_eur }} &euro; et pr&eacute;sence possible le jour J.</p>
      </div>
      <div class="note">
        <ul>
          {% for tier in site.delivery.tiers %}
          <li><strong>{{ tier.label }}</strong> - {{ tier.radius_km }} km &mdash; {{ tier.price_eur }} &euro;</li>
          {% endfor %}
        </ul>
        <p class="muted">Retrait gratuit sur rendez-vous.</p>
      </div>
      <div class="section-block">
        <div class="note">
          <h3>Tarifs & conditions</h3>
          <p>{{ site.pricing.weekend }}</p>
          <p>{{ site.pricing.caution_policy }}</p>
          <p>{{ site.pricing.notes }}</p>
        </div>
      </div>
    </div>
    <div>
      <div class="map-shell">
        <div class="map js-delivery-map" data-map-id="home"
             data-center-lat="{{ site.delivery.center_lat }}"
             data-center-lng="{{ site.delivery.center_lng }}"
             data-tiers='{{ site.delivery.tiers | jsonify }}'
             data-city="{{ site.delivery.base_city }}">
          <noscript>Activez JavaScript pour afficher la carte des zones de livraison.</noscript>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-header">
      <h2>Nos packs populaires</h2>
      <p class="muted">{{ site.packs.intro }}</p>
    </div>
    <ul class="cards">
      {% for pack in site.packs.items %}
      <li class="card">
        <h3>{{ pack.title }}</h3>
        <p class="muted">{{ pack.description }}</p>
        <span class="list-pill">{{ pack.duration }}</span>
        <p class="price">{{ pack.price_per_day }} {{ site.pricing.currency }} <span class="muted">/ jour</span></p>
        <p class="muted">Week-end : {{ pack.weekend_price }} {{ site.pricing.currency }}</p>
        <ul>
          {% for item in pack.includes %}
          <li>{{ item }}</li>
          {% endfor %}
        </ul>
        <a class="button button--primary" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">RÃ©server ce pack</a>
      </li>
      {% endfor %}
    </ul>
    <div class="section-actions">
      <a class="button button--ghost" href="{{ '/packs/' | relative_url }}">Voir tous les packs</a>
      <a class="button button--primary" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Demander une disponibilitÃ©</a>
    </div>
  </div>
</section>

{% assign process = site.home.process %}
{% if process %}
<section class="section">
  <div class="container">
    <div class="section-header">
      <h2>{{ process.title }}</h2>
      <p class="muted">Un accompagnement complet, de la rÃ©servation Ã  la reprise du matÃ©riel.</p>
    </div>
    <div class="process-steps">
      {% for step in process.steps %}
      <article class="process-step">
        <h3>{{ step.title }}</h3>
        <p class="muted">{{ step.description }}</p>
      </article>
      {% endfor %}
    </div>
  </div>
</section>
{% endif %}

{% assign testimonials = site.home.testimonials %}
{% if testimonials.items %}
<section class="section">
  <div class="container">
    <div class="section-header">
      <h2>{{ testimonials.title }}</h2>
      <p class="muted">Des mariages, anniversaires et Ã©vÃ©nements pros qui passent en mode club.</p>
    </div>
    <div class="testimonials">
      {% for item in testimonials.items %}
      <blockquote class="testimonial">
        <p>{{ item.quote }}</p>
        <strong>{{ item.author }}</strong>
      </blockquote>
      {% endfor %}
    </div>
  </div>
</section>
{% endif %}






