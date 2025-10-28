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
      {% assign content_id = pack.id | default: 'pack-' | append: forloop.index | append: '-content' %}
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
          <footer class="pack-card__footer">
            <a class="button button--primary" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Demander ce pack</a>
            {% if first_include_href %}
            <a class="button button--outline" href="{{ first_include_href }}">
              Voir le matériel
              {% if first_include_label %}<span class="sr-only">: {{ first_include_label }}</span>{% endif %}
            </a>
            {% else %}
            <a class="button button--ghost" href="{{ '/catalogue/' | relative_url }}">Explorer le catalogue</a>
            {% endif %}
          </footer>
        </article>
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
