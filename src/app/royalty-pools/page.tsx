
"use client";

import { useState } from "react";
import { MainSidebar } from "@/components/layout/main-sidebar";
import { PageHeader } from "@/components/layout/page-header";
import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { RoyaltyAccountCard } from "@/components/royalty/royalty-account-card";
import { RoyaltyAccountDetails } from "@/components/royalty/royalty-account-details";
import { ConnectRoyaltyWallet } from "@/components/royalty/connect-royalty-wallet";
import { AnimatePresence, motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

const initialAccounts = [
  {
    id: "acc1",
    name: "Main Creator Wallet",
    address: "creator.eth",
    balance: 16.20,
    collections: 5,
    token: "ETH",
    payments: [
      { tx: "0x123...abc", collection: "CryptoPunks", amount: "2.5", token: "ETH", date: "2024-07-30" },
      { tx: "0x456...def", collection: "Bored Ape Yacht Club", amount: "5.1", token: "ETH", date: "2024-07-29" },
      { tx: "0x789...ghi", collection: "Doodles", amount: "1.2", token: "ETH", date: "2024-07-28" },
      { tx: "0xabc...123", collection: "Moonbirds", amount: "3.0", token: "ETH", date: "2024-07-27" },
      { tx: "0xdef...456", collection: "Azuki", amount: "4.2", token: "ETH", date: "2024-07-26" },
    ],
  },
  {
    id: "acc2",
    name: "ArtBlocks Project",
    address: "0x1234...5678",
    balance: 2500.50,
    collections: 1,
    token: "USDC",
    payments: [
      { tx: "0xaaa...bbb", collection: "Fidenza", amount: "1500.00", token: "USDC", date: "2024-07-29" },
      { tx: "0xccc...ddd", collection: "Ringers", amount: "1000.50", token: "USDC", date: "2024-07-25" },
    ],
  },
];

type View = 'list' | 'details';

export default function RoyaltyPoolsPage() {
  const [view, setView] = useState<View>('list');
  const [accounts, setAccounts] = useState(initialAccounts);
  const [selectedAccount, setSelectedAccount] = useState<(typeof initialAccounts[0]) | null>(null);

  const handleViewDetails = (account: typeof initialAccounts[0]) => {
    setSelectedAccount(account);
    setView('details');
  };

  const handleConnect = (address: string) => {
    const newAccount = {
      id: `acc${accounts.length + 1}`,
      name: "New Royalty Wallet",
      address: address,
      balance: 0,
      collections: 0,
      token: "ETH",
      payments: [],
    };
    setAccounts([...accounts, newAccount]);
  };
  
  const handleBackToList = () => {
    setSelectedAccount(null);
    setView('list');
  }

  const renderContent = () => {
    return (
      <AnimatePresence mode="wait">
        {view === 'list' && (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <ConnectRoyaltyWallet onConnect={handleConnect} />
            <Separator />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {accounts.map((account) => (
                <RoyaltyAccountCard 
                  key={account.id} 
                  account={account} 
                  onViewDetails={() => handleViewDetails(account)} 
                />
              ))}
            </div>
          </motion.div>
        )}
        {view === 'details' && selectedAccount && (
           <motion.div
            key="details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <RoyaltyAccountDetails account={selectedAccount} />
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
  
  const getHeader = () => {
     switch(view) {
      case 'details':
        return (
          <PageHeader title={selectedAccount?.name || 'Royalty Pool'}>
             <Button variant="outline" onClick={handleBackToList}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Pools
             </Button>
          </PageHeader>
        );
      case 'list':
      default:
        return (
            <PageHeader title="Royalty Pools" />
        );
    }
  }

  return (
    <Sidebar>
      <MainSidebar />
      <div className="flex-1">
        {getHeader()}
        <main className="p-4 sm:p-6 lg:p-8 space-y-8 bg-background min-h-screen">
          {renderContent()}
        </main>
      </div>
    </Sidebar>
  );
}
