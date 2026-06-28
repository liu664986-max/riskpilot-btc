#!/usr/bin/env python3
import argparse
from datetime import datetime


def money(value):
    return f"${float(value):,.0f}"


def build_report(args):
    price = float(args.price)
    high24 = float(args.high24)
    low24 = float(args.low24)
    support = float(args.support)
    resistance = float(args.resistance)

    distance_to_support = (price - support) / price * 100
    distance_to_resistance = (resistance - price) / price * 100

    if price < support:
        structure = "跌破支撑，先按风险释放处理"
    elif price > resistance:
        structure = "突破阻力，但需要确认是否有效"
    elif distance_to_support < distance_to_resistance:
        structure = "靠近支撑，重点观察是否破位"
    else:
        structure = "靠近阻力，重点防范追涨和假突破"

    today = datetime.now().strftime("%Y-%m-%d")

    return f"""# BTC 风险简报 - {today}

> 本简报只做风险管理和信息整理，不构成投资建议。

## 1. 当前状态

- 当前价格：{money(price)}
- 24h 高点：{money(high24)}
- 24h 低点：{money(low24)}
- 结构判断：{args.trend}
- 资金费率：{args.funding}

自动风险判断：**{structure}**

## 2. 关键价位

- 支撑：{money(support)}
- 阻力：{money(resistance)}
- 距离支撑：{distance_to_support:.2f}%
- 距离阻力：{distance_to_resistance:.2f}%

## 3. 今日重点

{args.news}

## 4. 行动清单

- 价格接近阻力时，不追第一根突破。
- 价格跌破支撑时，先确认亏损是否超出计划。
- 没有明确止损价，不开新仓。
- 连续亏损 2 笔后，停止当天主动交易。

## 5. 仓位纪律

单笔最大亏损建议控制在账户权益的 0.5%-1%。先决定最多亏多少钱，再倒推仓位，而不是先下单再找理由。

## 6. 给订阅者的一句话

今天的核心不是预测，而是避免在区间边缘做情绪化交易。
"""


def parse_args():
    parser = argparse.ArgumentParser(description="Generate a BTC risk brief markdown report.")
    parser.add_argument("--price", required=True, help="Current BTC price.")
    parser.add_argument("--high24", required=True, help="24h high.")
    parser.add_argument("--low24", required=True, help="24h low.")
    parser.add_argument("--support", required=True, help="Key support price.")
    parser.add_argument("--resistance", required=True, help="Key resistance price.")
    parser.add_argument("--trend", required=True, help="Human-readable market structure.")
    parser.add_argument("--funding", required=True, help="Funding rate description.")
    parser.add_argument("--news", required=True, help="Important context for today.")
    parser.add_argument("--output", default="today_report.md", help="Output markdown path.")
    return parser.parse_args()


def main():
    args = parse_args()
    report = build_report(args)
    with open(args.output, "w", encoding="utf-8") as file:
        file.write(report)
    print(f"Wrote {args.output}")


if __name__ == "__main__":
    main()
