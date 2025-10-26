---
layout: default
title: Accueil
permalink: /
description: Location de sonorisation et jeux de lumière à Espiet et en Gironde. Packs prêts à l’emploi, livraison par zones, installation en option.
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
      {% when 'spark' %}{% assign icon_char = '✨' %}
      {% when 'beam' %}{% assign icon_char = '🔆' %}
      {% when 'shield' %}{% assign icon_char = '🛡' %}
      {% when 'wave' %}{% assign icon_char = '🌊' %}
      {% else %}{% assign icon_char = '🎵' %}
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
        <h2>Livraison & installation autour de {{ site.delivery.base_city }}</h2>
        <p class="muted">Des zones tarifaires claires, installation en option dès {{ site.delivery.install_price_from_eur }} € et assistance pendant votre événement.</p>
      </div>
      <div class="note">
        <ul>
          {% for tier in site.delivery.tiers %}
          <li><strong>{{ tier.label }}</strong> — {{ tier.radius_km }} km · {{ tier.price_eur }} €</li>
          {% endfor %}
        </ul>
        <p class="muted">Retrait gratuit sur rendez-vous à {{ site.delivery.base_city }}.</p>
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
        <div id="map" class="map"
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
        <a class="button button--primary" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Réserver ce pack</a>
      </li>
      {% endfor %}
    </ul>
    <div class="section-actions">
      <a class="button button--ghost" href="{{ '/packs/' | relative_url }}">Voir tous les packs</a>
      <a class="button button--primary" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Demander une disponibilité</a>
    </div>
  </div>
</section>

{% assign process = site.home.process %}
{% if process %}
<section class="section">
  <div class="container">
    <div class="section-header">
      <h2>{{ process.title }}</h2>
      <p class="muted">Un accompagnement complet, de la réservation à la reprise du matériel.</p>
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

{% assign video = site.home.video %}
<section class="section">
  <div class="container split-grid">
    <div>
      <div class="section-header">
        <h2>Plongez dans l’ambiance</h2>
        <p class="muted">{{ video.caption }}</p>
      </div>
      <div class="video-frame">
        <iframe title="Playlist YouTube" src="{{ video.playlist_url }}" loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
      </div>
    </div>
    <div class="note">
      <h3>Besoin d’un pack sur mesure ?</h3>
      <p>Expliquez-nous votre lieu, le nombre d’invités et l’ambiance souhaitée. Nous préparons une configuration sono & lumière sur mesure.</p>
      <a class="button button--ghost" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Envoyer votre brief</a>
    </div>
  </div>
</section>

{% assign testimonials = site.home.testimonials %}
{% if testimonials.items %}
<section class="section">
  <div class="container">
    <div class="section-header">
      <h2>{{ testimonials.title }}</h2>
      <p class="muted">Des mariages, anniversaires et événements pros qui passent en mode club.</p>
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
