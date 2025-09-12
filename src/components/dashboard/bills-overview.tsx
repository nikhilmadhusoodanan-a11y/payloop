

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
import { MoreHorizontal, Eye, CreditCard, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const bills = [
  {
    title: "Co-working Space Rent",
    amount: "1,200 USDC",
    status: "Pending",
    date: "2024-07-15",
  },
  {
    title: "Design Subscription",
    amount: "49 USDC",
    status: "Paid",
    date: "2024-07-12",
  },
  {
    title: "Server Costs - June",
    amount: "0.1 ETH",
    status: "Paid",
    date: "2024-07-01",
  },
    {
    title: "Team Lunch",
    amount: "150 DAI",
    status: "Failed",
    date: "2024-06-28",
  },
  {
    title: "Freelance Developer",
    amount: "0.5 ETH",
    status: "Pending",
    date: "2024-06-25",
  },
];

const payouts = [
  {
    recipient: "Alice (dev.eth)",
    amount: "1.2 ETH",
    status: "Paid",
    date: "2024-07-20",
  },
  {
    recipient: "Bob (design.eth)",
    amount: "2,500 USDC",
    status: "Paid",
    date: "2024-07-18",
  },
  {
    recipient: "Charlie (marketing.eth)",
    amount: "1,800 DAI",
    status: "Scheduled",
    date: "2024-08-01",
  },
  {
    recipient: "David (support.eth)",
    amount: "1,500 USDC",
    status: "Paid",
    date: "2024-07-15",
  },
];

const recurringSplits = [
  {
    title: "Monthly Software Subscription",
    amount: "99 USDC",
    nextDate: "2024-08-01",
    frequency: "Monthly",
  },
  {
    title: "Weekly Design Retainer",
    amount: "500 DAI",
    nextDate: "2024-07-29",
    frequency: "Weekly",
  },
  {
    title: "Quarterly Server Costs",
    amount: "0.3 ETH",
    nextDate: "2024-09-01",
    frequency: "Quarterly",
  },
];


export function BillsOverview() {
  return (
    <div className="h-full">
      <CardHeader>
          <CardTitle className="font-headline">Recent Activity</CardTitle>
          <CardDescription>An overview of your recent bills and payouts.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="my-bills">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto sm:h-10">
            <TabsTrigger value="my-bills" className="transition-all duration-200 hover:bg-accent/50">My Bills</TabsTrigger>
            <TabsTrigger value="team-payouts" className="transition-all duration-200 hover:bg-accent/50">Team Payouts</TabsTrigger>
            <TabsTrigger value="recurring" className="transition-all duration-200 hover:bg-accent/50">Recurring Splits</TabsTrigger>
          </TabsList>
          <TabsContent value="my-bills" className="mt-4">
            <div className="rounded-lg border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px]">Title</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bills.map((bill) => (
                    <TableRow key={bill.title}>
                      <TableCell className="font-medium">{bill.title}</TableCell>
                      <TableCell>{bill.amount}</TableCell>
                      <TableCell>
                        <Badge 
                            variant={
                                bill.status === 'Paid' ? 'success' :
                                bill.status === 'Pending' ? 'warning' :
                                bill.status === 'Failed' ? 'destructive' : 'default'
                            }
                        >
                            {bill.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{bill.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
           <TabsContent value="team-payouts" className="mt-4">
            <div className="rounded-lg border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px]">Recipient</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payouts.map((payout) => (
                    <TableRow key={payout.recipient}>
                      <TableCell className="font-medium">{payout.recipient}</TableCell>
                      <TableCell>{payout.amount}</TableCell>
                      <TableCell>
                        <Badge 
                            variant={
                                payout.status === 'Paid' ? 'success' :
                                payout.status === 'Scheduled' ? 'info' : 'default'
                            }
                        >
                          {payout.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{payout.date}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Payout
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
           <TabsContent value="recurring" className="mt-4">
            <div className="rounded-lg border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Title</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Next Date</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recurringSplits.map((split) => (
                    <TableRow key={split.title}>
                      <TableCell className="font-medium">{split.title}</TableCell>
                      <TableCell>{split.amount}</TableCell>
                      <TableCell>{split.nextDate}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{split.frequency}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Manage Split
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Cancel Split
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </div>
  );
}
