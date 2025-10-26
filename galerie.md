---
layout: default
title: Galerie
description: Exemples d’installations lumière et sono.
---

<section class="section">
  <div class="container">
    <div class="section-header">
      <h1>Ambiances & réalisations</h1>
      <p class="muted">{{ site.gallery.intro }}</p>
    </div>
    <div class="gallery-grid">
      {% for image in site.gallery.images %}
      {% assign src = image.src %}
      {% if src contains '://' %}
        {% assign image_src = src %}
      {% else %}
        {% assign image_src = src | relative_url %}
      {% endif %}
      <figure>
        <img src="{{ image_src }}" alt="{{ image.alt }}">
        <figcaption>{{ image.alt }}</figcaption>
      </figure>
      {% endfor %}
    </div>
    <div class="section-actions">
      {% if site.gallery.video_cta %}
      <a class="button button--primary" href="{{ site.gallery.video_cta.url }}" target="_blank" rel="noopener">{{ site.gallery.video_cta.label }}</a>
      {% endif %}
      <a class="button button--ghost" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Planifier une visite technique</a>
    </div>
  </div>
</section>
