---
layout: default
title: Contact
description: Contact, adresse et carte des zones desservies.
---

# Contact

- **Téléphone** : <a href="tel:{{ site.contact.phone | replace: ' ', '' }}">{{ site.contact.phone }}</a>  
- **Email** : <a href="mailto:{{ site.contact.email }}">{{ site.contact.email }}</a>  
- **Adresse** : {{ site.contact.address }}

## Réserver
<a class="btn" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Formulaire de réservation</a>

## Zones desservies
<div id="map" class="map"
     data-center-lat="{{ site.delivery.center_lat }}"
     data-center-lng="{{ site.delivery.center_lng }}"
     data-tiers='{{ site.delivery.tiers | jsonify }}'
     data-city="{{ site.delivery.base_city }}">
  <noscript>Activez JavaScript pour afficher la carte.</noscript>
</div>
