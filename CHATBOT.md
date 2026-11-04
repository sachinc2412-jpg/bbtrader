# BBTrader website assistant

The public website now includes a lightweight, rule-based enquiry chatbot. It is not a generative AI or a live agent. No provider key, paid AI service or new backend is required.

- Account registration and login point to the existing bbtrader.live portal.
- Market and chart answers use the website's current content.
- Funding, pricing, eligibility and account-specific questions direct visitors to the team rather than inventing terms or accessing account data.
- Support handoff opens WhatsApp at +91 70637 47653 with a predefined, topic-specific enquiry. Visitors review and send it themselves. Typed messages are never included in handoff URLs.
- Conversations stay in page memory; no transcript storage, CRM submission or analytics were added. Restart clears the conversation; reloading also clears it.
- The circular chat launcher sits above the existing WhatsApp button. The panel supports keyboard focus, Escape to close, mobile viewport sizing and reduced motion.

Edit approved answers and keyword routing in `public/chat-knowledge.js`. UI behavior is in `public/chatbot.js`; styling is isolated in `public/chatbot.css`. The existing page, chart data, account links and WhatsApp hover interaction remain intact.

Validation: `npm run check` and `npm test`.
