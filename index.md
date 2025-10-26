---
layout: default
title: Accueil
permalink: /
description: Location de sonorisation et jeux de lumière à Espiet et en Gironde. Packs prêts à l’emploi, livraison par zones, installation en option.
---

# Location Sono & Jeux de Lumière

**Matériel pro, packs simples, prix clairs.**  
Réservez en 2 minutes : <a class="btn" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Formulaire de réservation</a>

<div class="grid two">
  <div>
    ## Pourquoi nous ?
    - Sonorisation claire et puissante
    - Effets lumineux LED, lasers et machines (fumée, bulles…)
    - **Packs** clés en main (DJ, soirée privée, mariage)
    - **Livraison par zones** autour de {{ site.delivery.base_city }} — installation possible dès **{{ site.delivery.install_price_from_eur }}€**
  </div>
  <div>
    <img src="/assets/hero.jpg" alt="Matériel sono et lumières prêt à l’emploi" class="rounded shadow">
  </div>
</div>

## Zones desservies
<div id="map" class="map"
     data-center-lat="{{ site.delivery.center_lat }}"
     data-center-lng="{{ site.delivery.center_lng }}"
     data-tiers='{{ site.delivery.tiers | jsonify }}'
     data-city="{{ site.delivery.base_city }}">
  <noscript>Activez JavaScript pour afficher la carte des zones de livraison.</noscript>
</div>

## Nos packs populaires
<ul class="cards">
  {% for pack in site.data.packs %}
  <li class="card">
    <h3>{{ pack.title }}</h3>
    <p class="muted">{{ pack.description }}</p>
    <p><strong>{{ pack.price_per_day }} {{ site.pricing.currency }}</strong> / jour — {{ pack.weekend_price }} {{ site.pricing.currency }} week-end</p>
    <details>
      <summary>Contenu</summary>
      <ul>
        {% for item in pack.items %}
        <li>{{ item }}</li>
        {% endfor %}
      </ul>
    </details>
    <a class="btn" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Réserver ce pack</a>
  </li>
  {% endfor %}
</ul>

## Chaîne YouTube
<div class="video">
  <iframe title="YouTube" width="560" height="315"
    src="https://www.youtube.com/embed?listType=playlist&list=PLPLACEHOLDER"
    allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
</div>

<section class="note">
  <h2>Infos tarifs</h2>
  <p>{{ site.pricing.weekend }}</p>
  <p>{{ site.pricing.caution_policy }}</p>
  <p>{{ site.pricing.notes }}</p>
</section>
