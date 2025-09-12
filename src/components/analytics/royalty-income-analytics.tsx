
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
import { Gem, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import MagicBento from "../dashboard/magic-bento";

const incomeData = [
  { month: "January", income: 2.5 },
  { month: "February", income: 3.1 },
  { month: "March", income: 4.2 },
  { month: "April", income: 3.8 },
  { month: "May", income: 5.5 },
  { month: "June", income: 6.2 },
  { month: "July", income: 7.1 },
]

const chartConfig = {
  income: {
    label: "Income (ETH)",
    color: "hsl(var(--primary))",
  },
}

const collectionData = [
  { collection: "CryptoPunks", income: 10.5, token: "ETH", transactions: 5 },
  { collection: "Bored Ape Yacht Club", income: 8.2, token: "ETH", transactions: 3 },
  { collection: "Doodles", income: 5.1, token: "ETH", transactions: 8 },
  { collection: "Fidenza", income: 15000, token: "USDC", transactions: 12 },
  { collection: "Moonbirds", income: 3.0, token: "ETH", transactions: 2 },
]

const totalIncome = collectionData.reduce((acc, item) => {
    if (item.token === "ETH") {
        acc.eth += item.income;
    } else if (item.token === "USDC") {
        acc.usdc += item.income;
    }
    return acc;
}, { eth: 0, usdc: 0 });

export function RoyaltyIncomeAnalytics() {
  return (
    <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             <MagicBento
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
                <Card>
                    <CardHeader>
                        <CardTitle>Total ETH Royalties</CardTitle>
                        <CardDescription>All-time royalty income in ETH.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold font-headline">{totalIncome.eth.toFixed(2)} ETH</div>
                    </CardContent>
                </Card>
            </MagicBento>
             <MagicBento
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
                <Card>
                    <CardHeader>
                        <CardTitle>Total USDC Royalties</CardTitle>
                        <CardDescription>All-time royalty income in USDC.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold font-headline">${totalIncome.usdc.toLocaleString()}</div>
                    </CardContent>
                </Card>
            </MagicBento>
            <MagicBento
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
                <Card>
                    <CardHeader>
                        <CardTitle>Top Earning Collection</CardTitle>
                        <CardDescription>The collection generating the most royalties.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold font-headline">CryptoPunks</div>
                        <p className="text-muted-foreground">10.5 ETH</p>
                    </CardContent>
                </Card>
            </MagicBento>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Royalty Income Over Time</CardTitle>
                <CardDescription>Monthly royalty income in ETH.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[350px] w-full">
                <BarChart accessibilityLayer data={incomeData}>
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
                    tickFormatter={(value) => `${value} ETH`}
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
                <CardTitle>Income by Collection</CardTitle>
                <CardDescription>A breakdown of royalty income by NFT collection.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-lg border overflow-x-auto">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Collection</TableHead>
                        <TableHead>Total Income</TableHead>
                        <TableHead className="text-right">Transactions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {collectionData.map((item) => (
                        <TableRow key={item.collection}>
                        <TableCell className="font-medium">{item.collection}</TableCell>
                        <TableCell>{item.income.toLocaleString()} {item.token}</TableCell>
                        <TableCell className="text-right">{item.transactions}</TableCell>
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
