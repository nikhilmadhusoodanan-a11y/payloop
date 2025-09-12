"use client"

import * as React from "react"
import { Pie, PieChart, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const chartData = [
  { token: "USDC", volume: 90500, fill: "hsl(var(--primary))" },
  { token: "ETH", volume: 25680, fill: "hsl(var(--info))" },
  { token: "DAI", volume: 10500, fill: "hsl(var(--secondary))" },
]

const chartConfig = {
  volume: {
    label: "Volume",
  },
  USDC: {
    label: "USDC",
    color: "hsl(var(--primary))",
  },
  ETH: {
    label: "ETH",
    color: "hsl(var(--info))",
  },
  DAI: {
    label: "DAI",
    color: "hsl(var(--secondary))",
  },
}

export function TokenDistributionChart() {
  const totalVolume = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.volume, 0)
  }, [])

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Token Distribution</CardTitle>
        <CardDescription>Most used coin by volume</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="volume"
              nameKey="token"
              innerRadius={60}
              strokeWidth={5}
              labelLine={false}
              label={({ percent, midAngle, outerRadius }) => {
                const RADIAN = Math.PI / 180;
                const radius = outerRadius + 15;
                const x = 150 + radius * Math.cos(-midAngle * RADIAN);
                const y = 150 + radius * Math.sin(-midAngle * RADIAN);
                return (
                  <text
                    x={x}
                    y={y}
                    fill="hsl(var(--foreground))"
                    textAnchor={x > 150 ? "start" : "end"}
                    dominantBaseline="central"
                    className="text-xs"
                  >
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
            >
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
            </Pie>
             <ChartLegend
                content={<ChartLegendContent nameKey="token" />}
                className="flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
