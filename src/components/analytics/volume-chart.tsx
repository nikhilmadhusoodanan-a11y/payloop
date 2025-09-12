"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
} from "@/components/ui/chart"

const chartData = [
  { date: "2024-01", volume: 12000 },
  { date: "2024-02", volume: 18000 },
  { date: "2024-03", volume: 15000 },
  { date: "2024-04", volume: 22000 },
  { date: "2024-05", volume: 25000 },
  { date: "2024-06", volume: 23000 },
  { date: "2024-07", volume: 30000 },
];

const chartConfig = {
  volume: {
    label: "Volume",
    color: "hsl(var(--primary))",
  },
}

export function VolumeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Volume Over Time</CardTitle>
        <CardDescription>Total transaction volume over the last 7 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                })
              }}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="volume" fill="var(--color-volume)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
