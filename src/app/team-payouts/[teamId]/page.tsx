
"use client";

import { useState } from "react";
import { MainSidebar } from "@/components/layout/main-sidebar";
import { PageHeader } from "@/components/layout/page-header";
import { Sidebar } from "@/components/ui/sidebar";
import { TeamHeader } from "@/components/payouts/team-header";
import { TeamMembersTable } from "@/components/payouts/team-members-table";
import { PaymentHistoryTable } from "@/components/payouts/payment-history-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, ArrowRight, Ban, Trash2, Calendar, Repeat, Users, Banknote, Upload, Calendar as CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TeamOverviewChart } from "@/components/payouts/team-overview-chart";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { TokenDistributionChart } from "@/components/analytics/token-distribution-chart";


const teamData = {
  name: "Frontend Developers",
  avatar: "https://images.unsplash.com/photo-1543269865-cbf427effbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxncm91cHxlbnwwfHx8fDE3NTQ5OTkxMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  stats: [
    { label: "Next Payment", value: "2024-08-01", icon: Calendar },
    { label: "Frequency", value: "Weekly", icon: Repeat },
    { label: "Members", value: "3", icon: Users },
    { label: "Total Paid", value: "18,000 USDC", icon: Banknote },
  ],
  members: [
    { name: "Alice", address: "alice.eth", avatar: "https://placehold.co/40x40", role: "Owner" },
    { name: "Bob", address: "0x...b0b", avatar: "https://placehold.co/40x40", role: "Member" },
    { name: "Charlie", address: "0x...c4a", avatar: "https://placehold.co/40x40", role: "Member" },
  ],
  paymentHistory: [
    {
      tx: "0xabc123def456",
      date: "2024-07-25",
      amount: "1,500 USDC",
      status: "Paid",
      participants: [
        { name: "Alice", status: "Paid" },
        { name: "Bob", status: "Paid" },
        { name: "Charlie", status: "Paid" },
      ]
    },
    {
      tx: "0xdef456abc123",
      date: "2024-07-18",
      amount: "1,500 USDC",
      status: "Partial",
       participants: [
        { name: "Alice", status: "Paid" },
        { name: "Bob", status: "Pending" },
        { name: "Charlie", status: "Paid" },
      ]
    },
     {
      tx: "0x123abc456def",
      date: "2024-07-11",
      amount: "1,500 USDC",
      status: "Paid",
       participants: [
        { name: "Alice", status: "Paid" },
        { name: "Bob", status: "Paid" },
        { name: "Charlie", status: "Paid" },
      ]
    },
     {
      tx: "0x456def123abc",
      date: "2024-07-04",
      amount: "1,450 USDC",
      status: "Partial",
       participants: [
        { name: "Alice", status: "Paid" },
        { name: "Bob", status: "Paid" },
        { name: "Charlie", status: "Pending" },
      ]
    },
  ],
};

export default function TeamDetailPage({ params }: { params: { teamId: string } }) {
  const [paymentDate, setPaymentDate] = useState<Date>();

  return (
    <Sidebar>
      <MainSidebar />
      <div className="flex-1">
        <PageHeader title="Team Payouts" />
        <main className="p-4 sm:p-6 lg:p-8 space-y-8 bg-background min-h-screen">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
              <AvatarImage src={teamData.avatar} data-ai-hint="team logo" />
              <AvatarFallback>{teamData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <h1 className="text-2xl sm:text-3xl font-bold font-headline">{teamData.name}</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Manage your team's payouts and settings.</p>
            </div>
             <Button variant="outline" className="ml-auto w-full sm:w-auto">
                <Upload className="mr-0 sm:mr-2 h-4 w-4"/>
                <span className="hidden sm:inline">Change Photo</span>
                <span className="sm:hidden">Change</span>
            </Button>
          </div>
          <TeamHeader stats={teamData.stats} />

          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:grid-cols-4 h-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="history">Payment History</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payout Trends</CardTitle>
                            <CardDescription>A summary of payouts to this team over the last 6 months.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <TeamOverviewChart />
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <TokenDistributionChart />
                </div>
            </TabsContent>

            <TabsContent value="members" className="mt-6">
              <TeamMembersTable members={teamData.members} />
            </TabsContent>
            
            <TabsContent value="history" className="mt-6">
              <PaymentHistoryTable payments={teamData.paymentHistory} />
            </TabsContent>

            <TabsContent value="settings" className="mt-6 grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Team Settings</CardTitle>
                        <CardDescription>Manage your team's details and payout configuration.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="team-name">Team Name</Label>
                            <Input id="team-name" defaultValue={teamData.name} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="team-frequency">Payment Frequency</Label>
                             <Select defaultValue="monthly">
                                <SelectTrigger id="team-frequency">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                    <SelectItem value="quarterly">Quarterly</SelectItem>
                                    <SelectItem value="yearly">Yearly</SelectItem>
                                </SelectContent>
                             </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="payment-date">Payment Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    id="payment-date"
                                    variant={"outline"}
                                    className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !paymentDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {paymentDate ? format(paymentDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <CalendarComponent
                                        mode="single"
                                        selected={paymentDate}
                                        onSelect={setPaymentDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <Button>Save Changes</Button>
                    </CardContent>
                </Card>
                <Card className="border-primary/50 bg-primary/5 dark:bg-primary/10">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="h-6 w-6 text-primary"/>
                            <CardTitle>Safe Multisig Protection</CardTitle>
                        </div>
                        <CardDescription>Enhance security with multi-signature requirements for transactions.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                             <Label>Confirmation Policy</Label>
                             <Select defaultValue="2">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 out of 3 owners</SelectItem>
                                    <SelectItem value="2">2 out of 3 owners</SelectItem>
                                    <SelectItem value="3">3 out of 3 owners</SelectItem>
                                </SelectContent>
                             </Select>
                        </div>
                        <Button variant="outline">
                            <span>Manage Settings</span>
                            <ArrowRight />
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Recurring Bill</CardTitle>
                        <CardDescription>Manage the active recurring bill for this team.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                               <Label>Pause Payments</Label>
                               <p className="text-xs text-muted-foreground">Temporarily stop all recurring payments.</p>
                            </div>
                           <Switch />
                        </div>
                         <Button variant="outline" className="w-full">
                            <Ban className="mr-2 h-4 w-4"/>
                            Cancel Recurring Bill
                         </Button>
                    </CardContent>
                </Card>
                 <Card className="border-destructive/50 bg-destructive/5 dark:bg-destructive/10">
                    <CardHeader>
                        <CardTitle className="text-destructive">Danger Zone</CardTitle>
                        <CardDescription>These actions are permanent and cannot be undone.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="destructive" className="w-full">
                            <Trash2 className="mr-2 h-4 w-4"/>
                           Delete Team
                        </Button>
                    </CardContent>
                </Card>
            </TabsContent>

          </Tabs>
        </main>
      </div>
    </Sidebar>
  );
}
