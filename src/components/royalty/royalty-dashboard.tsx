
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogOut, Plus, Users, User, ArrowRight, Download, CreditCard, Split, Edit } from "lucide-react";
import { EthLogo } from "../icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CreateBillDialog } from "../bill/create-bill-dialog";


interface RoyaltyDashboardProps {
  address: string;
  onDisconnect: () => void;
}

const royaltyPayments = [
  { tx: "0x123...abc", collection: "CryptoPunks", amount: "2.5", token: "ETH", date: "2024-07-30" },
  { tx: "0x456...def", collection: "Bored Ape Yacht Club", amount: "5.1", token: "ETH", date: "2024-07-29" },
  { tx: "0x789...ghi", collection: "Doodles", amount: "1.2", token: "ETH", date: "2024-07-28" },
  { tx: "0xabc...123", collection: "Moonbirds", amount: "3.0", token: "ETH", date: "2024-07-27" },
  { tx: "0xdef...456", collection: "Azuki", amount: "4.2", token: "ETH", date: "2024-07-26" },
];

const totalRoyalties = royaltyPayments.reduce((sum, p) => sum + parseFloat(p.amount), 0);

export function RoyaltyDashboard({ address, onDisconnect }: RoyaltyDashboardProps) {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold font-headline">Royalty Wallet</CardTitle>
            <p className="font-mono text-muted-foreground">{address}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onDisconnect}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
            </Button>
            <Button variant="destructive" onClick={onDisconnect}>
                <LogOut className="mr-2 h-4 w-4" />
                Disconnect
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
                <EthLogo className="h-8 w-8" />
                <span className="text-4xl font-bold font-headline">{totalRoyalties.toFixed(2)} ETH</span>
              </div>
              <p className="text-muted-foreground mt-1">~${(totalRoyalties * 3450.21).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD</p>
            </CardContent>
            <CardFooter>
              <CreateBillDialog
                title="Create a New Split from Royalties"
                description="Use your available royalty balance to fund a new bill or payout."
                royaltyAddress={address}
              >
                <Button className="w-full">
                  <Plus className="mr-2" />
                  Create a custom split
                </Button>
              </CreateBillDialog>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Recent Royalty Payments</CardTitle>
                    <CardDescription>A list of recent royalty payments to your connected wallet.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-lg border overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Collection</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {royaltyPayments.map((payment) => (
                                    <TableRow key={payment.tx}>
                                        <TableCell className="font-medium">{payment.collection}</TableCell>
                                        <TableCell>{payment.amount} {payment.token}</TableCell>
                                        <TableCell>{payment.date}</TableCell>
                                        <TableCell className="text-right">
                                            <CreateBillDialog
                                                title={`Split revenue from ${payment.collection}`}
                                                description={`You are about to create a split for ${payment.amount} ${payment.token}.`}
                                                royaltyAddress={address}
                                                billAmount={parseFloat(payment.amount)}
                                                billTitle={`${payment.collection} Royalty Split`}
                                            >
                                                <Button variant="outline" size="sm">
                                                    <Split className="mr-2 h-4 w-4" />
                                                    Create Split
                                                </Button>
                                            </CreateBillDialog>
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
    </div>
  );
}
