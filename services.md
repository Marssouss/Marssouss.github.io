---
layout: default
title: Services
description: Location sono & lumières avec livraison, installation sur demande et assistance personnalisée en Gironde.
---

<section class="section">
  <div class="container">
    <div class="section-header">
      <h1>Services sur mesure pour vos événements</h1>
      <p class="muted">Je suis {{ site.owner_name }}, interlocuteur unique pour la sono et la lumière de vos soirées en Gironde.</p>
    </div>
    <p>Je prépare le pack choisi, je fournis tous les câbles et je reste joignable le jour J. Vous gérez la playlist, je sécurise la technique.</p>
    <div class="section-actions" style="margin: 2.5rem 0; gap: 1.25rem;">
      <a class="button button--primary" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Demander un devis rapide</a>
      <a class="button button--ghost" href="/packs/">Voir les packs disponibles</a>
    </div>
    <div class="feature-grid" style="margin-top: 2.5rem;">
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
  <div class="container">
    <div style="display: grid; gap: 2.5rem; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); align-items: start;">
      <div>
        <div class="section-header">
          <h2>Livraison flexible, installation sur demande</h2>
          <p class="muted">Retrait gratuit à {{ site.delivery.base_city }} ou livraison dans votre zone. Installation complète disponible à partir de {{ site.delivery.install_price_from_eur }} €.</p>
        </div>
        <ul class="muted" style="margin-top: 1.5rem;">
          <li>Retrait préparé : matériel testé, check-list fournie.</li>
          <li>Livraison par {{ site.owner_name }} avec mise en route sur place.</li>
          <li>Assistance jour J et reprise programmée après votre soirée.</li>
        </ul>
      </div>
      <aside class="note" style="margin: 0;">
        <h3>Installation & reprise</h3>
        <p>Je m’occupe de la mise en place, je réalise les tests et je planifie le démontage avec vous.</p>
        <ul>
          <li>Réglages adaptés à la pièce et à votre ambiance.</li>
          <li>Conseils utilisation et numéro direct en cas de question.</li>
          <li>Reprise à l’horaire qui vous convient.</li>
        </ul>
        <a class="button button--ghost" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Planifier une installation</a>
      </aside>
    </div>
    <div class="feature-grid" style="margin-top: 2.75rem; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));">
      <article class="feature-card">
        <h3>Retrait rapide</h3>
        <p class="muted">Créneau sur rendez-vous, pack prêt à partir avec check-list.</p>
      </article>
      <article class="feature-card">
        <h3>Livraison maîtrisée</h3>
        <p class="muted">Transport assuré par mes soins, tests de fonctionnement sur place.</p>
      </article>
      <article class="feature-card">
        <h3>Installation à la carte</h3>
        <p class="muted">Calage lumière et son, briefing express pour une utilisation sereine.</p>
      </article>
    </div>
    <div style="display: grid; gap: 1.75rem; margin-top: 3rem; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); align-items: start;">
      <div>
        <h3 class="muted">Frais de déplacement</h3>
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
            <td>{{ tier.price_eur }} €</td>
          </tr>
          {% endfor %}
          <tr>
            <td>Hors zone</td>
            <td>Sur devis</td>
            <td><a href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Contactez-moi</a></td>
          </tr>
        </tbody>
      </table>
      </div>
      <div class="map-shell">
        <div class="map js-delivery-map"
             data-map-id="services"
             data-center-lat="{{ site.delivery.center_lat }}"
             data-center-lng="{{ site.delivery.center_lng }}"
             data-tiers='{{ site.delivery.tiers | jsonify }}'
             data-city="{{ site.delivery.base_city }}">
          <noscript>Activez JavaScript pour afficher la carte des zones de livraison.</noscript>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-header">
      <h2>Déroulé d’une location</h2>
      <p class="muted">Des échanges clairs et une logistique millimétrée pour profiter sereinement de votre soirée.</p>
    </div>
    <div class="feature-grid">
      <article class="feature-card">
        <h3>1. Brief express</h3>
        <p class="muted">Vous me donnez la date, le lieu et le nombre d’invités.</p>
      </article>
      <article class="feature-card">
        <h3>2. Pack prêt</h3>
        <p class="muted">Matériel testé, accessoires réunis, consignes jointes.</p>
      </article>
      <article class="feature-card">
        <h3>3. Livraison ou retrait</h3>
        <p class="muted">Sur place, je vérifie l’installation avec vous.</p>
      </article>
      <article class="feature-card">
        <h3>4. Assistance & reprise</h3>
        <p class="muted">Support par téléphone et reprise planifiée à l’avance.</p>
      </article>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-header">
      <h2>Options complémentaires</h2>
      <p class="muted">Personnalisez votre ambiance avec ces services additionnels.</p>
    </div>
    <div class="feature-grid">
      {% for extra in site.services_page.extras %}
      <article class="feature-card">
        <h3>{{ extra.title }}</h3>
        <p class="muted">{{ extra.text }}</p>
      </article>
      {% endfor %}
    </div>
    <div class="section-actions" style="gap: 1rem;">
      <a class="button button--primary" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Parler de votre projet</a>
      <a class="button button--ghost" href="/catalogue/">Explorer le catalogue complet</a>
    </div>
  </div>
</section>
