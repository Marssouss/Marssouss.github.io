---
layout: default
title: Accueil
permalink: /
description: Location de sonorisation et jeux de lumière en Gironde. Packs prêts à l'emploi, livraison par zones et installation sur demande.
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

<section class="home-hero">
  <div class="home-hero__sky" aria-hidden="true">
    <span class="home-hero__orb home-hero__orb--one"></span>
    <span class="home-hero__orb home-hero__orb--two"></span>
    <span class="home-hero__orb home-hero__orb--three"></span>
  </div>
  <div class="container home-hero__grid">
    <div class="home-hero__copy">
      {% if hero.eyebrow %}<p class="home-hero__eyebrow">{{ hero.eyebrow }}</p>{% endif %}
      {% if hero.highlight_badge %}<span class="badge badge--glow home-hero__badge">{{ hero.highlight_badge }}</span>{% endif %}
      <h1>{{ hero.title }}</h1>
      <p class="home-hero__subtitle">{{ hero.subtitle }}</p>
      <div class="home-hero__actions">
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
      {% if hero.stats %}
      <ul class="home-hero__stats">
        {% for stat in hero.stats %}
        <li>
          <span class="home-hero__stat-value">{{ stat.value }}</span>
          <span class="home-hero__stat-label">{{ stat.label }}</span>
        </li>
        {% endfor %}
      </ul>
      {% endif %}
    </div>
    <div class="home-hero__visual">
      <div class="home-hero__visual-frame">
        {% if hero_src %}
        <img src="{{ hero_src }}" alt="{{ hero.title }}">
        {% else %}
        <div class="home-hero__visual-placeholder" aria-hidden="true"></div>
        {% endif %}
        <div class="home-hero__floating-card">
          <p class="home-hero__floating-eyebrow">Support 7j/7</p>
          <p>Briefing personnalisé, assistance à distance et reprise programmée.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section home-highlights">
  <div class="container">
    <div class="section-header section-header--center">
      <h2>{{ site.branding.differentiators.title }}</h2>
      <p class="muted">{{ site.description }}</p>
    </div>
    <div class="home-highlights__grid">
      {% for feature in site.branding.features %}
      <article class="home-highlight-card">
        <h3>{{ feature.title }}</h3>
        <p class="muted">{{ feature.description }}</p>
      </article>
      {% endfor %}
    </div>
  </div>
</section>

{% assign differentiators = site.branding.differentiators.items %}
{% if differentiators %}
<section class="section home-differentiators">
  <div class="container home-differentiators__grid">
    <div class="home-differentiators__intro">
      <h2>{{ site.branding.differentiators.subtitle | default: "Une expérience premium sans stress" }}</h2>
      <p class="muted">{{ site.branding.differentiators.description | default: "De la préparation à la reprise du matériel, nous restons présents sur toute la ligne." }}</p>
    </div>
    <div class="home-differentiators__cards">
      {% for diff in differentiators %}
      {% case diff.icon %}
        {% when 'spark' %}{% assign icon_char = '✨' %}
        {% when 'beam' %}{% assign icon_char = '🔊' %}
        {% when 'shield' %}{% assign icon_char = '🛡️' %}
        {% when 'wave' %}{% assign icon_char = '🌊' %}
        {% else %}{% assign icon_char = '⭐' %}
      {% endcase %}
      <article class="diff-card home-diff-card">
        <span class="home-diff-card__icon" aria-hidden="true">{{ icon_char }}</span>
        <div class="home-diff-card__content">
          <h3>{{ diff.title }}</h3>
          <p class="muted">{{ diff.text }}</p>
        </div>
      </article>
      {% endfor %}
    </div>
  </div>
</section>
{% endif %}

<section class="section home-delivery">
  <div class="container home-delivery__grid">
    <div class="home-delivery__copy">
      <div class="section-header">
        <h2>Livraison &amp; installation</h2>
        <p class="muted">Des zones tarifaires claires, installation sur demande à partir de {{ site.delivery.install_price_from_eur }} € et présence possible le jour J.</p>
      </div>
      <div class="note">
        <ul>
          {% for tier in site.delivery.tiers %}
          <li><strong>{{ tier.label }}</strong> — {{ tier.radius_km }} km — {{ tier.price_eur }} €</li>
          {% endfor %}
        </ul>
        <p class="muted">Retrait gratuit sur rendez-vous.</p>
      </div>
      <div class="section-block">
        <div class="note">
          <h3>Tarifs &amp; conditions</h3>
          <p>{{ site.pricing.weekend }}</p>
          <p>{{ site.pricing.caution_policy }}</p>
          <p>{{ site.pricing.notes }}</p>
        </div>
      </div>
      <div class="home-delivery__cta">
        <a class="button button--primary" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Demander une installation</a>
        <a class="button button--ghost" href="{{ '/services/' | relative_url }}">Voir nos services</a>
      </div>
    </div>
    <div class="map-panel">
      <div class="map-shell">
        <div class="map js-delivery-map" data-map-id="home"
             data-center-lat="{{ site.delivery.center_lat }}"
             data-center-lng="{{ site.delivery.center_lng }}"
             data-tiers='{{ site.delivery.tiers | jsonify }}'
             data-city="{{ site.delivery.base_city }}">
          <noscript>Activez JavaScript pour afficher la carte des zones de livraison.</noscript>
        </div>
        <p class="muted map-caption">Pour toute demande hors zone, merci de me contacter directement.</p>
      </div>
    </div>
  </div>
