
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, CheckCircle2, Clock, Bell, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


interface Approver {
    address: string;
    hasApproved: boolean;
}

interface SafeDetails {
    address: string;
    requiredApprovals: number;
    approvers: Approver[];
}

interface SafeApprovalPanelProps {
    safeDetails: SafeDetails;
}

export function SafeApprovalPanel({ safeDetails }: SafeApprovalPanelProps) {
    const { toast } = useToast();
    const approvedCount = safeDetails.approvers.filter(a => a.hasApproved).length;
    const progress = (approvedCount / safeDetails.requiredApprovals) * 100;
    const pendingApprovers = safeDetails.approvers.filter(a => !a.hasApproved);

    const handleRemind = () => {
        toast({
            title: "Reminders Sent!",
            description: "Notifications have been sent to all pending signers.",
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="text-primary" />
                    <span>Safe Approval Status</span>
                </CardTitle>
                <CardDescription>This bill requires multi-sig approval from your DAO's Gnosis Safe.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium">
                            <span className="text-primary font-bold">{approvedCount}</span> of <span className="font-bold">{safeDetails.requiredApprovals}</span> required approvals
                        </p>
                        <p className="text-sm font-bold text-primary">{progress.toFixed(0)}%</p>
                    </div>
                    <Progress value={progress} />
                </div>
                <Separator />
                <div>
                    <h4 className="font-medium text-sm mb-2">Signer Status</h4>
                    <div className="space-y-3">
                        {safeDetails.approvers.map(approver => (
                            <div key={approver.address} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarImage src={`https://placehold.co/40x40.png`} data-ai-hint="person avatar" />
                                        <AvatarFallback>{approver.address.slice(0, 1)}</AvatarFallback>
                                    </Avatar>
                                    <span className="font-mono text-xs">{approver.address}</span>
                                </div>
                                {approver.hasApproved ? (
                                    <div className="flex items-center gap-1 text-success">
                                        <CheckCircle2 className="h-4 w-4" />
                                        <span>Approved</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1 text-warning-foreground">
                                        <Clock className="h-4 w-4" />
                                        <span>Pending</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                 <Separator />
                {pendingApprovers.length > 0 && (
                    <Button onClick={handleRemind} variant="outline" className="w-full">
                        <Bell className="mr-2 h-4 w-4" />
                        Remind Pending Signers
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}

