# RiskPilot BTC

RiskPilot BTC is an AI-ready risk cockpit for Bitcoin traders: daily risk briefs, max-loss-first position sizing, and trade discipline reviews without giving buy/sell signals or financial advice.

The project started as a low-budget BTC cash-flow experiment and is now shaped as a hackathon MVP for online AI/Web3 competitions.

## Problem

Retail BTC traders are overloaded with charts, news, influencer takes, and leverage products. Many losses come from behavior: chasing breakouts, oversizing positions, ignoring invalidation, and continuing to trade after plan violations.

## Solution

RiskPilot BTC turns market context into a repeatable risk workflow:

- Generate a daily BTC risk brief from price, range, support, resistance, funding, and macro notes.
- Classify risk as balanced, support test, chase risk, breakdown risk, or breakout validation.
- Calculate maximum BTC position size from account equity, entry, stop, and acceptable loss.
- Score trade discipline after each trade.
- Export the brief as Markdown for sharing or journaling.

This is not a trading bot and not a signal service.

## Demo

Open the app, click `Load Demo`, then:

1. Generate the risk brief.
2. Calculate max position size.
3. Score trade discipline.
4. Export the brief as Markdown.

## Run Locally

```bash
python3 serve.py
```

Then open:

```text
http://127.0.0.1:8080
```

## Run With Docker

```bash
docker build -t riskpilot-btc .
docker run --rm -p 8080:8080 riskpilot-btc
```

Then open:

```text
http://127.0.0.1:8080
```

## Files

- `index.html` - main app
- `styles.css` - responsive interface styling
- `app.js` - risk brief, position sizing, journal scoring, Markdown export
- `serve.py` - local static server that avoids reverse DNS delays
- `Dockerfile` - containerized submission runtime
- `SUBMISSION.md` - hackathon submission copy
- `demo_script.md` - 2-minute demo video script
- `hackathon_pipeline.md` - target competitions and execution plan
- `hackathon_tracker.csv` - hackathon opportunity tracker

## Hackathon Target

Primary target: AMD Developer Hackathon: ACT II on lablab.ai.

Recommended track: Unicorn Track, because RiskPilot BTC is product-led and can be extended with AMD Developer Cloud and Fireworks-compatible inference.

## Commercial Path

- Individual subscription: $9/week or $29/month
- Trading community dashboard: $99/month
- API/report generation for trading educators

The original sales materials are still included:

- `landing.html`
- `outreach_messages.md`
- `sales_tracker.csv`
- `today_execution_plan.md`

## Compliance Boundary

RiskPilot BTC provides risk organization, position sizing, and discipline review. It does not provide financial advice, trading signals, automated execution, or profit guarantees.
