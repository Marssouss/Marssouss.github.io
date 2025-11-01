---
layout: default
title: Catalogue
permalink: /catalogue/
description: Catalogue du matériel lumière & son — fiches, vidéos et photos.
---

{% assign items = site.data.gear %}
{% if items == nil %}
<div class="container">
  <p class="muted">Le fichier <code>_data/gear.yml</code> est vide. Ajoute-y tes articles pour peupler le catalogue.</p>
</div>
{% endif %}

<section class="catalogue-hero">
  <div class="container">
    <h1>Catalogue matériel</h1>
    <p class="muted">Parcourez les effets lumière, barres LED, stroboscopes, projecteurs PAR, enceintes et accessoires.</p>

    <!-- Barre d'outils -->
    <div class="cat-toolbar">
      <div class="search">
        <input id="catSearch" type="search" placeholder="Rechercher (nom, modèle, tags…)" aria-label="Rechercher dans le catalogue">
      </div>
      <div class="filters" id="catFilters" role="listbox" aria-label="Filtrer par catégorie">
        {% assign allcats = "" | split: "," %}
        {% for it in items %}
          {% if it.category %}
            {% assign allcats = allcats | push: it.category %}
          {% endif %}
        {% endfor %}
        {% assign cats = allcats | uniq | sort_natural %}
        <button class="chip is-active" data-filter="*">Tout</button>
        {% for c in cats %}
        <button class="chip" data-filter="{{ c | escape }}">{{ c }}</button>
        {% endfor %}
      </div>
    </div>
  </div>
</section>

<section class="catalogue-grid">
  <div class="container" id="catGrid" data-empty="Aucun résultat. Essayez un autre mot-clé ou filtre.">
    {% for it in items %}
    {% assign images = it.images | default: empty %}
    {% assign first_img = images[0] | default: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop' %}
    <article class="card" data-title="{{ it.title | downcase }}" data-model="{{ it.model | downcase }}" data-tags="{{ it.tags | join: ' ' | downcase }}" data-category="{{ it.category | downcase }}">
      <div class="card-media">
        <div class="carousel" data-index="0">
          <div class="carousel-track">
            {% if it.video %}
            <div class="slide">
              <button class="video-thumb" data-youtube="{{ it.video | replace: 'watch?v=', 'embed/' | replace: 'youtu.be/', 'www.youtube.com/embed/' }}" aria-label="Lire la vidéo">
                <img src="https://img.youtube.com/vi/{{ it.video | split: 'v=' | last | split: '&' | first | split: '/' | last }}/hqdefault.jpg" alt="Vidéo {{ it.title }}">
                <span class="play">▶</span>
              </button>
            </div>
            {% endif %}
            {% for img in images %}
            <div class="slide">
              <img loading="lazy" src="{{ img }}" alt="{{ it.title }} — image {{ forloop.index }}">
            </div>
            {% endfor %}
          </div>
          {% if it.video or images.size > 1 %}
          <button class="carousel-nav prev" aria-label="Image précédente">‹</button>
          <button class="carousel-nav next" aria-label="Image suivante">›</button>
          {% endif %}
        </div>
      </div>

      <div class="card-body">
        <div class="card-head">
          <h3 class="card-title">{{ it.title }}</h3>
          {% if it.model %}<span class="badge">{{ it.model }}</span>{% endif %}
        </div>

        {% if it.short %}
        <p class="card-text">{{ it.short }}</p>
        {% endif %}

        <ul class="meta">
          {% if it.category %}<li><strong>Catégorie :</strong> {{ it.category }}</li>{% endif %}
          {% if it.power %}<li><strong>Puissance :</strong> {{ it.power }}</li>{% endif %}
          {% if it.source %}<li><strong>Source :</strong> {{ it.source }}</li>{% endif %}
        </ul>

        {% if it.tags %}
        <div class="tags">
          {% for t in it.tags %}
            <span class="tag">{{ t }}</span>
          {% endfor %}
        </div>
        {% endif %}

        <div class="card-actions">
          {% if it.video %}
          <a class="button button--ghost open-video" href="{{ it.video }}" target="_blank" rel="noopener">Voir la vidéo</a>
          {% endif %}
          <a class="button button--primary" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Demander ce matériel</a>
        </div>
      </div>
    </article>
    {% endfor %}
  </div>
</section>

<!-- Dialog vidéo (lazy YouTube) -->
<dialog id="ytDialog" class="yt-dialog" aria-label="Lecture vidéo" inert>
  <button class="yt-close" aria-label="Fermer">×</button>
  <div class="yt-frame-wrap" role="document">
    <iframe id="ytFrame" title="YouTube" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </div>
</dialog>
