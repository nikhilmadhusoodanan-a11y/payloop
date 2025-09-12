import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const transactions = [
  {
    txHash: "0xabc123def456ghi789jkl0mno123pqr456stu789vwx",
    type: "Team Payout",
    status: "Success",
    date: "2024-07-28",
    amount: "1,500 USDC",
    network: "Polygon",
  },
  {
    txHash: "0xdef456abc123ghi789jkl0mno123pqr456stu789vwx",
    type: "One-Time Bill",
    status: "Success",
    date: "2024-07-27",
    amount: "210 DAI",
    network: "Base",
  },
  {
    txHash: "0x123abc456def789ghi0jklmno123pqr456stu789vwx",
    type: "Team Payout",
    status: "Failed",
    date: "2024-07-26",
    amount: "49 USDC",
    network: "Polygon",
  },
  {
    txHash: "0x456def123abc789ghi0jklmno123pqr456stu789vwx",
    type: "One-Time Bill",
    status: "Pending",
    date: "2024-07-25",
    amount: "0.5 ETH",
    network: "Ethereum",
  },
  {
    txHash: "0x789vwx123abc456def789ghi0jklmno123pqr456stu",
    type: "Team Payout",
    status: "Success",
    date: "2024-07-24",
    amount: "0.1 ETH",
    network: "Base",
  },
];


export function TransactionsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Transactions</CardTitle>
        <CardDescription>A complete list of all transactions processed through PayLoop.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[250px]">Transaction Hash</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Network</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.txHash}>
                  <TableCell className="font-mono text-xs">
                     <Button variant="link" asChild className="p-0 h-auto">
                      <a href="#" target="_blank">
                        {tx.txHash.slice(0, 12)}...{tx.txHash.slice(-12)}
                        <ExternalLink className="h-3 w-3 ml-1.5" />
                      </a>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{tx.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{tx.network}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                        variant={
                            tx.status === 'Success' ? 'success' :
                            tx.status === 'Pending' ? 'warning' :
                            tx.status === 'Failed' ? 'destructive' : 'default'
                        }
                        className="font-semibold"
                    >
                      {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell className="text-right font-medium">{tx.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
