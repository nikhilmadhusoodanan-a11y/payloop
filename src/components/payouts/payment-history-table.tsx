"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle2, Clock, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useToast } from "@/hooks/use-toast";


interface Participant {
    name: string;
    status: 'Paid' | 'Pending';
}

interface Payment {
    tx: string;
    date: string;
    amount: string;
    status: string;
    participants: Participant[];
}

interface PaymentHistoryTableProps {
    payments: Payment[]
}

const participantStatusIcon = {
    Paid: <CheckCircle2 className="h-4 w-4 text-success" />,
    Pending: <Clock className="h-4 w-4 text-warning" />,
}

export function PaymentHistoryTable({ payments }: PaymentHistoryTableProps) {
    const { toast } = useToast();

    const handleNotify = (participantName: string) => {
        toast({
            title: "Notification Sent!",
            description: `A reminder has been sent to ${participantName}.`,
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>A record of all payouts made to this team.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-lg border overflow-x-auto">
                    <Accordion type="single" collapsible className="w-full">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]"></TableHead>
                                    <TableHead className="min-w-[150px]">Transaction</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payments.map((payment, index) => (
                                    <AccordionItem value={`item-${index}`} key={payment.tx} asChild>
                                        <>
                                            <TableRow>
                                                <TableCell>
                                                    <AccordionTrigger className="p-0 hover:no-underline"></AccordionTrigger>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="link" asChild className="p-0 h-auto font-mono text-xs">
                                                        <a href="#" target="_blank">
                                                            {payment.tx.slice(0, 10)}...{payment.tx.slice(-4)}
                                                            <ExternalLink className="h-3 w-3 ml-1.5" />
                                                        </a>
                                                    </Button>
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">{payment.date}</TableCell>
                                                <TableCell className="font-medium">{payment.amount}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            payment.status === 'Paid' ? 'success' :
                                                            payment.status === 'Partial' ? 'info' :
                                                            'default'
                                                        }
                                                        className="font-semibold"
                                                    >
                                                        {payment.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan={5} className="p-0">
                                                    <AccordionContent>
                                                        <div className="p-4 bg-secondary">
                                                            <h4 className="font-semibold mb-2 px-4">Participant Status</h4>
                                                            <div className="rounded-md border bg-background">
                                                                <Table>
                                                                    <TableBody>
                                                                    {payment.participants.map(p => (
                                                                        <TableRow key={p.name} className="border-b-0 last:border-b-0">
                                                                            <TableCell className="font-medium">{p.name}</TableCell>
                                                                            <TableCell className="text-right">
                                                                                <div className="flex items-center justify-end gap-2">
                                                                                    {participantStatusIcon[p.status]}
                                                                                    <span className={cn(p.status === 'Paid' ? 'text-success' : 'text-warning')}>{p.status}</span>
                                                                                    {p.status === 'Pending' && (
                                                                                        <Button variant="ghost" size="sm" className="h-auto px-2 py-1 text-xs ml-2" onClick={() => handleNotify(p.name)}>
                                                                                            <Bell className="h-3 w-3 mr-1" />
                                                                                            Notify
                                                                                        </Button>
                                                                                    )}
                                                                                </div>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </div>
                                                        </div>
                                                    </AccordionContent>
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    </AccordionItem>
                                ))}
                            </TableBody>
                        </Table>
                    </Accordion>
                </div>
            </CardContent>
        </Card>
    )
}
