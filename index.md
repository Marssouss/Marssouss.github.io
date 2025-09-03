---
layout: default
title: Accueil
description: Freelance Talend & Power BI – intégrations de données, pipelines ETL, modélisation DAX et dashboards performants. Disponibilité rapide, résultats mesurables.
---

{% include about-me.html %}

{% include certs.html %}

<section id="methodes" class="section" aria-labelledby="methodes-title">
  <h2 id="methodes-title">Mes points clés</h2>
  <p class="lead">
    Que ce soit pour un flux <strong>Talend</strong> ou un rapport <strong>Power BI</strong>, 
    j’applique toujours les mêmes principes : <em>qualité</em>, <em>robustesse</em>, 
    <em>sécurité</em> et <em>performance</em>.  
    Ces bonnes pratiques assurent des solutions fiables, évolutives et faciles à maintenir.
  </p>

  <div class="kpis kpis--modern" aria-label="Points clés">
    {% for kpi in site.data.kpis %}
      <article class="kpi">
        <div class="kpi__icon" aria-hidden="true">{{ kpi.icon }}</div>
        <h3 class="kpi__title">{{ kpi.title }}</h3>
        <p class="kpi__text">{{ kpi.text }}</p>
      </article>
    {% endfor %}
  </div>
</section>

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

{% include contact.html %}
