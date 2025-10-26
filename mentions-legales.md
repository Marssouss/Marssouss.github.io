---
layout: default
title: Mentions légales
description: Mentions légales et informations de l’éditeur du site.
---

<section class="section">
  <div class="container">
    <div class="section-header">
      <h1>Mentions légales</h1>
      <p class="muted">Informations sur l’éditeur du site {{ site.brand }} et sur l’hébergement.</p>
    </div>
    <div class="note">
      <h2>Éditeur du site</h2>
      <p><strong>{{ site.brand }}</strong></p>
      <p>Responsable de publication : {{ site.contact.legal_contact }}</p>
      <p>{{ site.contact.address }}</p>
      <p>Téléphone : <a href="tel:{{ site.contact.phone | replace: ' ', '' }}">{{ site.contact.phone }}</a></p>
      <p>Email : <a href="mailto:{{ site.contact.email }}">{{ site.contact.email }}</a></p>
      <p>SIRET : {{ site.contact.siret }}</p>
    </div>
    <div class="section-block">
      <div class="note">
        <h2>Hébergement</h2>
        <p>{{ site.legal.host }}</p>
      </div>
    </div>
    <div class="section-block">
      <div class="note">
        <h2>Données personnelles</h2>
        <p>{{ site.legal.data_policy }}</p>
      </div>
    </div>
    <div class="section-block">
      <div class="note">
        <h2>Propriété intellectuelle</h2>
        <p>{{ site.legal.intellectual }}</p>
      </div>
    </div>
  </div>
</section>
