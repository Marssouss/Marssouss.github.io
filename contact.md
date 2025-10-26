layout: default
title: Contact
description: Contact, adresse et carte des zones desservies.
---

{% assign last_tier = site.delivery.tiers | last %}

<section class="section">
  <div class="container split-grid">
    <div>
      <div class="section-header">
        <h1>Contact & réservation</h1>
        <p class="muted">{{ site.contact_page.intro }}</p>
      </div>
      <div class="contact-box">
        <ul>
          <li>
            <span>Téléphone</span>
            <a href="tel:{{ site.contact.phone | replace: ' ', '' }}">{{ site.contact.phone }}</a>
          </li>
          <li>
            <span>Email</span>
            <a href="mailto:{{ site.contact.email }}">{{ site.contact.email }}</a>
          </li>
          <li>
            <span>Adresse</span>
            {{ site.contact.address }}
          </li>
          <li>
            <span>SIRET</span>
            {{ site.contact.siret }}
          </li>
        </ul>
      </div>
      <div class="section-actions">
        <a class="button button--primary" href="{{ site.contact_page.booking_cta.url }}" target="_blank" rel="noopener">{{ site.contact_page.booking_cta.label }}</a>
        <a class="button button--ghost" href="{{ site.social.youtube }}" target="_blank" rel="noopener">Découvrir nos ambiances</a>
      </div>
      {% if site.contact_page.notes %}
      <div class="note">
        <h3>À savoir</h3>
        <ul>
          {% for item in site.contact_page.notes %}
          <li>{{ item }}</li>
          {% endfor %}
        </ul>
      </div>
      {% endif %}
    </div>
    <div>
      <div class="section-header">
        <h2>Zones desservies</h2>
        <p class="muted">Autour de {{ site.delivery.base_city }} et jusqu’à {{ last_tier.radius_km }} km.</p>
      </div>
      <div class="map-shell">
        <div id="map" class="map"
             data-center-lat="{{ site.delivery.center_lat }}"
             data-center-lng="{{ site.delivery.center_lng }}"
             data-tiers='{{ site.delivery.tiers | jsonify }}'
             data-city="{{ site.delivery.base_city }}">
          <noscript>Activez JavaScript pour afficher la carte.</noscript>
        </div>
      </div>
    </div>
  </div>
</section>
