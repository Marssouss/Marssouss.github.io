---
layout: default
title: Catalogue
description: Catalogue de matériel audio et lumière disponible à la location.
---

{% assign catalogue = site.data.catalogue %}
{% assign categories = catalogue.categories %}
{% assign empty_array = '' | split: '' %}

<section class="section catalogue-hero">
  <div class="container">
    <div class="section-header">
      <h1>Catalogue &amp; médias</h1>
      <p class="muted">{{ catalogue.intro }}</p>
    </div>
    <div class="cat-toolbar">
      <div class="search">
        <label class="sr-only" for="catSearch">Rechercher un matériel</label>
        <input id="catSearch" type="search" placeholder="Rechercher un matériel, un pack ou un effet…" autocomplete="off">
      </div>
      <div class="filters" id="catFilters">
        <button type="button" class="chip is-active" data-filter="*">Tout</button>
        {% for category in categories %}
        <button type="button" class="chip" data-filter="{{ category.name | slugify }}">{{ category.name }}</button>
        {% endfor %}
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="catalogue-grid">
      <div id="catGrid" data-empty="Aucun matériel ne correspond à votre recherche pour le moment.">
        {% for category in categories %}
          {% assign cat_slug = category.name | slugify %}
          {% if category.showcases %}
            {% for showcase in category.showcases %}
              {%- assign first_photo = nil -%}
              {%- assign has_photos = showcase.photos and showcase.photos.size > 0 -%}
              {%- if has_photos -%}
                {%- assign first_photo_obj = showcase.photos[0] -%}
                {%- if first_photo_obj.src contains '://' -%}
                  {%- assign first_photo = first_photo_obj.src -%}
                {%- else -%}
                  {%- assign first_photo = first_photo_obj.src | relative_url -%}
                {%- endif -%}
              {%- endif -%}
              {%- capture searchable -%}
                {{ category.name }}
                {{ showcase.summary }}
                {%- if showcase.details -%}
                  {%- for detail in showcase.details -%}
                    {{ detail.title }} {{ detail.text }}
                  {%- endfor -%}
                {%- endif -%}
                {%- if showcase.specs -%}
                  {{ showcase.specs | join: ' ' }}
                {%- endif -%}
              {%- endcapture -%}
              {% assign detail_id = 'details-' | append: cat_slug | append: '-' | append: showcase.name | slugify %}
              <article class="card" data-category="{{ cat_slug }}" data-title="{{ showcase.name | escape }}" data-model="{{ showcase.summary | default: category.name | escape }}" data-tags="{{ searchable | strip | strip_newlines | escape }}">
                <div class="card-media">
                  {% if showcase.video_embed %}
                  <button type="button" class="video-thumb" data-youtube="{{ showcase.video_embed }}" aria-label="Lire la vidéo {{ showcase.name }}">
                    {% if first_photo %}
                    <img src="{{ first_photo }}" alt="{{ showcase.name }} - aperçu vidéo">
                    {% endif %}
                    <span class="play" aria-hidden="true">▶</span>
                  </button>
                  {% elsif has_photos %}
                  <div class="carousel" data-count="{{ showcase.photos.size }}">
                    <div class="carousel-track">
                      {% for photo in showcase.photos %}
                        {% if photo.src contains '://' %}
                          {% assign photo_src = photo.src %}
                        {% else %}
                          {% assign photo_src = photo.src | relative_url %}
                        {% endif %}
                        <div class="slide">
                          <img src="{{ photo_src }}" alt="{{ photo.alt | default: showcase.name | escape }}">
                        </div>
                      {% endfor %}
                    </div>
                    {% if showcase.photos.size > 1 %}
                    <button class="carousel-nav prev" type="button" aria-label="Photo précédente">‹</button>
                    <button class="carousel-nav next" type="button" aria-label="Photo suivante">›</button>
                    {% endif %}
                  </div>
                  {% else %}
                  <div class="card-media__placeholder">
                    <span aria-hidden="true">📦</span>
                    <p>Aucun visuel disponible pour le moment.</p>
                  </div>
                  {% endif %}
                </div>
                <div class="card-body">
                  <header class="card-head">
                    <span class="badge">{{ category.name }}</span>
                    <h3 class="card-title">{{ showcase.name }}</h3>
                  </header>
                  {% if showcase.summary %}
                  <p class="card-summary">{{ showcase.summary }}</p>
                  {% endif %}
                  {% if showcase.specs %}
                  <div class="card-specs">
                    {% for spec in showcase.specs %}
                    <span class="tag">{{ spec }}</span>
                    {% endfor %}
                  </div>
                  {% endif %}
                  {% if showcase.details %}
                  <div class="card-details" id="{{ detail_id }}" hidden>
                    {% for detail in showcase.details %}
                      {% if detail.title or detail.text %}
                      <article class="card-detail">
                        {% if detail.title %}<h4>{{ detail.title }}</h4>{% endif %}
                        {% if detail.text %}<p>{{ detail.text }}</p>{% endif %}
                      </article>
                      {% endif %}
                    {% endfor %}
                  </div>
                  {% endif %}
                  <div class="card-actions">
                    {% if showcase.details %}
                    <button class="button button--ghost"
                            type="button"
                            data-action="toggle-details"
                            data-target="{{ detail_id }}"
                            data-label-open="Voir les détails"
                            data-label-close="Masquer les détails"
                            aria-expanded="false">Voir les détails</button>
                    {% endif %}
                    {% if has_photos %}
                    <button class="button button--ghost" type="button"
                            data-action="open-showcase"
                            data-showcase-title="{{ showcase.name | escape }}"
                            data-showcase-summary="{{ showcase.summary | default: '' | escape }}"
                            data-showcase-details="{{ showcase.details | default: empty_array | jsonify | escape }}"
                            data-showcase-specs="{{ showcase.specs | default: empty_array | jsonify | escape }}"
                            data-showcase-photos="{{ showcase.photos | default: empty_array | jsonify | escape }}">Voir la galerie</button>
                    {% endif %}
                    {% if showcase.video_embed %}
                    <a class="button button--primary open-video" href="{{ showcase.video_embed }}">Voir la vidéo</a>
                    {% endif %}
                  </div>
                </div>
              </article>
            {% endfor %}
          {% endif %}
        {% endfor %}
      </div>
    </div>
  </div>
</section>

<dialog id="ytDialog" class="yt-dialog" aria-labelledby="ytDialogTitle">
  <div class="yt-frame-wrap">
    <h3 id="ytDialogTitle" class="sr-only">Lecture de la vidéo</h3>
    <iframe id="ytFrame" title="Vidéo de démonstration" src="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    <button class="yt-close" type="button" aria-label="Fermer la vidéo">×</button>
  </div>
</dialog>

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
