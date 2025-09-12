

"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BalanceCard } from "./balance-card";
import { EthLogo } from "@/components/icons";
import { CircleDollarSign, Wallet } from "lucide-react";
import MagicBento from "./magic-bento";
import Link from "next/link";
import { TextRoll } from "@/components/core/text-roll";

const initialBalances = [
  {
    tokenName: "ETH",
    tokenIcon: EthLogo,
    balance: 2.54,
    balanceUsd: 8910.12,
    isLowBalance: true,
  },
  {
    tokenName: "USDC",
    tokenIcon: CircleDollarSign,
    balance: 10432.1,
    balanceUsd: 10432.1,
  },
  {
    tokenName: "DAI",
    tokenIcon: CircleDollarSign,
    balance: 5678.9,
    balanceUsd: 5678.9,
  },
];

export function WalletBalances() {
    const totalBalance = initialBalances.reduce((acc, curr) => acc + curr.balanceUsd, 0);
    const walletId = "dev.eth";
    const [currentBalance, setCurrentBalance] = useState(totalBalance);

    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate balance fluctuation
            const change = (Math.random() - 0.5) * (totalBalance / 100);
            setCurrentBalance(prev => prev + change);
        }, 5000); // Fluctuate every 5 seconds

        return () => clearInterval(interval);
    }, [totalBalance]);
    
  return (
    <MagicBento
        textAutoHide={false}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={true}
        enableMagnetism={true}
        clickEffect={true}
        spotlightRadius={400}
        particleCount={20}
        glowColor="263, 76%, 59%"
    >
        <div className="card__header">
            <div className="flex items-start justify-between">
                <div>
                    <CardTitle className="font-headline text-muted-foreground">Total Wallet Balance</CardTitle>
                    <div className="text-3xl sm:text-4xl font-bold font-headline mt-2 text-foreground">
                         <TextRoll>
                            {`$${currentBalance.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}`}
                        </TextRoll>
                    </div>
                    <p className="text-sm font-mono text-muted-foreground mt-1 truncate">Connected as {walletId}</p>
                </div>
                <Link href="/settings">
                <div className="bg-primary/20 p-3 sm:p-4 rounded-lg hover:bg-primary/30 transition-colors cursor-pointer">
                    <Wallet className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                </Link>
            </div>
        </div>
        <div className="card__content">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {initialBalances.map((balance) => (
                <BalanceCard key={balance.tokenName} {...balance} />
                ))}
            </div>
        </div>
    </MagicBento>
  );
}
