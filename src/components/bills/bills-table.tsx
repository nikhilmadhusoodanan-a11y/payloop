

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
import { MoreHorizontal, Users, User, Eye, CreditCard, Archive, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";


const allBills = [
  {
    id: "bill_001",
    title: "Co-working Space Rent",
    type: "Team",
    amount: "1,200 USDC",
    status: "Pending",
    date: "2024-07-15",
    bounty: "24 USDC"
  },
  {
    id: "bill_002",
    title: "Team Lunch",
    type: "One-Time",
    amount: "210 DAI",
    status: "Paid",
    date: "2024-07-14",
    bounty: "4.20 DAI"
  },
  {
    id: "bill_003",
    title: "Q3 Designer Payout",
    type: "Team",
    amount: "5,000 USDC",
    status: "Waiting for Approval",
    date: "2024-07-13",
    bounty: "100 USDC"
  },
  {
    id: "bill_004",
    title: "Design Subscription",
    type: "Team",
    amount: "49 USDC",
    status: "Paid",
    date: "2024-07-12",
  },
  {
    id: "bill_005",
    title: "Freelance Developer",
    type: "One-Time",
    amount: "0.5 ETH",
    status: "Pending",
    date: "2024-07-11",
  },
  {
    id: "bill_006",
    title: "Server Costs - June",
    type: "Team",
    amount: "0.1 ETH",
    status: "Paid",
    date: "2024-07-01",
  },
  {
    id: "bill_007",
    title: "Marketing Campaign",
    type: "Team",
    amount: "2,500 USDC",
    status: "Failed",
    date: "2024-06-28",
  },
  {
    id: "bill_008",
    title: "Api subscription",
    type: "One-Time",
    amount: "25 USDC",
    status: "Paid",
    date: "2024-06-25",
    bounty: "0.5 USDC"
  },
];

const upcomingBills = allBills.filter(bill => bill.status === 'Pending' || bill.status === "Waiting for Approval");
const paidBills = allBills.filter(bill => bill.status === 'Paid');
const archivedBills = allBills.filter(bill => bill.status === 'Failed');


const BillTable = ({ bills }: { bills: (typeof allBills) }) => (
    <div className="rounded-lg border overflow-x-auto">
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="min-w-[200px]">Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Bounty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {bills.map((bill) => (
                <TableRow key={bill.id}>
                    <TableCell className="font-medium">{bill.title}</TableCell>
                    <TableCell>
                        <Badge variant="secondary" className="font-normal">
                           {bill.type === 'Team' ? <Users className="h-3 w-3 mr-1" /> : <User className="h-3 w-3 mr-1" />}
                            {bill.type}
                        </Badge>
                    </TableCell>
                    <TableCell>{bill.amount}</TableCell>
                    <TableCell>{bill.bounty || 'N/A'}</TableCell>
                    <TableCell>
                        <Badge 
                            variant={
                                bill.status === 'Paid' ? 'success' :
                                bill.status === 'Pending' ? 'warning' :
                                bill.status === 'Waiting for Approval' ? 'info' :
                                bill.status === 'Failed' ? 'destructive' : 'default'
                            }
                            className="font-semibold"
                        >
                            {bill.status}
                        </Badge>
                    </TableCell>
                    <TableCell>{bill.date}</TableCell>
                    <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/bills/${bill.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        {bill.status === "Pending" && (
                          <DropdownMenuItem>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Pay Bill
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Archive className="mr-2 h-4 w-4" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
);


export function BillsTable() {
  return (
    <Card>
      <CardHeader>
          <CardTitle className="font-headline">All Bills</CardTitle>
          <CardDescription>A complete record of all your one-time and team-related bills.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="w-full sm:w-auto overflow-x-auto whitespace-nowrap">
            <TabsTrigger value="all">All Bills</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <BillTable bills={allBills} />
          </TabsContent>
          <TabsContent value="upcoming" className="mt-4">
            <BillTable bills={upcomingBills} />
          </TabsContent>
          <TabsContent value="paid" className="mt-4">
            <BillTable bills={paidBills} />
          </TabsContent>
           <TabsContent value="archived" className="mt-4">
            <BillTable bills={archivedBills} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
