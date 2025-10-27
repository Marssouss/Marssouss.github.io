---
layout: default
title: Mentions legales
description: Mentions legales conformes aux obligations applicables au micro-entrepreneur.
---

<section class="section">
  <div class="container">
    <div class="section-header">
      <h1>Mentions legales</h1>
      <p class="muted">Informations obligatoires concernant l'editeur micro-entrepreneur du site {{ site.brand }}.</p>
    </div>
    <div class="section-block">
      <div class="note">
        <h2>Editeur du site</h2>
        <p><strong>{{ site.brand }}</strong></p>
        <p>{{ site.contact.legal_name | default: site.contact.legal_contact }}</p>
        <p>{{ site.contact.address }}</p>
        <p>Telephone : <a href="tel:{{ site.contact.phone | replace: ' ', '' }}">{{ site.contact.phone }}</a></p>
        <p>Email : <a href="mailto:{{ site.contact.email }}">{{ site.contact.email }}</a></p>
      </div>
    </div>
    <div class="section-block">
      <div class="note">
        <h2>Statut et immatriculation</h2>
        <p>Statut juridique : {{ site.contact.legal_status | default: 'Entreprise individuelle (micro-entrepreneur)' }}</p>
        <p>Responsable de publication : {{ site.contact.legal_contact }}</p>
        <p>Numero SIRET : {{ site.contact.siret }}</p>
        {% if site.contact.siren %}
        <p>Numero SIREN : {{ site.contact.siren }}</p>
        {% endif %}
        <p>{{ site.contact.rcs | default: 'Dispense d''immatriculation au RCS et au RM conforme a l''article L123-1-1 du Code de commerce.' }}</p>
        <p>TVA : {{ site.contact.vat | default: 'TVA non applicable, article 293 B du CGI.' }}</p>
        {% if site.contact.insurance %}
        <p>Assurance professionnelle : {{ site.contact.insurance }}</p>
        {% endif %}
      </div>
    </div>
    <div class="section-block">
      <div class="note">
        <h2>Hebergement du site</h2>
        {% if site.legal.host.name %}
        <p>{{ site.legal.host.name }}</p>
        {% if site.legal.host.address %}
        <p>{{ site.legal.host.address }}</p>
        {% endif %}
        {% if site.legal.host.phone %}
        <p>Telephone : {{ site.legal.host.phone }}</p>
        {% endif %}
        {% if site.legal.host.website %}
        <p>Site web : <a href="{{ site.legal.host.website }}">{{ site.legal.host.website }}</a></p>
        {% endif %}
        {% else %}
        <p>{{ site.legal.host }}</p>
        {% endif %}
      </div>
    </div>
    <div class="section-block">
      <div class="note">
        <h2>Contact</h2>
        <p>Pour toute question relative au site ou a son contenu, vous pouvez ecrire a <a href="mailto:{{ site.contact.email }}">{{ site.contact.email }}</a> ou appeler {{ site.contact.phone }}.</p>
      </div>
    </div>
    <div class="section-block">
      <div class="note">
        <h2>Donnees personnelles</h2>
        <p>{{ site.legal.data_policy | default: 'Les informations personnelles collectees via le site servent uniquement a traiter les demandes formulees. Elles sont conservees pendant la duree necessaire a leur traitement et ne sont pas communiquees a des tiers sans consentement explicite.' }}</p>
        <p>Conformement au RGPD et a la loi Informatique et Libertes, vous disposez d''un droit d''acces, de rectification, d''opposition et de suppression. Pour exercer ces droits, ecrivez a <a href="mailto:{{ site.contact.email }}">{{ site.contact.email }}</a>.</p>
      </div>
    </div>
    <div class="section-block">
      <div class="note">
        <h2>Propriete intellectuelle</h2>
        <p>{{ site.legal.intellectual | default: 'L''ensemble des elements composant le site (textes, visuels, logos, icones, etc.) est la propriete exclusive de l''editeur ou fait l''objet d''une autorisation. Toute reproduction totale ou partielle sans autorisation ecrite est strictement interdite.' }}</p>
      </div>
    </div>
    <div class="section-block">
      <div class="note">
        <h2>Responsabilites</h2>
        <p>{{ site.legal.liability | default: 'Malgre les soins apportes a la mise a jour du site, des inexactitudes peuvent subsister. L''editeur ne saurait etre tenu responsable des dommages directs ou indirects consecutifs a la consultation ou a l''utilisation du site ou de l''impossibilite d''y acceder.' }}</p>
      </div>
    </div>
  </div>
</section>
