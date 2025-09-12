
"use client";

import { MainSidebar } from "@/components/layout/main-sidebar";
import { PageHeader } from "@/components/layout/page-header";
import {
  Sidebar,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, CircleDollarSign, AlertTriangle, ArrowRight, Download, Upload, Info } from "lucide-react";
import { EthLogo } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const billData = {
  id: 'xyz123',
  title: 'Team Dinner',
  token: 'USDC',
  amountOwed: 25,
  note: 'For the pizza and drinks last Friday night.',
  sender: 'jane.eth',
  distributionMode: 'pull', // or 'push'
};

const walletData = {
  USDC: {
    balance: 15.40,
    isSufficient: false,
  },
  ETH: {
    balance: 0.01,
    isSufficient: true,
  },
}

export default function RecipientViewPage({ params }: { params: { billId: string } }) {
  const ensName = "nikhil.eth";

  return (
    <Sidebar>
      <MainSidebar />
      <div className="flex-1">
        <PageHeader title="Settle Bill" />
        <main className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Hello, {ensName}</CardTitle>
                    <CardDescription>You have a pending bill to settle.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Amount Owed */}
                    <div className="text-center bg-secondary p-6 rounded-lg">
                        <p className="text-muted-foreground">You owe</p>
                        <p className="text-4xl font-bold font-headline text-primary">
                            {billData.amountOwed} {billData.token}
                        </p>
                    </div>

                    {/* Bill Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Bill Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Title</span>
                                <span className="font-medium">{billData.title}</span>
                            </div>
                             <div className="flex justify-between">
                                <span className="text-muted-foreground">From</span>
                                <span className="font-mono text-sm">{billData.sender}</span>
                            </div>
                             <div className="flex justify-between">
                                <span className="text-muted-foreground">Token</span>
                                <span className="font-medium">{billData.token}</span>
                            </div>
                            {billData.note && (
                                <>
                                 <Separator />
                                 <div>
                                    <span className="text-muted-foreground">Note</span>
                                    <p className="font-medium mt-1">{billData.note}</p>
                                 </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Wallet Panel */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Wallet</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="flex items-center gap-3 flex-1">
                                        <CircleDollarSign className="h-8 w-8 text-muted-foreground bg-secondary p-1.5 rounded-full" />
                                        <div>
                                            <p className="font-semibold">USDC</p>
                                            <p className="text-xs text-muted-foreground">
                                                Balance: {walletData.USDC.balance.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        {!walletData.USDC.isSufficient && (
                                            <Badge variant="warning">
                                                <AlertTriangle className="h-3 w-3 mr-1" />
                                                Not enough
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex items-center gap-3 flex-1">
                                        <EthLogo className="h-8 w-8 text-muted-foreground bg-secondary p-1.5 rounded-full" />
                                        <div>
                                            <p className="font-semibold">ETH</p>
                                            <p className="text-xs text-muted-foreground">
                                                Balance: {walletData.ETH.balance.toFixed(4)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                         <Badge variant="success">
                                            For gas
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <Separator className="my-4" />
                            <div className="flex gap-2">
                                <Button variant="outline" className="w-full">Top Up</Button>
                                <Button variant="outline" className="w-full">Switch Wallet</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* CTA */}
                    <div className="pt-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                             <Button size="lg" className="w-full h-12 text-lg" disabled={!walletData.USDC.isSufficient}>
                                {billData.distributionMode === 'pull' ? (
                                    <>
                                        <Download className="mr-2"/>
                                        <span>Pull My Share</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="mr-2"/>
                                        <span>Pay Now</span>
                                    </>
                                )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="flex items-center gap-2">
                              <Info className="h-4 w-4" />
                              <p>Est. Gas Fee: ~0.002 MATIC ($0.001)</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                </CardContent>
            </Card>
        </main>
      </div>
    </Sidebar>
  );
}
