# BBTrader Tawk.to integration

The user-provided Tawk.to widget replaces the local rule-based assistant. The existing floating WhatsApp button and prefilled service-enquiry message are preserved.

- Property: `6aeaed73b78df63c3544ab14`
- Widget: `1k6iqv3li`
- Embed is loaded asynchronously before the end of `public/index.html`.
- Official `Tawk_API.customStyle` placement puts the launcher above WhatsApp: desktop 24 px right / 92 px bottom, mobile 16 px right / 84 px bottom.
- Conversation handling, agent availability, forms, retention, canned replies and any automated/AI answers are controlled in the Tawk.to account. The embed alone does not configure an automated knowledge base.
- The previous local assistant markup, assets and tests have been removed to avoid duplicate launchers and replies.
- No trading-account credentials or CRM records are passed to the widget by our integration. Tawk.to itself manages visitor/chat data according to its account configuration.

## Suggested content to configure manually

Greeting: “Welcome to BBTrader — Broker Bhai Trader. How can we help you today?”

1. How do I open a BBTrader account? — Start at https://bbtrader.live/register. Contact the team if you need help completing registration.
2. How do I log in or get password help? — Sign in at https://bbtrader.live/login. Contact support if you cannot access your account. Never share your password or OTP in chat.
3. Which markets can I explore? — The public website displays Indian benchmarks, forex pairs and crypto quotes/charts. Ask the team which products are available for your account and location.
4. What is the minimum deposit and what fees apply? — Ask the team for the current minimum deposit, charges and account terms. Do not quote an amount until the business confirms it.
5. How can I deposit or withdraw funds? — Use the account portal or contact support for available methods, processing times and request status. Do not collect payment details in chat.
6. What documents are required for verification? — Ask the team for the current KYC requirements and the secure submission process. Do not request identity-document uploads through chat without a confirmed business process.
7. Why is a chart unavailable or a price delayed? — Check the quote source and update time, then refresh the page. Some data may be delayed and historical data may be displayed during a feed interruption.
8. How do I speak to the BBTrader team? — Contact WhatsApp +91 70637 47653: https://wa.me/917063747653.

Suggested enquiry fields: name, topic/question, and optional email or phone for a reply. Configure business hours and an offline message using the team's real availability; do not claim 24/7 human support unless confirmed.
