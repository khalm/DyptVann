// DyptVann service worker – gjør appen brukbar uten internett.
const VERSION = '1.1.0';
const SHELL = 'dk-shell-' + VERSION;
const TILES = 'dk-tiles';
const SHELL_FILES = [
  './', './index.html', './manifest.webmanifest', './icon.svg', './icon-192.png', './icon-512.png',
  './leaflet/leaflet.css', './leaflet/leaflet.js',
  './leaflet/images/layers.png', './leaflet/images/layers-2x.png',
  './leaflet/images/marker-icon.png', './leaflet/images/marker-icon-2x.png', './leaflet/images/marker-shadow.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(SHELL_FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k.startsWith('dk-shell-') && k !== SHELL).map(k => caches.delete(k))
  )).then(() => self.clients.claim()));
});

// Samme nøkkel-regel som tileKey() i index.html, så WMS-fliser alltid treffer cachen.
function tileKey(u) {
  const url = new URL(u);
  if (![...url.searchParams.keys()].some(k => k.toLowerCase() === 'bbox')) return url.href;
  const ps = [...url.searchParams.entries()].map(([k, v]) => {
    k = k.toLowerCase();
    if (k === 'bbox') v = v.split(',').map(n => (+n).toFixed(1)).join(',');
    return [k, v.toLowerCase()];
  }).sort();
  return url.origin + url.pathname + '?' + ps.map(([k, v]) => k + '=' + v).join('&');
}
const isTile = u =>
  /cache\.kartverket\.no|arcgisonline\.com\/.*\/tile\//.test(u) ||
  /request=getmap/i.test(u) || /\/MapServer\/export\?/.test(u);

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = req.url;

  // Kartfliser: cache først, ellers nett (og lagre det du har sett).
  if (isTile(url)) {
    const key = tileKey(url);
    e.respondWith(caches.open(TILES).then(async c => {
      const hit = await c.match(key);
      if (hit) return hit;
      try {
        const r = await fetch(req);
        if (r.ok || r.type === 'opaque') c.put(key, r.clone());
        return r;
      } catch {
        return new Response('', { status: 504 });
      }
    }));
    return;
  }

  // Appen selv: nett først (for oppdateringer), cache hvis offline.
  if (url.startsWith(self.location.origin)) {
    e.respondWith(fetch(req).then(r => {
      if (r.ok) { const copy = r.clone(); caches.open(SHELL).then(c => c.put(req, copy)); }
      return r;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('./index.html'))));
  }
});
