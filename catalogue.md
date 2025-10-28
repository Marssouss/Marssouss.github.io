---
layout: default
title: Catalogue
description: Catalogue de matériel audio et lumière disponible à la location.
---

<section class="section">
  <div class="container">
    <div class="section-header">
      <h1>Catalogue matériel</h1>
      <p class="muted">{{ site.catalogue.intro }}</p>
    </div>
    {% for category in site.catalogue.categories %}
    <div class="section-block">
      <h2>{{ category.name }}</h2>
      {% if category.video_gallery.videos %}
      {% if category.video_gallery.title %}<h3>{{ category.video_gallery.title }}</h3>{% endif %}
      {% if category.video_gallery.intro %}<p class="muted">{{ category.video_gallery.intro }}</p>{% endif %}
      <div class="video-gallery">
        {% for video in category.video_gallery.videos %}
        <article class="video-card">
          <div class="video-frame">
            <iframe
              title="{{ video.title | default: 'Vidéo de démonstration' }}"
              src="{{ video.embed_url }}"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              referrerpolicy="strict-origin-when-cross-origin"></iframe>
          </div>
          {% if video.title %}<h3>{{ video.title }}</h3>{% endif %}
          {% if video.description %}<p class="muted">{{ video.description }}</p>{% endif %}
        </article>
        {% endfor %}
      </div>
      {% endif %}
      <ul class="cards">
        {% for item in category.items %}
        <li class="card">
          <h3>{{ item.name }}</h3>
          <p class="muted">{{ item.description }}</p>
          <a class="button button--ghost" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Demander un devis</a>
        </li>
        {% endfor %}
      </ul>
    </div>
    {% endfor %}
    <div class="section-actions">
      <a class="button button--primary" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Demander un devis personnalisé</a>
    </div>
  </div>
</section>
