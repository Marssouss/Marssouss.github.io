---
layout: default
title: Services
description: Livraison par zones, installation et reprise, assistance personnalisée. Location à la journée ou au week-end.
---

<section class="section">
  <div class="container">
    <div class="section-header">
      <h1>Services & accompagnement</h1>
      <p class="muted">Prestation complète assurée par un interlocuteur unique : préparation, livraison, installation et suivi personnalisé.</p>
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
        <p class="muted">Basé à {{ site.delivery.base_city }}, je couvre la Gironde avec trois zones tarifaires transparentes. Installation disponible à partir de {{ site.delivery.install_price_from_eur }} €.</p>
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
      <div class="map-shell">
        <div class="map js-delivery-map"
             data-map-id="services"
             data-center-lat="{{ site.delivery.center_lat }}"
             data-center-lng="{{ site.delivery.center_lng }}"
             data-tiers='{{ site.delivery.tiers | jsonify }}'
             data-city="{{ site.delivery.base_city }}">
          <noscript>Activez JavaScript pour afficher la carte des zones de livraison.</noscript>
        </div>
        <p class="muted map-caption">Pour toute demande hors zone, merci de me contacter directement.</p>
      </div>
    </div>
    <div class="note">
      <h3>Installation & reprise</h3>
      <p>J’installe, je teste et je vous montre comment profiter du matériel sereinement. Option présence sur place possible sur demande.</p>
      <ul>
        <li>Calage sonore et lumière adapté à votre lieu.</li>
        <li>Je reste joignable directement en cas de question pendant la soirée.</li>
        <li>Reprise du matériel à l’horaire qui vous arrange.</li>
      </ul>
      <a class="button button--ghost" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Planifier une installation</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-header">
      <h2>Options complémentaires</h2>
      <p class="muted">Composez un pack sur mesure avec mes services additionnels.</p>
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
