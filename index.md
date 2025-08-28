---
layout: default
title: Accueil
description: Freelance Talend & Power BI – intégrations de données, pipelines ETL, modélisation DAX et dashboards performants. Disponibilité rapide, résultats mesurables.
---

<section class="hero section">
  <div>
    <h1>{{ site.author.name }}</h1>
    <h2>Freelance Talend & Power Bi</h2>
    <p class="lead">J’aide les équipes Data à livrer <strong>des pipelines robustes</strong> et <strong>des dashboards clairs</strong> : Talend (ETL/ESB), modélisation DAX, gouvernance Power BI.</p>
    <div class="actions">
      <a class="btn cta" href="#services">Voir mes services</a>
      <button class="btn" data-calendly>Réserver un créneau</button>
    </div>
    <div class="kpis" style="margin-top:1rem">
      <div class="kpi"><strong>50%+</strong><br/>réduction du temps de refresh</div>
      <div class="kpi"><strong>99.9%</strong><br/>taux de succès pipeline</div>
      <div class="kpi"><strong>J+5</strong><br/>mise en prod typique</div>
    </div>
  </div>
<div
  class="hero__viz"
  style="--hero-image: url('{{ '/assets/img/hero-data.svg' | relative_url }}');"
  role="img"
  aria-label="Pipeline Talend et barres Power BI">
</div>
</section>

<section id="services" class="section">
  <h2>Services</h2>
  <div class="grid cols-3">
    <div class="card">
      <h3>Talend • ETL/ESB</h3>
      <p>Jobs, orchestrations, connexions (FTP/SFTP, REST, DB), gestion d’erreurs, logs, monitoring, packaging.</p>
      <p><span class="badge">Talend Studio</span> <span class="badge">CI/CD</span> <span class="badge">Best Practices</span></p>
    </div>
    <div class="card">
      <h3>Power BI • Modélisation & DAX</h3>
      <p>Schémas en étoile, mesures DAX, RLS, incrémental refresh, performance analyzer.</p>
      <p><span class="badge">Power BI Service</span> <span class="badge">Governance</span></p>
    </div>
    <div class="card">
      <h3>Data Ops • Qualité & Perf</h3>
      <p>Observabilité pipelines, tests de données, alerting, optimisation SQL, tuning refresh.</p>
      <p><span class="badge">Monitoring</span> <span class="badge">SLAs</span></p>
    </div>
  </div>
</section>

<section class="section">
  <h2>Réalisations récentes</h2>
  <div class="grid cols-2">
    <div class="card">
      <h3>Migration ETL Talend → Cloud</h3>
      <p class="lead">–30% coûts infra, +40% débit. Mise en place d’orchestrations, alertes et reprise sur incident.</p>
      <a class="btn" href="/portfolio.html">Voir les projets</a>
    </div>
    <div class="card">
      <h3>Power BI • Finance Ops</h3>
      <p class="lead">Modèle DAX gouverné, RLS multi-pays, temps de chargement < 3s, refresh incrémental.</p>
      <a class="btn" href="/portfolio.html">Voir les projets</a>
    </div>
  </div>
</section>

<section id="contact" class="section">
  <h2>Contact</h2>
  <p class="lead">Parlons de vos flux Talend et de vos tableaux de bord Power BI.</p>
  <div class="actions">
    <a class="btn cta" href="mailto:{{ site.author.email }}">Me contacter</a>
    <button class="btn" data-calendly>Réserver un créneau</button>
  </div>
</section>
