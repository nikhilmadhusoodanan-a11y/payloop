
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Wallet, Plus, LogOut, Copy, RefreshCw, ShieldCheck } from "lucide-react";
import { MetaMaskLogo, WalletConnectLogo, CoinbaseWalletLogo } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


const walletOptions = [
  { name: "MetaMask", icon: MetaMaskLogo },
  { name: "WalletConnect", icon: WalletConnectLogo },
  { name: "Coinbase Wallet", icon: CoinbaseWalletLogo },
  { name: "Gnosis Safe", icon: ShieldCheck },
];

export function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    // In a real app, you would check local storage or a state manager
    // to see if the user is already connected.
    // For this prototype, we'll simulate it.
    const previouslyConnected = sessionStorage.getItem("walletConnected");
    if (previouslyConnected) {
      setIsConnected(true);
    }
  }, []);

  const handleConnect = (walletName: string) => {
    setSelectedWallet(walletName);
    // In a real app, you'd have connection logic here.
    setTimeout(() => {
        setIsConnected(true);
        sessionStorage.setItem("walletConnected", "true");
        toast({
            title: "Wallet Connected",
            description: "You have successfully connected your wallet.",
        });
        setSelectedWallet(null);
    }, 1000);
  }

  const handleDisconnect = () => {
    setIsConnected(false);
    sessionStorage.removeItem("walletConnected");
     toast({
        title: "Wallet Disconnected",
        description: "You have successfully disconnected your wallet.",
    });
    router.push('/');
  }

  const copyAddress = () => {
    navigator.clipboard.writeText("dev.eth");
    toast({
        title: "Address Copied",
        description: "Your wallet address has been copied to the clipboard.",
    });
  }


  if (!isClient) {
    return (
      <Button variant="outline" disabled>
        <Wallet className="mr-2 h-4 w-4" />
        <span>Loading...</span>
      </Button>
    );
  }

  if (!isConnected) {
    return (
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
              <Wallet className="mr-2 h-4 w-4" />
              <span>Connect Wallet</span>
              <ChevronDown className="ml-2 h-4 w-4"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            {walletOptions.map((wallet) => {
              const Icon = wallet.icon;
              const isLoading = selectedWallet === wallet.name;
              return (
                <DropdownMenuItem key={wallet.name} onSelect={(e) => {
                  e.preventDefault();
                  handleConnect(wallet.name);
                }} disabled={!!selectedWallet}>
                   {isLoading ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                  ) : (
                      <Icon className="h-4 w-4 mr-2" />
                  )}
                  <span>{isLoading ? `Connecting...` : wallet.name}</span>
                </DropdownMenuItem>
              )
            })}
        </DropdownMenuContent>
       </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline">
                <Wallet className="mr-2 h-4 w-4" />
                <span>dev.eth</span>
                <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={copyAddress}>
                <Copy className="mr-2 h-4 w-4" />
                <span>Copy Address</span>
            </DropdownMenuItem>
             <DropdownMenuItem onClick={handleDisconnect}>
                <RefreshCw className="mr-2 h-4 w-4" />
                <span>Switch Wallet</span>
            </DropdownMenuItem>
             <DropdownMenuItem onClick={handleDisconnect}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Disconnect</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  );
}
