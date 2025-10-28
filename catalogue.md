---
layout: default
title: Catalogue
description: Catalogue de matériel audio et lumière disponible à la location.
---

<section class="section">
  <div class="container">
    <div class="section-header">
      <h1>Catalogue & médias</h1>
      <p class="muted">{{ site.data.catalogue.intro }}</p>
    </div>
    {% for category in site.data.catalogue.categories %}
    <div class="section-block" id="{{ category.name | slugify }}">
      <h2>{{ category.name }}</h2>
      {% if category.video_gallery %}
      <div class="section-subheader">
        {% if category.video_gallery.title %}<h3>{{ category.video_gallery.title }}</h3>{% endif %}
        {% if category.video_gallery.intro %}<p class="muted">{{ category.video_gallery.intro }}</p>{% endif %}
      </div>
      {% endif %}
      {% if category.showcases %}
      <div class="media-grid">
        {% for showcase in category.showcases %}
        {% assign first_photo = nil %}
        {% if showcase.photos and showcase.photos.size > 0 %}
          {% assign first_photo_obj = showcase.photos[0] %}
          {% if first_photo_obj.src contains '://' %}
            {% assign first_photo = first_photo_obj.src %}
          {% else %}
            {% assign first_photo = first_photo_obj.src | relative_url %}
          {% endif %}
        {% endif %}
        <article class="media-card media-card--modern">
          <div class="media-card__header">
            {% if showcase.video_embed %}
            <div class="media-card__video">
              <div class="media-card__video-inner">
                <iframe
                  title="{{ showcase.name | default: 'Vidéo de démonstration' }}"
                  src="{{ showcase.video_embed }}"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                  referrerpolicy="strict-origin-when-cross-origin"></iframe>
              </div>
            </div>
            {% elsif first_photo %}
            <button class="media-card__visual" type="button" data-fullscreen-src="{{ first_photo }}" data-fullscreen-alt="{{ showcase.name | escape }}">
              <img src="{{ first_photo }}" alt="{{ showcase.name }}">
              <span class="media-card__visual-cta">Voir en plein écran</span>
            </button>
            {% endif %}
            {% if showcase.photos %}
            <div class="media-card__carousel" data-carousel>
              <button class="media-card__nav media-card__nav--prev" type="button" data-carousel-prev aria-label="Photo précédente">‹</button>
              <div class="media-card__viewport">
                {% for photo in showcase.photos %}
                {% if photo.src contains '://' %}
                  {% assign photo_src = photo.src %}
                {% else %}
                  {% assign photo_src = photo.src | relative_url %}
                {% endif %}
                <figure class="media-card__slide{% if forloop.first %} is-active{% endif %}" data-index="{{ forloop.index0 }}">
                  <img src="{{ photo_src }}" alt="{{ photo.alt | default: showcase.name }}">
                  {% if photo.caption %}<figcaption>{{ photo.caption }}</figcaption>{% endif %}
                </figure>
                {% endfor %}
              </div>
              <button class="media-card__nav media-card__nav--next" type="button" data-carousel-next aria-label="Photo suivante">›</button>
              <div class="media-card__indicators">
                {% for photo in showcase.photos %}
                <button type="button" class="media-card__dot{% if forloop.first %} is-active{% endif %}" data-carousel-dot data-index="{{ forloop.index0 }}" aria-label="Aller à la photo {{ forloop.index }}"></button>
                {% endfor %}
              </div>
            </div>
            {% endif %}
          </div>
          <div class="media-card__body">
            <div class="media-card__text">
              <h3>{{ showcase.name }}</h3>
              {% if showcase.summary %}
              <p class="muted">{{ showcase.summary }}</p>
              {% endif %}
              {% if showcase.specs %}
              <ul class="media-card__specs">
                {% for spec in showcase.specs %}
                <li>{{ spec }}</li>
                {% endfor %}
              </ul>
              {% endif %}
            </div>
            <div class="media-card__actions">
              {% if showcase.photos %}
              <button class="button button--outline" type="button"
                      data-action="open-showcase"
                      data-showcase-title="{{ showcase.name | escape }}"
                      data-showcase-summary="{{ showcase.summary | default: "" | escape }}"
                      data-showcase-details="{{ showcase.details | default: "" | jsonify | escape }}"
                      data-showcase-specs="{{ showcase.specs | default: "" | jsonify | escape }}"
                      data-showcase-photos="{{ showcase.photos | jsonify | escape }}">Voir les photos en grand</button>
              {% endif %}
            </div>
          </div>
        </article>
        {% endfor %}
      </div>
      {% endif %}
      {% if category.items %}
      <ul class="cards">
        {% for item in category.items %}
        <li class="card">
          <h3>{{ item.name }}</h3>
          <p class="muted">{{ item.description }}</p>
        </li>
        {% endfor %}
      </ul>
      {% endif %}
    </div>
    {% endfor %}
    <div class="section-actions">
      <a class="button button--primary" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Demander un devis personnalisé</a>
    </div>
  </div>
</section>

<div class="media-modal" data-media-modal hidden>
  <div class="media-modal__backdrop" data-media-close></div>
  <div class="media-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="media-modal-title">
    <button class="media-modal__close" type="button" data-media-close aria-label="Fermer la galerie">&times;</button>
    <h3 id="media-modal-title" data-media-title></h3>
      <div class="media-modal__layout">
        <div class="media-modal__grid" data-media-gallery></div>
        <aside class="media-modal__info">
          <p class="muted media-modal__summary" data-media-summary></p>
          <div class="media-modal__details" data-media-details></div>
          <ul class="media-modal__specs" data-media-specs></ul>
        </aside>
      </div>
  </div>
</div>
