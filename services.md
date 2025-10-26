---
layout: default
title: Services
description: Livraison par zones, installation et reprise, assistance technique. Location à la journée ou au week-end.
---

<section class="section">
  <div class="container">
    <div class="section-header">
      <h1>Services & accompagnement</h1>
      <p class="muted">Une prestation complète : préparation du matériel, livraison, installation et assistance pendant votre événement.</p>
    </div>
    <div class="feature-grid">
      {% for highlight in site.services_page.highlights %}
      <article class="feature-card">
        <h3>{{ highlight.title }}</h3>
        <p class="muted">{{ highlight.text }}</p>
      </article>
      {% endfor %}
    </div>
  </div>
</section>

<section class="section">
  <div class="container split-grid">
    <div>
      <div class="section-header">
        <h2>Livraison par zones</h2>
        <p class="muted">Basée à {{ site.delivery.base_city }}, notre équipe couvre la Gironde avec trois zones tarifaires claires. Installation disponible dès {{ site.delivery.install_price_from_eur }} €.</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Zone</th>
            <th>Rayon</th>
            <th>Frais</th>
          </tr>
        </thead>
        <tbody>
          {% for tier in site.delivery.tiers %}
          <tr>
            <td>{{ tier.label }}</td>
            <td>{{ tier.radius_km }} km</td>
            <td>{{ tier.price_eur }} €</td>
          </tr>
          {% endfor %}
        </tbody>
      </table>
    </div>
    <div class="note">
      <h3>Installation & reprise</h3>
      <p>Nous installons, testons et vous formons à l’utilisation du matériel. Option technicien sur place possible pendant l’événement.</p>
      <ul>
        <li>Calage sonore et lumière en fonction du lieu.</li>
        <li>Assistance téléphonique et dépannage week-end.</li>
        <li>Reprise du matériel à l’heure convenue.</li>
      </ul>
      <a class="button button--ghost" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Planifier une installation</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-header">
      <h2>Options complémentaires</h2>
      <p class="muted">Composez un pack sur mesure avec nos services additionnels.</p>
    </div>
    <div class="feature-grid">
      {% for extra in site.services_page.extras %}
      <article class="feature-card">
        <h3>{{ extra.title }}</h3>
        <p class="muted">{{ extra.text }}</p>
      </article>
      {% endfor %}
    </div>
    <div class="section-actions">
      <a class="button button--primary" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Demander un devis rapide</a>
    </div>
  </div>
</section>
