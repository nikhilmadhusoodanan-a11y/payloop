

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, type LucideProps } from "lucide-react";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { TextRoll } from "@/components/core/text-roll";

interface BalanceCardProps {
  tokenName: string;
  tokenIcon: ElementType;
  balance: number;
  balanceUsd: number;
  isLowBalance?: boolean;
}

export function BalanceCard({
  tokenName,
  tokenIcon: TokenIcon,
  balance,
  balanceUsd,
  isLowBalance = false,
}: BalanceCardProps) {
    const [currentBalance, setCurrentBalance] = useState(balance);
    const [currentBalanceUsd, setCurrentBalanceUsd] = useState(balanceUsd);

    useEffect(() => {
        const interval = setInterval(() => {
            const balanceChange = (Math.random() - 0.5) * (balance / 100);
            setCurrentBalance(prev => prev + balanceChange);

            const usdChange = (Math.random() - 0.5) * (balanceUsd / 100);
            setCurrentBalanceUsd(prev => prev + usdChange);
        }, 5000);

        return () => clearInterval(interval);
    }, [balance, balanceUsd]);


  return (
    <Card className="bg-background/50 border-border/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {tokenName}
        </CardTitle>
        <TokenIcon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-headline text-foreground">
             <TextRoll>
                {currentBalance.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 4,
                })}
            </TextRoll>
        </div>
        <p className="text-xs text-muted-foreground">
           <TextRoll>
             {`$${currentBalanceUsd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`}
            </TextRoll>
        </p>
        {isLowBalance && (
           <Badge variant="secondary" className="mt-2">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Low
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
