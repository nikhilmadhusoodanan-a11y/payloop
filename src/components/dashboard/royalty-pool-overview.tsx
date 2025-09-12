

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gem } from "lucide-react";
import Link from "next/link";
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

const royaltyPayments = [
  { tx: "0x123...abc", collection: "CryptoPunks", amount: "2.5", token: "ETH", date: "2024-07-30" },
  { tx: "0x456...def", collection: "Bored Ape Yacht Club", amount: "5.1", token: "ETH", date: "2024-07-29" },
  { tx: "0x789...ghi", collection: "Doodles", amount: "1.2", token: "ETH", date: "2024-07-28" },
  { tx: "aaa...bbb", collection: "CryptoPunks", amount: "1.5", token: "ETH", date: "2024-07-27" },
];

const totalRoyalties = royaltyPayments.reduce((sum, p) => sum + parseFloat(p.amount), 0);

const collectionBalances = royaltyPayments.reduce((acc, payment) => {
    const collectionName = payment.collection;
    const amount = parseFloat(payment.amount);
    const token = payment.token;

    if (!acc[collectionName]) {
        acc[collectionName] = { amount: 0, token: token };
    }
    acc[collectionName].amount += amount;
    return acc;
}, {} as Record<string, { amount: number; token: string }>);


export function RoyaltyPoolOverview() {
  return (
    <Card className="border-border/50 h-full flex flex-col">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
                <CardTitle className="font-headline">Royalty Pool</CardTitle>
                <CardDescription>A summary of your NFT royalty earnings.</CardDescription>
            </div>
            <Button variant="outline" asChild>
                <Link href="/royalty-pools">
                    <span>Manage Pool</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between space-y-6">
        <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
            <div className="p-3 bg-primary/20 rounded-lg">
                <Gem className="h-8 w-8 text-primary" />
            </div>
            <div>
                <p className="text-muted-foreground text-sm">Total Available Balance</p>
                <p className="text-2xl font-bold font-headline">{totalRoyalties.toFixed(2)} ETH</p>
                <p className="text-xs font-mono text-muted-foreground">creator.eth</p>
            </div>
        </div>
        <div>
            <h4 className="text-sm font-medium mb-2 text-muted-foreground">Balance by Collection</h4>
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Collection</TableHead>
                            <TableHead className="text-right">Balance</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {Object.entries(collectionBalances).map(([collection, {amount, token}]) => (
                        <TableRow key={collection}>
                            <TableCell className="font-medium">{collection}</TableCell>
                            <TableCell className="text-right font-mono">{amount.toFixed(2)} {token}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
