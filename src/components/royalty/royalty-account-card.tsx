

"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Box, Gem, Split } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const CreateBillDialog = dynamic(() => import('../bill/create-bill-dialog').then(mod => mod.CreateBillDialog), { ssr: false });

interface RoyaltyAccount {
    id: string;
    name: string;
    address: string;
    balance: number;
    collections: number;
    token: string;
}

interface RoyaltyAccountCardProps {
  account: RoyaltyAccount;
  onViewDetails: () => void;
}

export function RoyaltyAccountCard({ account, onViewDetails }: RoyaltyAccountCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
            <CardTitle className="font-headline">{account.name}</CardTitle>
            <div className="p-2 bg-primary/20 rounded-lg -mt-2 -mr-2">
                <Gem className="h-5 w-5 text-primary" />
            </div>
        </div>
        <CardDescription className="font-mono text-xs">{account.address}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div>
            <p className="text-sm text-muted-foreground">Total Royalties</p>
            <p className="text-2xl font-bold">{account.balance.toLocaleString()} {account.token}</p>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
            <Box className="mr-2 h-4 w-4"/>
            <span>{account.collections} collections</span>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={onViewDetails}>
          View Details
        </Button>
        <Button onClick={() => setDialogOpen(true)}>
            <Split className="mr-2 h-4 w-4" />
            Create Split
        </Button>
        <CreateBillDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            title={`Create Split from ${account.name}`}
            description="Use your available royalty balance to fund a new bill or payout."
            royaltyAddress={account.address}
        />
      </CardFooter>
    </Card>
  );
}
