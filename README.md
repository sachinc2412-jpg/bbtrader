# BBTrader

Responsive trading-market landing page with native synchronized charts, Indian indices, forex and crypto quotes, animated city artwork and scroll-driven market chapters.

## Hosting

Vercel serves `public/` and the Node.js handler at `api/[route].js`. No API keys or build dependencies are required. API routes: `/api/markets`, `/api/history?symbol=BTC&interval=60`, `/api/india`. They reuse the market parsers in `worker/api.js`.

Data sources: Kraken public spot ticker and OHLC; Yahoo Finance Indian-index quotes and history (may be delayed). Feed failures show unavailable states.

The Login and Sign up header buttons are placeholders with `data-auth-route` targets. Connect them to your authentication service later; no accounts are created yet.

## Editing

HTML: `public/index.html`; styles: `public/style.css`; market logic: `public/app.js` and `public/market-model.js`; scroll motion: `public/story-motion.js`.

The original Sites Worker build remains available using `node scripts/embed-assets.mjs` then `bash scripts/build.sh`.
