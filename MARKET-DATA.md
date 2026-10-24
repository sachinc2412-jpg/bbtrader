# Last available market charts

Quotes and OHLC history still come from the same existing Kraken source; Indian index data comes from the existing Yahoo Finance source. No synthetic prices or randomly generated candles are used.

The UI previously cleared all successful data when any polling request failed. It now retains validated snapshots, persists them locally, and keeps same-symbol/interval candles visible while reconnecting. Changing a symbol or interval never reuses a different instrument's history. Shared quote data still drives the chart's price marker and quote cards.

On a cold visit, if feeds remain unavailable/slow, public/market-backup.json supplies a dated capture of successful API responses from 24 October 2026. This file is fetched only as needed and includes all supported chart options. These fallback quotes are explicitly marked Last available with their original timestamps. It is an emergency baseline, not a continually refreshed data service; successful polls supersede it and persist newer responses in each browser. A future scheduled server-side snapshot job can refresh this baseline without a release if required.

Closed Indian sessions keep their last available index history and indicate Market closed. Kraken spot data is not assumed to close with traditional forex or equity sessions. Crypto remains live when its feed is reachable.

Seven Node tests cover historical-vs-live validation, failed requests, persisted reloads, symbol/interval isolation, no extra candles for explicitly closed sessions, corrupt cache rejection, and validation of all captured fallback histories. Syntax checks cover browser and backend modules. HTTP API requests were verified live. No full browser/device execution was performed in this environment.
