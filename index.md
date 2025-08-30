---
layout: default
title: Accueil
description: Freelance Talend & Power BI – intégrations de données, pipelines ETL, modélisation DAX et dashboards performants. Disponibilité rapide, résultats mesurables.
---

<section class="hero section" aria-labelledby="hero-title">
  <div>
    <h1 id="hero-title">Bonjour, je suis {{ site.author.prenom_nom }}</h1>
    <h2>Freelance Talend &amp; Power BI</h2>
    <p class="lead">
      Passionné par la data, je mets mon expertise au service de vos besoins spécifiques&nbsp;:
      conception et maintien de flux automatisés, intégration ETL/ESB et visualisation claire.
      Convaincu qu’une donnée <strong>propre</strong>, <strong>au bon endroit</strong> et <strong>contrôlée</strong>
      est la clé, je vous aide à bâtir des pipelines évolutifs et des dashboards fiables
      pour tirer pleinement parti de la puissance de votre entreprise.
    </p>
  </div>
</section>

{% include certs.html %}



<section id="kpi" class="section" aria-labelledby="services-title">
<div class="kpis kpis--modern" aria-label="Indicateurs qualitatifs">
  {% for kpi in site.data.kpis %}
  <article class="kpi">
    <div class="kpi__icon" aria-hidden="true">{{ kpi.icon }}</div>
    <h3 class="kpi__title">{{ kpi.title }}</h3>
    <p class="kpi__text">{{ kpi.text }}</p>
  </article>
  {% endfor %}
</div>
</section>

<section id="services" class="section">
  <h2>Services</h2>
  <div class="grid cols-2">
    {% for service in site.data.services %}
    <div class="card">
      <h3>{{ service.title }}</h3>
      <p>{{ service.text }}</p>
      <p>
        {% for badge in service.badges %}
          <span class="badge">{{ badge }}</span>
        {% endfor %}
      </p>
    </div>
    {% endfor %}
  </div>
</section>


<section id="realisation" class="section">
  <h2>Réalisations récentes</h2>
  <div class="grid cols-2">
    {% for projet in site.data.projets %}
    <div class="card">
      <h3>{{ projet.title }}</h3>
      <p class="lead">{{ projet.text }}</p>
      <a class="btn" href="{{ projet.link }}">Voir les projets</a>
    </div>
    {% endfor %}
  </div>
</section>

{% include contact.html %}

