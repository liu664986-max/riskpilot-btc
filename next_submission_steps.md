# Next Submission Steps

## 1. Create GitHub Repository

Create a new public repository:

```text
riskpilot-btc
```

Description:

```text
AI-ready BTC risk cockpit for daily risk briefs, max-loss-first position sizing, and trade discipline reviews.
```

Then push this local branch:

```bash
git remote add origin https://github.com/YOUR_USERNAME/riskpilot-btc.git
git push -u origin codex/riskpilot-btc
```

If GitHub asks, keep the repository public for hackathon judging.

## 2. Deploy Demo

Fastest options:

- Vercel: import the GitHub repo, framework preset `Other`, no build command.
- Netlify: drag the repo folder or connect GitHub, publish directory `/`.
- Render static site: connect GitHub, publish directory `/`.

If a platform asks for a start command, use:

```bash
python3 serve.py
```

## 3. Record Demo Video

Use `demo_script.md`.

Required shots:

1. Open the app.
2. Click `Load Demo`.
3. Show the generated risk brief.
4. Show max position sizing.
5. Show discipline score.
6. Click `Export Markdown`.

Keep the video under 2 minutes.

## 4. lablab Submission Fields

Project name:

```text
RiskPilot BTC
```

Short description:

```text
RiskPilot BTC is an AI-ready risk cockpit for Bitcoin traders. It generates daily risk briefs, calculates max position size from acceptable loss, and scores trade discipline without giving trading signals or financial advice.
```

Long description:

```text
Retail BTC traders are overloaded with market noise, leverage, and emotional decision pressure. RiskPilot BTC turns market context into a repeatable risk workflow: daily risk brief, risk classification, max-loss-first position sizing, and trade discipline review. It is not a trading bot or signal service; it helps traders reduce preventable behavior risk.
```

Track:

```text
Unicorn Track
```

GitHub repository:

```text
https://github.com/YOUR_USERNAME/riskpilot-btc
```

Demo URL:

```text
YOUR_DEPLOYED_URL
```

Video URL:

```text
YOUR_VIDEO_URL
```

## 5. What To Improve Before Deadline

- Add Fireworks-compatible LLM generation.
- Add live BTC spot price.
- Add a saved journal list.
- Add an AMD Developer Cloud deployment note.
- Add screenshots to README.
