---
layout: default
title: Services
description: Location sono & lumières avec livraison, installation sur demande et assistance personnalisée en Gironde.
---

<section class="section">
  <div class="container">
    <div class="section-header">
      <h1>Services sur mesure pour vos événements</h1>
      <p class="muted">Je suis Martial, votre interlocuteur unique. Je prépare, livre et installe le matériel sono & lumière pour vos soirées privées ou professionnelles dans toute la Gironde.</p>
    </div>
    <p>Choisissez le pack adapté à votre nombre d’invités, je m’occupe du reste : matériel LED récent, câblage complet, brief personnalisé et assistance pendant l’événement. Aucun DJ sur place ? Vous pilotez la musique, je veille à ce que la technique soit impeccable.</p>
    <div class="section-actions">
      <a class="button button--primary" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Demander un devis rapide</a>
      <a class="button button--ghost" href="/packs/">Voir les packs disponibles</a>
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
        <h2>Livraison flexible, installation sur demande</h2>
        <p class="muted">Basé à {{ site.delivery.base_city }}, je propose le retrait gratuit sur rendez-vous, la livraison par zones et l’installation complète à partir de {{ site.delivery.install_price_from_eur }} €.</p>
      </div>
      <ul>
        <li><strong>Retrait</strong> possible la veille de votre événement et retour le lundi matin pour les locations week-end.</li>
        <li><strong>Livraison</strong> assurée par mes soins : matériel testé, câblé et prêt à brancher.</li>
        <li><strong>Installation</strong> et mise en scène lumière sur demande, avec briefing pour une prise en main sereine.</li>
      </ul>
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
        <p class="muted map-caption">Besoin d’une livraison hors zone ? Contactez-moi pour un devis personnalisé.</p>
      </div>
    </div>
    <div class="note">
      <h3>Installation & reprise</h3>
      <p>Je me déplace personnellement pour installer, tester et scénariser les jeux de lumière. Je reste joignable pendant toute la durée de votre événement.</p>
      <ul>
        <li>Réglages adaptés à votre salle ou à votre domicile.</li>
        <li>Conseils d’utilisation selon votre playlist et l’ambiance souhaitée.</li>
        <li>Démontage et reprise à l’horaire qui vous convient.</li>
      </ul>
      <a class="button button--ghost" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Planifier une installation</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-header">
      <h2>Déroulé d’une location</h2>
      <p class="muted">Chaque prestation est pensée pour être simple, lisible et sécurisée du premier contact au retour du matériel.</p>
    </div>
    <div class="feature-grid">
      <article class="feature-card">
        <h3>1. Brief & sélection</h3>
        <p class="muted">Nous échangeons sur votre lieu, le nombre d’invités et l’ambiance souhaitée pour choisir le pack idéal ou construire un panachage.</p>
      </article>
      <article class="feature-card">
        <h3>2. Préparation personnalisée</h3>
        <p class="muted">Je prépare le matériel, fais les tests, organise le câblage et ajoute les accessoires nécessaires (pieds, crochets, rallonges).</p>
      </article>
      <article class="feature-card">
        <h3>3. Livraison & mise en place</h3>
        <p class="muted">Retrait à Daignac ou livraison dans votre zone. Installation complète possible, avec démonstration pour une prise en main sereine.</p>
      </article>
      <article class="feature-card">
        <h3>4. Assistance & reprise</h3>
        <p class="muted">Je reste disponible par téléphone le jour J. Nous fixons ensemble l’horaire de reprise ou de retour du matériel.</p>
      </article>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-header">
      <h2>Options complémentaires</h2>
      <p class="muted">Composez un pack 100&nbsp;% sur mesure avec ces services additionnels.</p>
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
      <a class="button button--primary" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Parler de votre projet</a>
      <a class="button button--ghost" href="/catalogue/">Explorer le catalogue complet</a>
    </div>
  </div>
</section>
