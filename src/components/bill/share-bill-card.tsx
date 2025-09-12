
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Copy, QrCode, ShieldCheck, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ShareBillCardProps {
  onDone: () => void;
  isSafeFunded?: boolean;
}

export function ShareBillCard({ onDone, isSafeFunded = false }: ShareBillCardProps) {
    const { toast } = useToast();
    const shareLink = "https://payloop.app/b/xyz123";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareLink);
        toast({
            title: "Copied to clipboard!",
            description: "You can now share the link with participants.",
        });
    }

    const title = isSafeFunded ? "Bill Sent to DAO Safe!" : "Bill Created Successfully!";
    const description = isSafeFunded 
        ? "Your bill has been sent to the DAO Safe for approval. All required signers must approve inside Gnosis Safe before funds are distributed."
        : "Share the link or QR code below with the participants to settle the bill.";

    return (
        <>
            <DialogHeader className="text-center">
                <div className="mx-auto bg-success/20 p-3 rounded-full w-fit">
                    {isSafeFunded ? (
                        <ShieldCheck className="h-12 w-12 text-success" />
                    ) : (
                        <CheckCircle2 className="h-12 w-12 text-success" />
                    )}
                </div>
                <DialogTitle className="font-headline text-2xl mt-4">{title}</DialogTitle>
                <DialogDescription>
                    {description}
                </DialogDescription>
            </DialogHeader>

            <div className="py-4 space-y-6">
                {isSafeFunded ? (
                    <Card className="p-4 bg-secondary text-center">
                        <CardContent className="p-0">
                            <p className="text-sm text-muted-foreground">Approval Status</p>
                            <Badge variant="info" className="mt-1 text-base">Awaiting DAO Signatures (1/3 Approved)</Badge>
                            <Button variant="outline" className="w-full mt-4">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View in Gnosis Safe
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Shareable Link</label>
                            <div className="flex items-center gap-2">
                                <Input readOnly value={shareLink} />
                                <Button variant="outline" size="icon" onClick={copyToClipboard}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <Card className="flex flex-col items-center justify-center p-6 bg-secondary">
                            <CardContent className="p-0 text-center">
                                <div className="p-4 bg-background rounded-lg inline-block">
                                    <QrCode className="h-32 w-32 text-foreground" />
                                </div>
                                <p className="text-muted-foreground text-sm mt-2">Scan to pay</p>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>

            <DialogFooter>
                <Button onClick={onDone} className="w-full">Done</Button>
            </DialogFooter>
        </>
    )
}
