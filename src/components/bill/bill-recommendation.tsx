"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Wand2, Loader2, ServerCrash } from "lucide-react";
import { recommendBillSplit } from "@/ai/flows/bill-recommendation";
import type { RecommendBillSplitOutput } from "@/ai/flows/bill-recommendation";
import { Card, CardContent } from "@/components/ui/card";

interface BillRecommendationProps {
  members: string[];
  billAmount: number;
}

export function BillRecommendation({
  members,
  billAmount,
}: BillRecommendationProps) {
  const [recommendation, setRecommendation] = useState<RecommendBillSplitOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRecommendation = async () => {
    setIsLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      // Mock past splits for demonstration
      const pastSplits = [
        { memberIds: ["user-456", "user-789"], threshold: 10, bounty: 2 },
        { memberIds: ["user-456", "user-101"], threshold: 5 },
      ];

      const result = await recommendBillSplit({
        userId: "user-123",
        memberIds: members,
        currentBillAmount: billAmount,
        pastSplits: pastSplits,
      });
      setRecommendation(result);
    } catch (e) {
      setError("Failed to get recommendation. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-secondary">
        <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h3 className="font-semibold text-foreground">AI-Powered Recommendations</h3>
                    <p className="text-sm text-muted-foreground">Optimize your split for faster payments based on history.</p>
                </div>
                <Button onClick={getRecommendation} disabled={isLoading} variant="outline" className="shrink-0">
                {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                )}
                <span>{isLoading ? "Analyzing..." : "Get Suggestions"}</span>
                </Button>
            </div>

            {error && (
                <Alert variant="destructive" className="mt-4">
                <ServerCrash className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {recommendation && (
                <Alert className="mt-4 border-primary/50 bg-primary/10">
                    <Wand2 className="h-4 w-4 text-primary" />
                    <AlertTitle className="text-primary font-headline">Recommendation</AlertTitle>
                    <AlertDescription className="text-foreground/90">
                        <p className="mb-2">{recommendation.reasoning}</p>
                        <div className="flex gap-4">
                            <div className="text-center">
                                <div className="text-xs text-muted-foreground">Threshold</div>
                                <div className="font-bold text-lg">{recommendation.threshold}%</div>
                            </div>
                            <div className="text-center">
                                <div className="text-xs text-muted-foreground">Bounty</div>
                                <div className="font-bold text-lg">{recommendation.bounty}$</div>
                            </div>
                        </div>
                    </AlertDescription>
                </Alert>
            )}
        </CardContent>
    </Card>
  );
}
