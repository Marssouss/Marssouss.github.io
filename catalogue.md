---
layout: default
title: Catalogue
description: Catalogue de materiel audio et lumiere disponible a la location.
---

<section class="section">
  <div class="container">
    <div class="section-header">
      <h1>Catalogue & medias</h1>
      <p class="muted">{{ site.catalogue.intro }}</p>
    </div>
    {% for category in site.catalogue.categories %}
    <div class="section-block">
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
        <article class="media-card">
          <div class="video-frame">
            <iframe
              title="{{ showcase.name | default: 'Video de demonstration' }}"
              src="{{ showcase.video_embed }}"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              referrerpolicy="strict-origin-when-cross-origin"></iframe>
          </div>
          <div class="media-card__body">
            <h3>{{ showcase.name }}</h3>
            {% if showcase.description %}<p class="muted">{{ showcase.description }}</p>{% endif %}
            <div class="media-card__actions">
              <button class="button button--outline" type="button"
                      data-action="open-showcase"
                      data-showcase-title="{{ showcase.name }}"
                      data-showcase-photos='{{ showcase.photos | jsonify }}'>Voir les photos</button>
              <a class="button button--ghost" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Demander un devis</a>
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
          <a class="button button--ghost" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Demander un devis</a>
        </li>
        {% endfor %}
      </ul>
      {% endif %}
    </div>
    {% endfor %}
    <div class="section-actions">
      <a class="button button--primary" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Demander un devis personnalise</a>
    </div>
  </div>
</section>

<div class="media-modal" data-media-modal hidden>
  <div class="media-modal__backdrop" data-media-close></div>
  <div class="media-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="media-modal-title">
    <button class="media-modal__close" type="button" data-media-close aria-label="Fermer la galerie">&times;</button>
    <h3 id="media-modal-title" data-media-title></h3>
    <div class="media-modal__grid" data-media-gallery></div>
  </div>
</div>
