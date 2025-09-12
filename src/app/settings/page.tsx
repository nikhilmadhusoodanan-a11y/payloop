
"use client";

import { MainSidebar } from "@/components/layout/main-sidebar";
import { PageHeader } from "@/components/layout/page-header";
import { Sidebar } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Wallet,
  LogOut,
  Palette,
  Settings as SettingsIcon,
  ChevronsRight,
  Sun,
  Moon,
  Gem,
  ShieldCheck,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "next-themes";
import Link from "next/link";
import { PolygonLogo, ArbitrumLogo, OptimismLogo, EthLogo, AvalancheLogo } from "@/components/icons";


const supportedChains = [
  { name: "Polygon", status: "Active", description: "Seamless, low-cost transactions.", logo: PolygonLogo },
  { name: "Arbitrum", status: "Active", description: "Fast and scalable Ethereum L2.", logo: ArbitrumLogo },
  { name: "Optimism", status: "Active", description: "Optimistic rollup for Ethereum.", logo: OptimismLogo },
  { name: "Ethereum Mainnet", status: "Coming Soon", description: "High security, future integration.", logo: EthLogo },
  { name: "Avalanche", status: "Coming Soon", description: "Blazing fast, low-cost DeFi.", logo: AvalancheLogo },
];

export default function SettingsPage() {
  const { setTheme, theme } = useTheme();

  return (
    <Sidebar>
      <MainSidebar />
      <div className="flex-1">
        <PageHeader title="Settings" />
        <main className="p-4 sm:p-6 lg:p-8 space-y-8 bg-background min-h-screen">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Manage Your Preferences</CardTitle>
              <CardDescription>
                Customize your PayLoop account settings and connected services.
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* General Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>General Preferences</CardTitle>
                  <CardDescription>Adjust basic application settings.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-lg border">
                    <Label className="flex items-center gap-4">
                      <Palette className="h-5 w-5 text-muted-foreground" />
                      Theme
                    </Label>
                    <p className="text-sm text-muted-foreground pl-9 mb-4">Select your preferred interface theme.</p>
                     <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-2 gap-4 pl-9">
                      <div>
                        <RadioGroupItem value="light" id="light" className="peer sr-only" />
                        <Label
                          htmlFor="light"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Sun className="mb-3 h-6 w-6" />
                          Light
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                        <Label
                          htmlFor="dark"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Moon className="mb-3 h-6 w-6" />
                          Dark
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>

              {/* Supported Chains */}
              <Card>
                <CardHeader>
                  <CardTitle>Supported Chains</CardTitle>
                  <CardDescription>View the blockchain networks supported by PayLoop.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {supportedChains.map((chain) => {
                    const Logo = chain.logo;
                    return (
                      <div key={chain.name} className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center gap-4">
                          <Logo className="h-6 w-6" />
                          <div>
                            <p className="font-semibold">{chain.name}</p>
                            <p className="text-sm text-muted-foreground">{chain.description}</p>
                          </div>
                        </div>
                        <Badge variant={chain.status === 'Active' ? 'default' : 'secondary'}>{chain.status}</Badge>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              {/* Wallet Connection */}
              <Card>
                <CardHeader>
                  <CardTitle>Wallet Connection</CardTitle>
                  <CardDescription>View and manage your connected crypto wallet.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg border flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Connected Wallet</p>
                      <p className="font-mono text-sm font-semibold">0xb0b...cafe</p>
                    </div>
                    <Wallet className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Button variant="destructive" className="w-full">
                    <LogOut className="mr-2 h-4 w-4" /> Disconnect Wallet
                  </Button>
                </CardContent>
              </Card>

                {/* DAO Gnosis Safe */}
                <Card>
                  <CardHeader>
                    <CardTitle>DAO Gnosis Safe</CardTitle>
                    <CardDescription>Connect a Gnosis Safe to use your DAO's treasury for payouts.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="safe-address">Safe Address</Label>
                        <Input id="safe-address" placeholder="0x... or your-dao.eth" />
                     </div>
                      <Button className="w-full">
                          <ShieldCheck className="mr-2 h-4 w-4" />
                          Connect DAO Safe
                      </Button>
                  </CardContent>
                </Card>

                {/* Royalty Pool Connection */}
                <Card>
                    <CardHeader>
                        <CardTitle>Royalty Pool</CardTitle>
                        <CardDescription>Connect your NFT royalty wallet to use earnings for splits.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full">
                           <Link href="/royalty-pools">
                            <Gem className="mr-2 h-4 w-4" /> Manage Royalty Pools
                           </Link>
                        </Button>
                    </CardContent>
                </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Receive updates on bill status and payments.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" className="w-full">
                        Manage Notifications
                        <ChevronsRight className="ml-2 h-4 w-4"/>
                    </Button>
                </CardContent>
              </Card>

              {/* Advanced Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Options</CardTitle>
                  <CardDescription>Configure settings for power users.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <Label>Show Raw Gas Details</Label>
                      <p className="text-xs text-muted-foreground">Display detailed gas fees for transactions.</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <Label>Enable Fee Sponsor</Label>
                      <p className="text-xs text-muted-foreground">Allow PayLoop to cover gas fees for new users.</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </Sidebar>
  );
}
