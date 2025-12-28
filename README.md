# Transport Preisrechner

Ein einfacher Preisrechner für Transportdienstleistungen in der Schweiz.

## Features

- 🚚 Routenberechnung zwischen zwei Adressen
- 💰 Automatische Preisberechnung basierend auf Distanz und Volumen
- 📦 9 verschiedene Volumen-/Gewichtskategorien
- 🗺️ Verwendet Open Source Routing (OSRM) - kein API-Key nötig

## Live Demo

Die App ist live auf GitHub Pages: `https://IHR-USERNAME.github.io/transport-calculator/`

## Lokale Installation

1. Repository klonen:
```bash
git clone https://github.com/IHR-USERNAME/transport-calculator.git
cd transport-calculator
```

2. Öffnen Sie `index.html` in Ihrem Browser

## GitHub Pages Setup

1. Gehen Sie zu Ihrem Repository auf GitHub
2. Klicken Sie auf **Settings**
3. Scrollen Sie zu **Pages** (im linken Menü)
4. Unter **Source** wählen Sie **main** branch
5. Klicken Sie auf **Save**
6. Nach wenigen Minuten ist Ihre App live!

## Technologie

- Vanilla JavaScript (keine Dependencies)
- [OSRM](http://project-osrm.org/) für Routenberechnung
- [Nominatim](https://nominatim.org/) für Geocoding
- CSS Grid & Flexbox für responsive Design

## Preismatrix

Die Preise basieren auf:
- Distanz (0-50km bis 401-500km)
- Volumen (0-150kg bis 13-16 Paletten)

Alle Preise inklusive 4% Zuschlag + 10 CHF Basispauschale.

## Browser Support

- Chrome/Edge (empfohlen)
- Firefox
- Safari
- Mobile Browser

## Lizenz

MIT License - Frei verwendbar für kommerzielle und private Zwecke
