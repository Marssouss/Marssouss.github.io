---
layout: default
title: Services
description: Livraison par zones, installation et reprise, assistance technique. Location à la journée ou au week-end.
---

# Services

## Livraison par zones autour de {{ site.delivery.base_city }}
<table>
  <thead><tr><th>Zone</th><th>Rayon</th><th>Frais</th></tr></thead>
  <tbody>
    {% for t in site.delivery.tiers %}
    <tr>
      <td>{{ t.label }}</td>
      <td>{{ t.radius_km }} km</td>
      <td>{{ t.price_eur }} €</td>
    </tr>
    {% endfor %}
  </tbody>
</table>

## Installation & reprise
- À partir de **{{ site.delivery.install_price_from_eur }} €** (selon configuration).
- Test du matériel + conseils d’utilisation.
- Option **technicien** pour soirées/mariages.

## Catégories
- **Sono** : enceintes actives, caissons, micros, tables de mixage.
- **Lumières** : lyres, PAR LED, barres, lasers, stroboscopes.
- **Ambiance** : machine à fumée, bulles, déco LED.

👉 Demandez un devis rapide : <a class="btn" href="{{ site.forms.booking_google_form_url }}" target="_blank" rel="noopener">Formulaire</a>
