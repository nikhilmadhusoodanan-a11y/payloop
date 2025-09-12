
"use client";

import { MainSidebar } from "@/components/layout/main-sidebar";
import { PageHeader } from "@/components/layout/page-header";
import {
  Sidebar,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, AlertTriangle, ArrowLeft, CheckCircle2, CircleDollarSign, Clock, Bell, Gift, User, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { SafeApprovalPanel } from "@/components/bill/safe-approval-panel";
import { useToast } from "@/hooks/use-toast";

const billsData = [
  {
    id: "bill_001",
    title: "Co-working Space Rent",
    type: "Team",
    amount: "1,200 USDC",
    status: "Pending",
    date: "2024-07-15",
    fundingSource: 'My Wallet',
    participants: [
        { address: 'team-member-1.eth', amount: '600 USDC', status: 'Pending'},
        { address: 'team-member-2.eth', amount: '600 USDC', status: 'Pending'},
    ],
    bounty: {
      amount: '24 USDC',
      recipient: 'creator.eth',
      status: 'Pending'
    }
  },
  {
    id: "bill_002",
    title: "Team Lunch",
    type: "One-Time",
    amount: "210 DAI",
    status: "Paid",
    date: "2024-07-14",
    fundingSource: 'My Wallet',
    participants: [
        { address: 'guest-1.eth', amount: '105 DAI', status: 'Paid'},
        { address: 'guest-2.eth', amount: '105 DAI', status: 'Paid'},
    ],
    bounty: {
      amount: '4.20 DAI',
      recipient: 'creator.eth',
      status: 'Paid'
    }
  },
  {
    id: "bill_003",
    title: "Q3 Designer Payout",
    type: "Team",
    amount: "5,000 USDC",
    status: "Waiting for Approval",
    date: "2024-07-13",
    fundingSource: 'DAO Safe',
    safeDetails: {
      address: 'your-dao.eth',
      requiredApprovals: 3,
      approvers: [
          { address: 'alice.eth', hasApproved: true },
          { address: 'bob.eth', hasApproved: false },
          { address: 'charlie.eth', hasApproved: false },
          { address: 'david.eth', hasApproved: false },
      ]
    },
    participants: [
        { address: 'designer-1.eth', amount: '2,500 USDC', status: 'Pending'},
        { address: 'designer-2.eth', amount: '2,500 USDC', status: 'Pending'},
    ],
    bounty: {
      amount: '100 USDC',
      recipient: 'referrer.eth',
      status: 'Pending'
    }
  },
   {
    id: "bill_007",
    title: "Marketing Campaign",
    type: "Team",
    amount: "2,500 USDC",
    status: "Failed",
    date: "2024-06-28",
    fundingSource: 'My Wallet',
    failureReason: 'Transaction was cancelled due to insufficient funds in the funding wallet.',
    participants: [
        { address: 'agency.eth', amount: '2,500 USDC', status: 'Failed'},
    ]
  },
];


export default function BillDetailPage({ params }: { params: { billId: string } }) {
  const { toast } = useToast();
  const billData = billsData.find(b => b.id === params.billId);

  const handleNotify = (participantAddress: string) => {
    toast({
        title: "Reminder Sent!",
        description: `A notification has been sent to ${participantAddress}.`,
    });
  }

  if (!billData) {
    return (
        <Sidebar>
            <MainSidebar />
            <div className="flex-1">
                <PageHeader title="Bill Not Found" />
                <main className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen flex items-center justify-center">
                    <Card>
                        <CardHeader>
                            <CardTitle>Bill Not Found</CardTitle>
                            <CardDescription>The bill you are looking for does not exist.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Button variant="outline" asChild>
                                <Link href="/bills">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to All Bills
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </Sidebar>
    )
  }

  const isSafeFunded = billData.fundingSource === 'DAO Safe';
  const isPending = billData.status === 'Pending';
  const isFailed = billData.status === 'Failed';
  const isPaid = billData.status === 'Paid';

  return (
    <Sidebar>
      <MainSidebar />
      <div className="flex-1">
        <PageHeader title="Bill Details">
            <Button variant="outline" asChild>
                <Link href="/bills">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to All Bills
                </Link>
            </Button>
        </PageHeader>
        <main className="p-4 sm:p-6 lg:p-8 bg-background min-h-screen">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {isFailed && billData.failureReason && (
                    <Card className="border-destructive bg-destructive/10">
                        <CardHeader className="flex-row gap-4 items-center">
                           <AlertTriangle className="h-6 w-6 text-destructive" />
                           <div>
                             <CardTitle className="text-destructive">Payment Failed</CardTitle>
                             <CardDescription className="text-destructive/80">{billData.failureReason}</CardDescription>
                           </div>
                        </CardHeader>
                    </Card>
                )}

                {/* Bill Details Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">{billData.title}</CardTitle>
                        <CardDescription>
                            A {billData.type} bill created on {billData.date}.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="space-y-1">
                                <p className="text-muted-foreground">Status</p>
                                <p>
                                    <Badge 
                                        variant={
                                            billData.status === 'Paid' ? 'success' :
                                            billData.status === 'Pending' ? 'warning' :
                                            billData.status === 'Waiting for Approval' ? 'info' :
                                            billData.status === 'Failed' ? 'destructive' : 'default'
                                        }
                                        className="font-semibold"
                                    >
                                        {billData.status}
                                    </Badge>
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-muted-foreground">Amount</p>
                                <p className="font-semibold">{billData.amount}</p>
                            </div>
                             <div className="space-y-1">
                                <p className="text-muted-foreground">Funding Source</p>
                                <p className="font-semibold">{billData.fundingSource}</p>
                            </div>
                             <div className="space-y-1">
                                <p className="text-muted-foreground">Bill ID</p>
                                <p className="font-mono text-xs">{billData.id}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Participant Details Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Participants</CardTitle>
                        <CardDescription>
                            A list of all participants in this bill split.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                       <div className="space-y-4">
                           {billData.participants.map(p => (
                               <div key={p.address} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                                    <div>
                                        <p className="font-mono text-sm">{p.address}</p>
                                        <p className="text-xs text-muted-foreground">Amount: {p.amount}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant={
                                            p.status === 'Paid' ? 'success' :
                                            p.status === 'Pending' ? 'warning' :
                                            'destructive'
                                        } className="capitalize">
                                            { p.status === 'Paid' && <CheckCircle2 className="mr-1 h-3 w-3" />}
                                            { p.status === 'Pending' && <Clock className="mr-1 h-3 w-3" />}
                                            { p.status === 'Failed' && <AlertCircle className="mr-1 h-3 w-3" />}
                                            {p.status}
                                        </Badge>
                                        {p.status === 'Pending' && (
                                            <Button variant="ghost" size="sm" className="h-auto p-1" onClick={() => handleNotify(p.address)}>
                                                <Bell className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                               </div>
                           ))}
                       </div>
                    </CardContent>
                </Card>

            </div>

            <div className="lg:col-span-1 space-y-8">
                {isSafeFunded && billData.safeDetails && (
                    <SafeApprovalPanel safeDetails={billData.safeDetails} />
                )}

                {billData.bounty && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                          <Gift className="text-primary" />
                          <span>Bounty Details</span>
                      </CardTitle>
                      <CardDescription>Status of the creator/referral bounty for this bill.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bounty Amount</span>
                        <span className="font-semibold">{billData.bounty.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Recipient</span>
                        <span className="font-mono text-xs">{billData.bounty.recipient}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <Badge
                          variant={billData.bounty.status === 'Paid' ? 'success' : 'warning'}
                          className="font-semibold"
                        >
                          {billData.bounty.status === 'Paid' ? <CheckCircle className="mr-1 h-3 w-3" /> : <Clock className="mr-1 h-3 w-3" />}
                          {billData.bounty.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {!isPaid && !isFailed && (
                     <Card>
                        <CardHeader>
                            <CardTitle>Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {isPending && <Button className="w-full">Settle Bill</Button>}
                            <Button variant="outline" className="w-full">Share Bill</Button>
                            <Button variant="destructive" className="w-full">Cancel Bill</Button>
                        </CardContent>
                     </Card>
                )}
            </div>
          </div>
        </main>
      </div>
    </Sidebar>
  );
}
