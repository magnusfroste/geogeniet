# Geogeniet

Ett geometrispel för förskolan och lågstadiet. Barnet hjälper roboten Geo att bygga bilder genom
att dra former – cirklar, trianglar, sexhörningar, stjärnor och fler – till rätt plats, nivå för
nivå. Tränar former, färger och rumsuppfattning.

**Spela:** https://geogeniet.skolappar.com · En del av [Skolappar](https://www.skolappar.com) – pedagogiska appar av föräldrar · öppen källkod (MIT)

Började som ett Google AI Studio-projekt och körs nu fristående.

## Vad du kan göra

- **37 nivåer** på en karta, från Starten och Trianglar till Raketen, Slottet och Ankaret.
  Nivåerna låses upp med stjärnor.
- **Dra och släpp** formerna med fingret eller musen; de fastnar när de hamnar rätt.
- **Ledtråd**: visar var en form ska ligga (ny ledtråd efter fem sekunder).
- **Stjärnor**: tre stjärnor första gången en nivå klaras.
- **Utmaningsläge** med nedräkning (fem sekunder per form plus 15) och en bonusstjärna om du
  hinner.
- **Klistermärkesbok**: sex klistermärken som låses upp vid 5, 15, 30, 45, 60 och 75 stjärnor.
- **Information för pedagoger och föräldrar** i en egen ruta.
- Ljudeffekter skapas i webbläsaren (Web Audio) och kan stängas av.

## Kom igång

```bash
npm install
npm run dev      # utvecklingsserver på port 3000
npm run build    # produktionsbygge till dist/
npm run preview  # förhandsgranska bygget
```

Docker-bygget använder Node 22.

## Docker

```bash
docker build -t geogeniet .
docker run --rm -p 8080:8080 geogeniet
```

Servern ligger bakom nginx med `deploy/nginx.conf`.

## Integritet

- Ingen inloggning, inga kakor, ingen analys, inga AI-tjänster.
- Inga anrop till externa servrar. Typsnittet Fredoka ligger i `public/fonts/`.
- Framsteg (stjärnor, klarade nivåer, utmaningsläge) sparas i `localStorage` under
  `geogeniet-save-v1`, och att introt är visat under `geogeniet-intro-seen-v1`.

## Struktur

```
App.tsx                      spelläge, stjärnor, vinstruta, sparning
constants.ts                 nivåer och klistermärken
audio.ts                     ljudeffekter och bakgrundsmusik
components/LevelMap.tsx      nivåkartan, ljud av/på, utmaningsläge
components/GameBoard.tsx     dra och släpp, ledtråd, nedräkning
components/ShapeRender.tsx   ritar formerna som SVG
components/StickerBook.tsx   klistermärkesboken
components/InfoModal.tsx     information för vuxna
components/IntroScreen.tsx   intro med Geo
deploy/nginx.conf            nginx-konfiguration
```

## Licens

MIT – se [LICENSE](LICENSE).
