

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MetaMaskLogo,
  WalletConnectLogo,
  CoinbaseWalletLogo,
  PolygonLogo,
  BaseLogo,
  MyProductLogo,
} from "@/components/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { BalanceCard } from "@/components/dashboard/balance-card";
import { CircleDollarSign, Router, Lock, Compass, ShieldCheck } from "lucide-react";
import { EthLogo } from "@/components/icons";
import { ArbitrumLogo } from "@/components/icons";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Script from "next/script";
import { LoaderTwo } from "@/components/ui/loader";


const walletOptions = [
  { name: "MetaMask", icon: MetaMaskLogo },
  { name: "WalletConnect", icon: WalletConnectLogo },
  { name: "Coinbase Wallet", icon: CoinbaseWalletLogo },
  { name: "Gnosis Safe", icon: ShieldCheck },
];

const networkOptions = [
    { name: "Polygon", icon: PolygonLogo },
    { name: "Arbitrum", icon: ArbitrumLogo },
    { name: "Base", icon: BaseLogo },
];

const balances = [
    {
      tokenName: "ETH",
      tokenIcon: EthLogo,
      balance: 0.75,
      balanceUsd: 2615.45,
    },
    {
      tokenName: "USDC",
      tokenIcon: CircleDollarSign,
      balance: 1250.5,
      balanceUsd: 1250.5,
    },
];

export default function ConnectPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const router = useRouter();

  const handleConnect = (walletName: string) => {
    setSelectedWallet(walletName);
    // Simulate connection
    setTimeout(() => {
        setIsConnected(true);
    }, 1000);
  };
  
  const handleProceed = () => {
    router.push('/dashboard');
  }

  const ensName = "nikhil.eth";
  const fallbackAddress = "0x12aB...Ab34";

  return (
    <>
      <Script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.3/build/spline-viewer.js" strategy="lazyOnload" />
      <div className="relative min-h-screen bg-background flex flex-col items-center justify-center p-4 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-full h-full sm:w-[1200px] sm:h-[1200px] -translate-x-1/2 -translate-y-1/4 z-0">
          <spline-viewer url="https://prod.spline.design/K02gxfSh5l0GOIOE/scene.splinecode"></spline-viewer>
        </div>

        <div className="relative z-10 w-full flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-3 mb-8">
                <MyProductLogo className="w-12 h-12 text-primary" />
                <h1 className="text-3xl font-bold font-headline text-foreground">
                    PayLoop
                </h1>
            </div>
            <Card className="w-full max-w-md">
              <CardHeader>
                  {isConnected ? (
                       <div>
                            <CardTitle className="font-headline text-2xl">Welcome, {ensName || fallbackAddress}</CardTitle>
                       </div>
                  ): (
                      <div>
                          <CardTitle className="font-headline text-3xl">Split crypto bills. Instantly.</CardTitle>
                          <CardDescription>Connect your wallet to get started.</CardDescription>
                      </div>
                  )}
              </CardHeader>
              <CardContent>
                {isConnected ? (
                  <div className="space-y-4">
                      <p className="text-center text-sm text-muted-foreground">Your wallet is connected. Here's a snapshot of your balances:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {balances.map(balance => (
                               <BalanceCard key={balance.tokenName} {...balance} />
                          ))}
                      </div>
                      <Button className="w-full" onClick={handleProceed}>Proceed to Dashboard</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                       <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full">
                              <Lock className="mr-2 h-4 w-4" />
                              Connect Wallet
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                              <DialogHeader>
                                  <DialogTitle>Connect your wallet</DialogTitle>
                                  <DialogDescription>Select your preferred wallet to continue.</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 pt-4">
                                  {walletOptions.map((wallet) => {
                                      const Icon = wallet.icon;
                                      const isLoading = selectedWallet === wallet.name;
                                      return (
                                          <div
                                            key={wallet.name}
                                          >
                                            <Button
                                                variant="outline"
                                                className="w-full h-12 text-base justify-start"
                                                onClick={() => handleConnect(wallet.name)}
                                                disabled={!!selectedWallet}
                                            >
                                                {isLoading ? (
                                                    <LoaderTwo className="mr-3" />
                                                ) : (
                                                    <Icon className="h-6 w-6 mr-3" />
                                                )}
                                                <span>{isLoading ? `Connecting to ${wallet.name}...` : `Connect with ${wallet.name}`}</span>
                                            </Button>
                                          </div>
                                      )
                                  })}
                              </div>
                          </DialogContent>
                      </Dialog>

                      <Button variant="link" className="text-muted-foreground" onClick={() => router.push('/dashboard')}>
                          <Compass className="mr-2"/>
                          Explore without connecting wallet
                      </Button>

                    <div className="space-y-2 pt-4">
                      <Label className="text-muted-foreground">Network</Label>
                      <Select defaultValue="polygon">
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {networkOptions.map(network => {
                              const Icon = network.icon;
                              return (
                                  <SelectItem key={network.name} value={network.name.toLowerCase()}>
                                      <div className="flex items-center gap-2">
                                          <Icon className="h-5 w-5" />
                                          <span>{network.name}</span>
                                      </div>
                                  </SelectItem>
                              )
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                     <p className="text-xs text-muted-foreground pt-4">You control your funds. Always.</p>
                  </div>
                )}
              </CardContent>
            </Card>
        </div>
    </div>
    </>
  );
}
