

"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, Plus, Edit, Split, Trash2, Copy } from "lucide-react";
import { EthLogo } from "../icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import dynamic from "next/dynamic";
import { useState } from "react";

const CreateBillDialog = dynamic(() => import('../bill/create-bill-dialog').then(mod => mod.CreateBillDialog), { ssr: false });

interface RoyaltyPayment {
    tx: string;
    collection: string;
    amount: string;
    token: string;
    date: string;
}
interface RoyaltyAccount {
    id: string;
    name:string;
    address: string;
    balance: number;
    collections: number;
    token: string;
    payments: RoyaltyPayment[];
}

interface RoyaltyAccountDetailsProps {
  account: RoyaltyAccount;
}


export function RoyaltyAccountDetails({ account }: RoyaltyAccountDetailsProps) {
    const { toast } = useToast();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogProps, setDialogProps] = useState({});

    const usdRate = account.token === "ETH" ? 3450.21 : 1;
    const balanceUsd = account.balance * usdRate;

    const copyAddress = () => {
        navigator.clipboard.writeText(account.address);
        toast({
            title: "Address Copied!",
            description: "The wallet address has been copied to your clipboard.",
        });
    }

    const openSplitDialog = (payment?: RoyaltyPayment) => {
        if (payment) {
             setDialogProps({
                title: `Split revenue from ${payment.collection}`,
                description: `You are about to create a split for ${payment.amount} ${payment.token}.`,
                royaltyAddress: account.address,
                billAmount: parseFloat(payment.amount),
                billTitle: `${payment.collection} Royalty Split`
            });
        } else {
            setDialogProps({
                title: `Create Split from ${account.name}`,
                description: "Use your available royalty balance to fund a new bill or payout.",
                royaltyAddress: account.address
            });
        }
        setDialogOpen(true);
    }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold font-headline">{account.name}</CardTitle>
            <div className="flex items-center gap-2">
                <p className="font-mono text-muted-foreground break-all">{account.address}</p>
                <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={copyAddress}>
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto">
                <Edit className="mr-2 h-4 w-4" />
                Edit Name
            </Button>
            <Button variant="destructive" className="w-full sm:w-auto">
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-muted-foreground">Available Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                {account.token === "ETH" ? <EthLogo className="h-8 w-8" /> : <div className="font-bold text-2xl h-8 w-8 flex items-center justify-center bg-muted rounded-full">{account.token.charAt(0)}</div>}
                <span className="text-4xl font-bold font-headline">{account.balance.toLocaleString()} {account.token}</span>
              </div>
              <p className="text-muted-foreground mt-1">~${balanceUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</p>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={() => openSplitDialog()}>
                    <Split className="mr-2 h-4 w-4" />
                    Create a custom split
                </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Recent Royalty Payments</CardTitle>
                    <CardDescription>A list of recent royalty payments to this connected wallet.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-lg border overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Collection</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {account.payments.map((payment) => (
                                    <TableRow key={payment.tx}>
                                        <TableCell className="font-medium">{payment.collection}</TableCell>
                                        <TableCell>{payment.amount} {payment.token}</TableCell>
                                        <TableCell className="hidden sm:table-cell">{payment.date}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm" onClick={() => openSplitDialog(payment)}>
                                                <Split className="mr-2 h-4 w-4" />
                                                <span className="hidden sm:inline">Create Split</span>
                                                <span className="inline sm:hidden">Split</span>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
      <CreateBillDialog open={dialogOpen} onOpenChange={setDialogOpen} {...dialogProps} />
    </div>
  );
}
