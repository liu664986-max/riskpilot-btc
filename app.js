const state = {
  briefMarkdown: ""
};

const $ = (id) => document.getElementById(id);

function numberValue(id) {
  return Number($(id).value || 0);
}

function usd(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function pct(value) {
  return `${value.toFixed(2)}%`;
}

function classifyRisk({ price, support, resistance, funding }) {
  const supportDistance = ((price - support) / price) * 100;
  const resistanceDistance = ((resistance - price) / price) * 100;
  const rangeWidth = ((resistance - support) / price) * 100;
  let level = "normal";
  let label = "Balanced";
  let reason = "Price is inside the defined range. Wait for confirmation instead of forcing trades.";

  if (price < support) {
    level = "danger";
    label = "Breakdown risk";
    reason = "Price is below support. Treat long exposure as invalid until price recovers the level.";
  } else if (price > resistance) {
    level = "warning";
    label = "Breakout validation";
    reason = "Price is above resistance. Watch for failed breakout behavior before increasing risk.";
  } else if (supportDistance < 1.5) {
    level = "warning";
    label = "Support test";
    reason = "Price is close to support. A clean break can trigger forced selling and emotional exits.";
  } else if (resistanceDistance < 1.5) {
    level = "warning";
    label = "Chase risk";
    reason = "Price is close to resistance. Avoid chasing the first breakout candle.";
  }

  if (funding.toLowerCase().includes("elevated")) {
    level = level === "danger" ? "danger" : "warning";
    reason += " Funding is crowded, so liquidation risk deserves extra attention.";
  }

  return { level, label, reason, supportDistance, resistanceDistance, rangeWidth };
}

function buildBrief() {
  const language = $("language").value;
  const price = numberValue("price");
  const high24 = numberValue("high24");
  const low24 = numberValue("low24");
  const support = numberValue("support");
  const resistance = numberValue("resistance");
  const funding = $("funding").value;
  const news = $("news").value.trim();
  const risk = classifyRisk({ price, support, resistance, funding });
  const today = new Date().toISOString().slice(0, 10);

  if (language === "zh") {
    state.briefMarkdown = `# RiskPilot BTC 风险简报 - ${today}

> 本简报只做风险管理和信息整理，不构成投资建议。

## 当前状态
- 当前价格：${usd(price)}
- 24h 高点：${usd(high24)}
- 24h 低点：${usd(low24)}
- 支撑：${usd(support)}
- 阻力：${usd(resistance)}
- 资金费率：${funding}

## 风险判断
${risk.label}：${risk.reason}

## 今日重点
${news}

## 行动清单
- 先决定最多亏损，再决定仓位。
- 靠近阻力时，不追第一根突破。
- 跌破支撑时，先控制风险，再找下一笔机会。
- 连续两笔违反计划后，停止当天主动交易。
`;
  } else {
    state.briefMarkdown = `# RiskPilot BTC Risk Brief - ${today}

> This brief is for risk management and information organization only. It is not financial advice.

## Market State
- BTC price: ${usd(price)}
- 24h high: ${usd(high24)}
- 24h low: ${usd(low24)}
- Support: ${usd(support)}
- Resistance: ${usd(resistance)}
- Funding: ${funding}

## Risk Read
${risk.label}: ${risk.reason}

## Today's Focus
${news}

## Action Checklist
- Define max loss before sizing the trade.
- Near resistance, do not chase the first breakout candle.
- Below support, reduce risk before looking for a new setup.
- After two plan violations, stop active trading for the day.
`;
  }

  return { risk, markdown: state.briefMarkdown };
}

function renderBrief() {
  const { risk } = buildBrief();
  const sections = state.briefMarkdown
    .split("\n## ")
    .map((block, index) => {
      if (index === 0) {
        return `<section><h3>${block.split("\n")[0].replace("# ", "")}</h3><p>${block.split("\n").slice(2).join("<br>")}</p></section>`;
      }

      const [title, ...lines] = block.split("\n");
      const body = lines
        .filter(Boolean)
        .map((line) => {
          if (line.startsWith("- ")) return `<li>${line.slice(2)}</li>`;
          return `<p>${line}</p>`;
        });
      const hasList = body.some((line) => line.startsWith("<li>"));
      return `<section><h3>${title}</h3>${hasList ? `<ul>${body.join("")}</ul>` : body.join("")}</section>`;
    })
    .join("");

  $("briefOutput").innerHTML = sections;
  $("riskBadge").textContent = risk.label;
  $("riskBadge").className = `badge ${risk.level === "normal" ? "" : risk.level}`;
}

function calculatePosition() {
  const equity = numberValue("equity");
  const riskPercent = numberValue("riskPercent");
  const entry = numberValue("entry");
  const stop = numberValue("stop");
  const maxLoss = equity * (riskPercent / 100);
  const stopDistance = Math.abs(entry - stop);

  if (!equity || !riskPercent || !entry || !stop || stopDistance === 0) {
    $("positionOutput").innerHTML = "Enter valid values with a stop price different from entry.";
    return;
  }

  const btcSize = maxLoss / stopDistance;
  const notional = btcSize * entry;
  const leverageWarning = notional > equity ? "This notional is larger than account equity. Avoid adding leverage unless the risk is intentional and capped." : "This notional fits inside account equity before fees and slippage.";

  $("positionOutput").innerHTML = `
    <strong>${btcSize.toFixed(4)} BTC max</strong>
    <p>Max loss: ${usd(maxLoss)}. Approx notional: ${usd(notional)}.</p>
    <p>${leverageWarning}</p>
  `;
}

function scoreJournal() {
  const checks = ["hadPlan", "hadStop", "respectedSize", "avoidedChase"];
  const passed = checks.filter((id) => $(id).checked).length;
  const score = Math.round((passed / checks.length) * 100);
  let read = "Strong discipline. Keep logging the setup and outcome.";

  if (score < 50) {
    read = "High behavior risk. Reduce size and require a written plan before the next trade.";
  } else if (score < 75) {
    read = "Mixed discipline. One process failure can erase a correct market view.";
  }

  $("journalOutput").innerHTML = `
    <strong>${score}/100</strong>
    <p>${read}</p>
    <p>Plan: ${$("tradePlan").value.trim()}</p>
  `;
}

function exportMarkdown() {
  if (!state.briefMarkdown) renderBrief();
  const blob = new Blob([state.briefMarkdown], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "riskpilot-btc-brief.md";
  link.click();
  URL.revokeObjectURL(url);
}

function loadDemo() {
  $("price").value = 59918;
  $("high24").value = 61000;
  $("low24").value = 58800;
  $("support").value = 58800;
  $("resistance").value = 61000;
  $("funding").value = "Neutral";
  $("news").value = "Watch whether BTC can reclaim 60,000. If the bounce is weak and price loses 58,800 again, reduce risk before looking for a new setup.";
  $("equity").value = 5000;
  $("riskPercent").value = 1;
  $("entry").value = 60000;
  $("stop").value = 58800;
  renderBrief();
  calculatePosition();
  scoreJournal();
}

$("riskForm").addEventListener("submit", (event) => {
  event.preventDefault();
  renderBrief();
});

$("positionForm").addEventListener("submit", (event) => {
  event.preventDefault();
  calculatePosition();
});

$("journalForm").addEventListener("submit", (event) => {
  event.preventDefault();
  scoreJournal();
});

$("exportReport").addEventListener("click", exportMarkdown);
$("loadDemo").addEventListener("click", loadDemo);

loadDemo();
