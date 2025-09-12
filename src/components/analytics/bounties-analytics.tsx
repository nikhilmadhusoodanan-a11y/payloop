
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { DollarSign, Gift, User, Trophy, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { StatCard } from "./stat-card";
import MagicBento from "../dashboard/magic-bento";


const bountyStats = [
    { title: "Total Bounties Paid", value: "$4,210", icon: Trophy, change: "+15.2% this month" },
    { title: "Top Referrer", value: "creator.eth", icon: User, change: "12 bounties" },
    { title: "Most Common Bounty", value: "2%", icon: Gift, change: "45% of bills" },
    { title: "Avg. Bounty Amount", value: "$21.05", icon: DollarSign, change: "+$1.50 vs last month" },
];

const bountyChartData = [
  { month: "January", income: 250 },
  { month: "February", income: 410 },
  { month: "March", income: 520 },
  { month: "April", income: 480 },
  { month: "May", income: 650 },
  { month: "June", income: 820 },
  { month: "July", income: 1080 },
]

const chartConfig = {
  income: {
    label: "Bounty Income ($)",
    color: "hsl(var(--primary))",
  },
}

const recentBounties = [
    { billId: 'bill_001', billTitle: "Co-working Space Rent", amount: "24 USDC", recipient: "creator.eth", date: "2024-07-15" },
    { billId: 'bill_002', billTitle: "Team Lunch", amount: "4.20 DAI", recipient: "creator.eth", date: "2024-07-14" },
    { billId: 'bill_003', billTitle: "Q3 Designer Payout", amount: "100 USDC", recipient: "referrer.eth", date: "2024-07-13" },
    { billId: 'bill_008', billTitle: "API Subscription", amount: "0.5 USDC", recipient: "creator.eth", date: "2024-06-25" },
];

export function BountiesAnalytics() {
  return (
    <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {bountyStats.map((stat) => (
                <MagicBento key={stat.title}
                    textAutoHide={false}
                    enableStars={true}
                    enableSpotlight={true}
                    enableBorderGlow={true}
                    enableTilt={true}
                    enableMagnetism={true}
                    clickEffect={true}
                    spotlightRadius={200}
                    particleCount={10}
                    glowColor="263, 76%, 59%"
                >
                    <StatCard {...stat} />
                </MagicBento>
            ))}
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Bounty Income Over Time</CardTitle>
                <CardDescription>Monthly bounty income in USD.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[350px] w-full">
                    <BarChart accessibilityLayer data={bountyChartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                        />
                        <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Bar dataKey="income" fill="var(--color-income)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Recent Bounty Payouts</CardTitle>
                <CardDescription>A list of the most recently paid out bounties.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="rounded-lg border overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Associated Bill</TableHead>
                                <TableHead>Bounty Amount</TableHead>
                                <TableHead>Recipient</TableHead>
                                <TableHead>Date Paid</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {recentBounties.map((bounty) => (
                            <TableRow key={bounty.billId}>
                                <TableCell>
                                    <Button variant="link" asChild className="p-0 h-auto">
                                        <a href={`/bills/${bounty.billId}`} target="_blank">
                                            {bounty.billTitle}
                                            <ExternalLink className="h-3 w-3 ml-1.5" />
                                        </a>
                                    </Button>
                                </TableCell>
                                <TableCell className="font-medium">{bounty.amount}</TableCell>
                                <TableCell className="font-mono text-xs">{bounty.recipient}</TableCell>
                                <TableCell>{bounty.date}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
