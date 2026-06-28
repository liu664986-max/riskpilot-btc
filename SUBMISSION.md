# RiskPilot BTC Hackathon Submission

## Project Name

RiskPilot BTC

## Short Description

RiskPilot BTC is an AI-ready risk cockpit for Bitcoin traders. It turns market context into a daily risk brief, max-loss-first position sizing, and trade discipline scoring without giving buy/sell signals or financial advice.

## Track Fit

Recommended track: Unicorn Track.

RiskPilot BTC is product-led: it has a clear user, a recurring workflow, a paid subscription path, and a responsible risk-management boundary. The current MVP runs locally and is ready to be extended with AMD Developer Cloud and Fireworks-compatible inference for richer market summaries.

## Demo Flow

1. Open the app.
2. Click "Load Demo".
3. Generate a BTC risk brief from price, support, resistance, funding, and macro context.
4. Calculate maximum position size from account equity, entry price, stop price, and max loss percentage.
5. Score a sample trade using discipline checks.
6. Export the risk brief as Markdown.

## Run Locally

```bash
python3 serve.py
```

Then open:

```text
http://localhost:8080
```

## Run With Docker

```bash
docker build -t riskpilot-btc .
docker run --rm -p 8080:8080 riskpilot-btc
```

Then open:

```text
http://localhost:8080
```

## What Is Implemented

- Static web MVP
- BTC risk brief generator
- English and Chinese output
- Risk badge classification
- Max-loss-first position sizing
- Trade discipline scoring
- Markdown export
- Dockerfile for containerized submission

## What Comes Next

- Add Fireworks-compatible LLM generation
- Deploy on AMD Developer Cloud
- Add live BTC price and funding data
- Add user accounts and saved journals
- Add community dashboard for trading groups

## Compliance Boundary

RiskPilot BTC is not an automated trading bot and does not provide buy/sell signals. It helps users organize risk, size positions from maximum acceptable loss, and review discipline after trades.
