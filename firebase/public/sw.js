importScripts('/_nuxt/workbox.476439e0.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "nuxt-starter",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.7a732fe3f4e04da5d3fc.js",
    "revision": "4da0476c421b69afcc84b6eb3e8c5c4f"
  },
  {
    "url": "/_nuxt/common.3159d5a8e66f8e89d18f7d783719695c.css",
    "revision": "51ee2a54f1836c97ffcc7a0ed6f2cfb7"
  },
  {
    "url": "/_nuxt/common.c233e8f494561a1521de.js",
    "revision": "56741103e54c658d040c36064ce58a59"
  },
  {
    "url": "/_nuxt/layouts/default.ef3274e30a2ec3f12462.js",
    "revision": "eb10aae11cab67d6868f0ba09558cdd9"
  },
  {
    "url": "/_nuxt/manifest.5d8bcfa0d2b9c5f97271.js",
    "revision": "af57ed338aaca78b6b396ad1c9bf5223"
  },
  {
    "url": "/_nuxt/pages/cikis.b9d075e32c0f271650ee.js",
    "revision": "aecbc6b7f61c5c4774a1ba22882d30ab"
  },
  {
    "url": "/_nuxt/pages/index.c4a879035ccacd31c61e.js",
    "revision": "0ddb049823438a2d7268479599e37d86"
  },
  {
    "url": "/_nuxt/pages/profil.6bf26aa18637004bddec.js",
    "revision": "02dc3afaeab8619f625a13ea1e0f9754"
  },
  {
    "url": "/_nuxt/pages/sikca-sorulan-sorular.2f7458fe4bd91dd9c862.js",
    "revision": "5895f93a644aca2b62acddaf6d3e92a0"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