</section>

<section class="section home-packs">
  <div class="container">
    <div class="section-header section-header--center">
      <h2>Nos packs populaires</h2>
      <p class="muted">{{ site.data.packs.intro }}</p>
    </div>
    <ul class="pack-grid" role="list">
      {% for pack in site.data.packs.items %}
      {% assign first_include = pack.includes | first %}
      {% assign first_include_href = nil %}
      {% assign first_include_label = nil %}
      {% if first_include %}
        {% assign first_include_label = first_include.label | default: first_include %}
        {% assign maybe_href = first_include.href | default: nil %}
        {% if maybe_href %}
          {% if maybe_href contains '://' %}
            {% assign first_include_href = maybe_href %}
          {% else %}
            {% assign first_include_href = maybe_href | relative_url %}
          {% endif %}
        {% endif %}
      {% endif %}
      {% assign content_id = pack.id | default: 'pack-' | append: forloop.index | append: '-content-home' %}
      <li>
        <article class="pack-card" data-pack-card data-pack-open="true">
          <header class="pack-card__header">
            <div class="pack-card__heading">
              <span class="pack-card__index">Pack {{ forloop.index }}</span>
              <h3>{{ pack.title }}</h3>
              {% if pack.tagline %}<p class="pack-card__tagline muted">{{ pack.tagline }}</p>{% endif %}
            </div>
            {% if pack.capacity %}
            <span class="pack-card__capacity">{{ pack.capacity }}</span>
            {% endif %}
          </header>
          <div class="pack-card__body">
            {% if pack.weekend_price %}
            <div class="pack-card__price">
              <span class="pack-card__price-label">Forfait week-end</span>
              <span class="pack-card__price-value">{{ pack.weekend_price }} {{ site.pricing.currency }}</span>
            </div>
            {% endif %}
            {% if pack.description %}
            <p class="pack-card__description">{{ pack.description }}</p>
            {% endif %}
            {% if pack.includes %}
            <div class="pack-card__divider" aria-hidden="true"></div>
            <div class="pack-card__features" id="{{ content_id }}" data-pack-content>
              <h4>Compris dans le pack</h4>
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
                    <li><a class="pack-chip" href="{{ include_url }}">{{ include_label }}</a></li>
                  {% else %}
                    <li><span class="pack-chip">{{ include_label }}</span></li>
                  {% endif %}
                {% endfor %}
              </ul>
              {% if pack.notes %}
              <ul class="pack-card__notes">
                {% for note in pack.notes %}
                <li>{{ note }}</li>
                {% endfor %}
              </ul>
              {% endif %}
            </div>
            <button class="pack-card__toggle" type="button" data-pack-toggle aria-expanded="false" aria-controls="{{ content_id }}">
              <span data-pack-toggle-label>Voir le détail</span>
              <span class="pack-card__chevron" aria-hidden="true"></span>
            </button>
            {% endif %}
          </div>
          <footer class="pack-card__footer"></footer>
        </article>
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
<section class="section home-process">
  <div class="container">
    <div class="section-header section-header--center">
      <h2>{{ process.title }}</h2>
      <p class="muted">Un accompagnement complet, de la réservation à la reprise du matériel.</p>
    </div>
    <div class="process-steps home-process__steps">
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
<section class="section home-testimonials">
  <div class="container">
    <div class="section-header section-header--center">
      <h2>{{ testimonials.title }}</h2>
      <p class="muted">Mariages, anniversaires et événements pros : ils racontent leur expérience.</p>
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

<section class="home-cta">
  <div class="container">
    <div class="home-cta__card">
      <div class="home-cta__content">
        <h2>Prêt à faire vibrer votre événement&nbsp;?</h2>
        <p class="muted">Choisissez votre matériel, on s'occupe de la logistique et de votre tranquillité d'esprit.</p>
      </div>
      <div class="home-cta__actions">
        <a class="button button--primary" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Réserver un créneau</a>
        <a class="button button--ghost" href="{{ '/catalogue/' | relative_url }}">Explorer le catalogue</a>
      </div>
    </div>
  </div>
</section>
