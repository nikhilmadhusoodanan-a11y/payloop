
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gem, Link as LinkIcon, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MyProductLogo } from '@/components/icons';
import MagicBento from '@/components/dashboard/magic-bento';

interface ConnectRoyaltyWalletProps {
  onConnect: (address: string) => void;
}

export function ConnectRoyaltyWallet({ onConnect }: ConnectRoyaltyWalletProps) {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = () => {
    if (!address) {
      setError("Please enter a wallet address.");
      return;
    }
    setError(null);
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Basic validation for prototype - just check if not empty
      if (address) {
        onConnect(address);
      } else {
        setError("Invalid wallet address. Please check and try again.");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
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
            <div className="card__header text-center">
                <div className="mx-auto bg-primary/20 p-4 rounded-full w-fit mb-4">
                    <Gem className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="font-headline text-3xl">Connect Your Royalty Wallet</CardTitle>
                <CardDescription className="max-w-md mx-auto">
                    Link your NFT royalty wallet from marketplaces like OpenSea, Blur, or LooksRare to start splitting your earnings.
                </CardDescription>
            </div>
            <div className="card__content">
                <div className="space-y-4 max-w-md mx-auto pt-6">
                    <div className="space-y-2 text-left">
                        <Label htmlFor="royalty-address">Royalty Wallet Address</Label>
                        <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="royalty-address"
                            placeholder="0x... or creator.eth"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="pl-9"
                        />
                        </div>
                    </div>
                    {error && <p className="text-destructive text-sm">{error}</p>}
                    <div className="flex justify-center pt-2">
                         <Button onClick={handleConnect} disabled={isLoading} size="lg">
                            {isLoading ? (
                            <>
                                <Loader2 className="mr-2 animate-spin" />
                                <span>Connecting...</span>
                            </>
                            ) : (
                            <span>Connect Wallet</span>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
      </MagicBento>
      
      <Alert className="mt-8">
        <MyProductLogo className="h-4 w-4" />
        <AlertTitle className="font-semibold">How does it work?</AlertTitle>
        <AlertDescription>
          PayLoop auto-detects incoming royalty payments to your connected wallet, making those funds instantly available for your bill splits and team payouts. It's the easiest way to manage and distribute your creative earnings.
        </AlertDescription>
      </Alert>
    </div>
  );
}
