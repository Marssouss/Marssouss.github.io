---
layout: default
title: Accueil
description: Freelance Talend & Power BI – intégrations de données, pipelines ETL, modélisation DAX et dashboards performants. Disponibilité rapide, résultats mesurables.
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
