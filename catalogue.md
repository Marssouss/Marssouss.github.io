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
    <div class="catalogue-hero__layout">
      <div class="catalogue-hero__intro">
        <div class="section-header">
          <h1>Catalogue &amp; médias</h1>
          <p class="muted">{{ catalogue.intro }}</p>
        </div>
      </div>
      <div class="catalogue-hero__panel" aria-labelledby="catalogue-filters-title">
        <div class="catalogue-hero__panel-inner">
          <div class="catalogue-hero__panel-head">
            <p id="catalogue-filters-title" class="catalogue-hero__title">Filtrez et trouvez en quelques secondes</p>
            <p class="catalogue-hero__hint">Tapez un mot-clé ou parcourez les catégories pour révéler le matériel adapté.</p>
          </div>
          <div class="cat-toolbar">
            <div class="search">
              <label class="sr-only" for="catSearch">Rechercher un matériel</label>
              <div class="search__field">
                <span class="search__icon" aria-hidden="true"></span>
                <input id="catSearch" type="search" placeholder="Rechercher un matériel, un pack ou un effet…" autocomplete="off">
              </div>
            </div>
            <div class="filters" id="catFilters">
              <button type="button" class="chip is-active" data-filter="*">Tout</button>
              {% for category in categories %}
              <button type="button" class="chip" data-filter="{{ category.name | slugify }}">{{ category.name }}</button>
              {% endfor %}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{% assign slides_markup = '' %}
{% assign dots_markup = '' %}
{% assign slide_count = 0 %}
{% for category in categories %}
  {% if category.showcases %}
    {% for showcase in category.showcases %}
      {% if showcase.photos %}
        {% for photo in showcase.photos %}
          {% if photo.src contains '://' %}
            {% assign photo_src = photo.src %}
          {% else %}
            {% assign photo_src = photo.src | relative_url %}
          {% endif %}
          {% assign is_active = slide_count == 0 %}
          {% assign slide_classes = 'action-showcase__slide' %}
          {% if is_active %}
            {% assign slide_classes = slide_classes | append: ' is-active' %}
          {% endif %}
          {% assign slide_id = 'action-slide-' | append: slide_count %}
          {% capture slide %}
<article class="{{ slide_classes }}" id="{{ slide_id }}" data-showcase-slide data-index="{{ slide_count }}" role="group" aria-roledescription="slide" aria-label="{{ category.name }} · {{ showcase.name }}" aria-hidden="{% if is_active %}false{% else %}true{% endif %}" tabindex="{% if is_active %}0{% else %}-1{% endif %}">
  <figure class="action-showcase__media">
    <img src="{{ photo_src }}" alt="{{ photo.alt | default: showcase.name | escape }}">
  </figure>
  <div class="action-showcase__overlay">
    <span class="action-showcase__badge">{{ category.name }}</span>
    <h3 class="action-showcase__title">{{ showcase.name }}</h3>
    {% if showcase.summary %}<p class="action-showcase__caption">{{ showcase.summary }}</p>{% endif %}
  </div>
</article>
          {% endcapture %}
          {% assign slides_markup = slides_markup | append: slide %}
          {% capture dot %}
<button type="button" class="action-showcase__dot{% if is_active %} is-active{% endif %}" data-carousel-dot data-index="{{ slide_count }}" aria-controls="{{ slide_id }}" aria-label="Voir {{ showcase.name }}" aria-pressed="{% if is_active %}true{% else %}false{% endif %}" aria-selected="{% if is_active %}true{% else %}false{% endif %}"></button>
          {% endcapture %}
          {% assign dots_markup = dots_markup | append: dot %}
          {% assign slide_count = slide_count | plus: 1 %}
        {% endfor %}
      {% endif %}
    {% endfor %}
  {% endif %}
{% endfor %}

{% assign has_multiple_slides = slide_count > 1 %}
{% if slide_count > 0 %}
<section class="section action-showcase">
  <div class="container">
    <div class="action-showcase__head">
      <div class="action-showcase__intro">
        <p class="eyebrow">Découvrez nos effets en action</p>
        <h2>Ultra premium, sensations garanties</h2>
        <p class="action-showcase__lede">Plongez dans l’atmosphère de nos installations avant même votre événement. Chaque photo est capturée sur le terrain, avec nos équipes et notre matériel en pleine performance.</p>
      </div>
      <div class="action-showcase__meta">
        <span class="action-showcase__meta-tag">Immersion 360°</span>
        <span class="action-showcase__meta-tag">Mobile-first</span>
        <span class="action-showcase__meta-tag">Ultra responsive</span>
      </div>
    </div>
    <div class="action-showcase__shell" data-showcase-carousel{% if has_multiple_slides %} data-autoplay="6500"{% endif %}>
      <div class="action-showcase__viewport" data-carousel-viewport>
        <div class="action-showcase__track" data-carousel-track>
{{ slides_markup | strip }}
        </div>
      </div>
      {% if has_multiple_slides %}
      <div class="action-showcase__progress" aria-hidden="true">
        <span class="action-showcase__progress-bar" data-carousel-progress></span>
      </div>
      <div class="action-showcase__nav-group">
        <button class="action-showcase__nav action-showcase__nav--prev" type="button" data-carousel-prev aria-label="Afficher l’effet précédent">
          <span aria-hidden="true">‹</span>
          <span class="sr-only">Précédent</span>
        </button>
        <button class="action-showcase__nav action-showcase__nav--next" type="button" data-carousel-next aria-label="Afficher l’effet suivant">
          <span aria-hidden="true">›</span>
          <span class="sr-only">Suivant</span>
        </button>
      </div>
      <div class="action-showcase__dots" role="tablist" data-carousel-dots>
{{ dots_markup | strip }}
      </div>
      {% endif %}
    </div>
  </div>
</section>
{% endif %}

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
