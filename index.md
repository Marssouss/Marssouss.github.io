---
layout: default
title: Freelance Talend & Power BI
description: Intégrations de données, pipelines ETL Talend, modèles DAX et dashboards Power BI performants. Disponibilité rapide, résultats mesurables.
permalink: /
---

<!-- ABOUT ME -->
{% include about-me.html %}

<!-- CERTS -->
{% include certs.html %}

<!-- METHODES -->
{% include methodes.html %}


<!-- SERVICES -->
<section id="services" class="section" aria-labelledby="services-title">
  <h2 id="services-title">Services</h2>
  <div class="grid cols-2">
    {% for service in site.data.services %}
      <div class="card">
        <h3>{{ service.title }}</h3>
        <p>{{ service.text }}</p>
        {% if service.badges %}
          <p>
            {% for badge in service.badges %}
              <span class="badge">{{ badge }}</span>
            {% endfor %}
          </p>
        {% endif %}
      </div>
    {% endfor %}
  </div>
</section>
<!-- END SERVICES -->


<!-- REALISATIONS -->
<section id="realisation" class="section" aria-labelledby="work-title">
  <h2 id="work-title">Réalisations récentes</h2>
  <div class="grid cols-2">
    {% for projet in site.data.projets %}
      <article class="card">
        <h3>{{ projet.title }}</h3>
        <p class="lead">{{ projet.text }}</p>
        <a class="btn" href="{{ projet.link }}">Voir les projets</a>
      </article>
    {% endfor %}
  </div>
</section>

<!-- END REALISATIONS -->

{% include contact.html %}


<!-- Modal Calendly -->
<div id="calendly-modal" class="modal" hidden>
  <div class="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="calendlyTitle">
    <button class="modal__close" aria-label="Fermer">×</button>
    <div style="padding:.75rem 1rem; border-bottom:1px solid var(--border)">
      <h3 id="calendlyTitle" style="margin:0">Réserver un créneau</h3>
    </div>
    <!-- Le widget s’injecte ici -->
    <div id="calendly-inline"
         class="calendly-inline"
         data-calendly-url="{{ site.author.calendly_url }}"
         style="position:relative; min-height:72vh;">
      <div class="calendly-skeleton" aria-hidden="true" style="display:grid;place-items:center;height:100%;">
        <p class="muted" style="margin:0">Chargement du calendrier…</p>
      </div>
    </div>
  </div>
</div>
