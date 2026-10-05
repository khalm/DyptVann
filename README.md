# VannDybde

Dybdekart for norske innsjøer – og saltvann hvis du vil – rett på telefonen. Gratis, uten reklame, og virker uten internett for områder du har lagret.

**Versjon 1.0.0**

## Hva appen gjør

- Viser dybdekoter for de ca. 600 innsjøene NVE har dybdekartlagt
- Trykk på en innsjø for å se maks dyp, middeldyp, areal, høyde over havet og når den ble målt
- Valgfritt: dybdeforhold i saltvann (dybdelag, dybdekurver, grunner og skjær fra Kartverkets sjøkartdata)
- Søk etter innsjøer og steder
- Viser din posisjon på kartet
- Bakgrunnskart: topo, grå, sjøkart eller flyfoto
- Lagre områder for bruk uten dekning; ved første oppstart får du beskjed om å laste ned kart (helst på wifi)
- Norsk og engelsk
- Fungerer på både Android og iPhone (installer fra nettleseren)

## Slå på GitHub Pages

1. Gå til repoet på GitHub → **Settings** → **Pages**
2. Under *Build and deployment*: velg **Deploy from a branch**, branch **main**, mappe **/ (root)**, trykk **Save**
3. Etter et minutt eller to ligger appen på `https://khalm.github.io/DyptVann/`

## Installer på telefonen

- **Android (Chrome):** åpne lenken → meny (⋮) → *Legg til på startskjermen* / *Installer app*
- **iPhone (Safari):** åpne lenken → Del-knappen → *Legg til på Hjem-skjerm*

## Datakilder (alle åpne og gratis)

- Dybdekart ferskvann: [NVE Innsjødatabase](https://www.nve.no/) (WMS)
- Dybdedata saltvann og sjøkart: [Kartverket](https://www.kartverket.no/) (WMS / WMTS)
- Bakgrunnskart og stedsnavn: Kartverket
- Flyfoto: Esri World Imagery
- Kartbibliotek: [Leaflet](https://leafletjs.com/) (BSD-2)

## Begrensninger

- Bare innsjøer NVE har målt har dybdekart. Det finnes ingen andre gratis dybdedata for ferskvann i Norge.
- Detaljinfo ved trykk krever nett; dybdekotene selv vises offline i lagrede områder.
- Ikke beregnet for navigasjon.
