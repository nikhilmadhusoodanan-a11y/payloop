
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X, User, Users, Percent, Download, Upload, Fuel, Repeat, Calendar as CalendarIcon, Wallet, Gem, Split, CircleDollarSign, Sparkles, ShieldCheck, Gift } from "lucide-react";
import { BillRecommendation } from "./bill-recommendation";
import { ShareBillCard } from "./share-bill-card";
import { PolygonLogo, BaseLogo } from "@/components/icons";
import { EthLogo } from "@/components/icons";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";


type View = "form" | "share";
type SplitLogic = "equal" | "custom" | "percentage";
type DistributionMode = "pull" | "push";
type BillType = "one-time" | "recurring";
type FundingSource = "wallet" | "royalty" | "safe";
type AmountType = "fixed" | "incoming";


interface CreateBillDialogProps {
    children?: React.ReactNode;
    title?: string;
    description?: string;
    billTitle?: string;
    billTitleLabel?: string;
    royaltyAddress?: string;
    billAmount?: number;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function CreateBillDialog({ children, title, description, billTitle, billTitleLabel, royaltyAddress, billAmount, open, onOpenChange }: CreateBillDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [view, setView] = useState<View>("form");
  const [participants, setParticipants] = useState<string[]>([]);
  const [newParticipant, setNewParticipant] = useState("");
  const [amount, setAmount] = useState<number>(billAmount || 0);
  const [splitLogic, setSplitLogic] = useState<SplitLogic>("equal");
  const [distributionMode, setDistributionMode] = useState<DistributionMode>('pull');
  const [customSplits, setCustomSplits] = useState<{ [key: string]: number }>({});
  const [percentageSplits, setPercentageSplits] = useState<{ [key: string]: number }>({});
  const [billType, setBillType] = useState<BillType>('one-time');
  const [recurrenceFrequency, setRecurrenceFrequency] = useState('monthly');
  const [recurrenceDate, setRecurrenceDate] = useState<Date>();
  const [fundingSource, setFundingSource] = useState<FundingSource>(royaltyAddress ? 'royalty' : 'wallet');
  const [amountType, setAmountType] = useState<AmountType>('fixed');
  const [bountyPercentage, setBountyPercentage] = useState(0);

  const isControlled = open !== undefined && onOpenChange !== undefined;
  const dialogOpen = isControlled ? open : internalOpen;
  
  const setDialogOpen = (isOpen: boolean) => {
    if (isControlled) {
        onOpenChange?.(isOpen);
    } else {
        setInternalOpen(isOpen);
    }
  }


  const addParticipant = () => {
    if (newParticipant && !participants.includes(newParticipant)) {
      setParticipants([...participants, newParticipant]);
      setNewParticipant("");
    }
  };

  const removeParticipant = (address: string) => {
    setParticipants(participants.filter((p) => p !== address));
    const newCustom = {...customSplits};
    delete newCustom[address];
    setCustomSplits(newCustom);
    const newPercentage = {...percentageSplits};
    delete newPercentage[address];
    setPercentageSplits(newPercentage);
  };
  
  const handleCreateBill = () => {
    // In a real app, this would submit the form data
    setView("share");
  };
  
  const resetAndClose = () => {
    setParticipants([]);
    setNewParticipant("");
    setAmount(billAmount || 0);
    setSplitLogic('equal');
    setDistributionMode('pull');
    setBillType('one-time');
    setFundingSource(royaltyAddress ? 'royalty' : 'wallet');
    setAmountType('fixed');
    setRecurrenceFrequency('monthly');
    setRecurrenceDate(undefined);
    setCustomSplits({});
    setPercentageSplits({});
    setBountyPercentage(0);
    setView("form");
    setDialogOpen(false);
  };

  useEffect(() => {
    if (royaltyAddress) {
        setFundingSource('royalty');
    }
    if (billAmount) {
        setAmount(billAmount);
        setAmountType('fixed');
    } else if (royaltyAddress) {
        setAmountType('incoming');
    }
  }, [royaltyAddress, billAmount]);

  useEffect(() => {
    // When the dialog is controlled and opens, we might need to reset state.
    if (dialogOpen) {
      setFundingSource(royaltyAddress ? 'royalty' : 'wallet');
       if (billAmount) {
        setAmount(billAmount);
        setAmountType('fixed');
    } else if (royaltyAddress) {
        setAmountType('incoming');
    } else {
        setAmountType('fixed');
    }
    }
  }, [dialogOpen, royaltyAddress, billAmount]);

  const handleCustomSplitChange = (participant: string, value: string) => {
    setCustomSplits({
        ...customSplits,
        [participant]: parseFloat(value) || 0,
    });
  };

  const handlePercentageSplitChange = (participant: string, value: string) => {
    setPercentageSplits({
        ...percentageSplits,
        [participant]: parseFloat(value) || 0,
    });
  };

  const totalCustomAmount = Object.values(customSplits).reduce((sum, val) => sum + val, 0);
  const totalPercentage = Object.values(percentageSplits).reduce((sum, val) => sum + val, 0);
  const isFixedAmount = amountType === 'fixed';
  const bountyAmount = amount * (bountyPercentage / 100);

  return (
    <Dialog open={dialogOpen} onOpenChange={(isOpen) => {
      if (!isOpen) {
        resetAndClose();
      } else {
        setDialogOpen(true);
      }
    }}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        {view === 'form' ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl">{title || 'Create a New Bill'}</DialogTitle>
              <DialogDescription>
                {description || 'Fill in the details below to create and split a new bill.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-8 py-4">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">{billTitleLabel || "Bill Title"}</Label>
                  <Input id="title" placeholder="e.g., Team Dinner" defaultValue={billTitle} />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                   <div className="flex items-center gap-2">
                    <Input id="amount" type="number" placeholder="100.00" value={amount || ''} onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} disabled={!isFixedAmount} />
                    <Select defaultValue="usdc" disabled={!isFixedAmount}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usdc">USDC</SelectItem>
                        <SelectItem value="eth">ETH</SelectItem>
                        <SelectItem value="dai">DAI</SelectItem>
                      </SelectContent>
                    </Select>
                   </div>
                </div>
              </div>
               <div className="space-y-2">
                  <Label htmlFor="note">Note (Optional)</Label>
                  <Textarea id="note" placeholder="Add any relevant details" />
               </div>

                {/* Funding Source */}
               <div className="space-y-3">
                    <Label>Funding Source</Label>
                    <div className={cn("grid gap-4", royaltyAddress ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
                        <Card className={cn("cursor-pointer", fundingSource === 'wallet' && "border-primary ring-2 ring-primary")} onClick={() => setFundingSource('wallet')}>
                          <CardHeader className="flex-row items-center gap-4 space-y-0">
                                <div className="bg-primary/20 p-2 rounded-lg"><Wallet className="h-6 w-6 text-primary"/></div>
                                <CardTitle className="font-semibold text-base">My Wallet</CardTitle>
                          </CardHeader>
                        </Card>
                        <Card className={cn("cursor-pointer", fundingSource === 'safe' && "border-primary ring-2 ring-primary")} onClick={() => setFundingSource('safe')}>
                          <CardHeader className="flex-row items-center gap-4 space-y-0">
                                <div className="bg-primary/20 p-2 rounded-lg"><ShieldCheck className="h-6 w-6 text-primary"/></div>
                                <CardTitle className="font-semibold text-base">DAO Safe</CardTitle>
                          </CardHeader>
                        </Card>
                         <Card className={cn("cursor-pointer", fundingSource === 'royalty' && "border-primary ring-2 ring-primary", !royaltyAddress && "hidden")} onClick={() => royaltyAddress && setFundingSource('royalty')}>
                          <CardHeader className="flex-row items-center gap-4 space-y-0">
                                <div className="bg-primary/20 p-2 rounded-lg"><Gem className="h-6 w-6 text-primary"/></div>
                                <CardTitle className="font-semibold text-base">Royalty Pool</CardTitle>
                          </CardHeader>
                        </Card>
                    </div>
                    {fundingSource === 'royalty' && royaltyAddress && (
                        <Card className="p-4 bg-secondary/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Available Royalty Balance</p>
                                    <p className="text-lg font-bold text-foreground">16.20 ETH</p>
                                    {royaltyAddress && (
                                        <p className="text-xs font-mono text-muted-foreground mt-1">{royaltyAddress}</p>
                                    )}
                                </div>
                                <Button variant="outline" size="sm">Manage</Button>
                            </div>
                        </Card>
                    )}
                     {fundingSource === 'safe' && (
                        <Card className="p-4 bg-secondary/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Connected DAO Safe</p>
                                    <p className="text-lg font-bold text-foreground">5,432.10 USDC</p>
                                    <p className="text-xs font-mono text-muted-foreground mt-1">your-dao.eth</p>
                                </div>
                                <Button variant="outline" size="sm">Switch Safe</Button>
                            </div>
                        </Card>
                    )}
                </div>


                {/* Amount Type Selection */}
                {fundingSource === 'royalty' && (
                     <div className="space-y-3">
                        <Label>Amount Type</Label>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <Card className={cn("cursor-pointer", amountType === 'fixed' && "border-primary ring-2 ring-primary")} onClick={() => setAmountType('fixed')}>
                                <CardHeader className="flex-row items-center gap-4 space-y-0">
                                    <div className="bg-primary/20 p-2 rounded-lg"><CircleDollarSign className="h-6 w-6 text-primary"/></div>
                                    <CardTitle className="font-semibold text-base">Fixed Amount</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-xs">Split a specific, fixed amount from your pool.</CardDescription>
                                </CardContent>
                            </Card>
                            <Card className={cn("cursor-pointer", amountType === 'incoming' && "border-primary ring-2 ring-primary")} onClick={() => setAmountType('incoming')}>
                                <CardHeader className="flex-row items-center gap-4 space-y-0">
                                    <div className="bg-primary/20 p-2 rounded-lg"><Sparkles className="h-6 w-6 text-primary"/></div>
                                    <CardTitle className="font-semibold text-base">All Incoming Revenue</CardTitle>
                                </CardHeader>
                                <CardContent>
                                <CardDescription className="text-xs">Automatically split all revenue that comes into this address.</CardDescription>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}


              {/* Network Selection */}
              <div className="space-y-2">
                <Label>Network</Label>
                <Select defaultValue="polygon">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a network" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="polygon">
                      <div className="flex items-center gap-2">
                        <PolygonLogo className="h-5 w-5"/>
                        <span>Polygon</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="base">
                       <div className="flex items-center gap-2">
                        <BaseLogo className="h-5 w-5"/>
                        <span>Base</span>
                      </div>
                    </SelectItem>
                     <SelectItem value="ethereum">
                       <div className="flex items-center gap-2">
                        <EthLogo className="h-5 w-5"/>
                        <span>Ethereum</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

               {/* Bill Type Selection */}
               <div className="space-y-3">
                    <Label>Bill Type</Label>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Card className={cn("cursor-pointer", billType === 'one-time' && "border-primary ring-2 ring-primary")} onClick={() => setBillType('one-time')}>
                           <CardHeader className="flex-row items-center gap-4 space-y-0">
                                <div className="bg-primary/20 p-2 rounded-lg"><CalendarIcon className="h-6 w-6 text-primary"/></div>
                                <CardTitle className="font-semibold text-base">One-Time Split</CardTitle>
                           </CardHeader>
                           <CardContent>
                               <CardDescription className="text-xs">A single bill that will be settled once.</CardDescription>
                           </CardContent>
                        </Card>
                         <Card className={cn("cursor-pointer", billType === 'recurring' && "border-primary ring-2 ring-primary")} onClick={() => setBillType('recurring')}>
                           <CardHeader className="flex-row items-center gap-4 space-y-0">
                                <div className="bg-primary/20 p-2 rounded-lg"><Repeat className="h-6 w-6 text-primary"/></div>
                                <CardTitle className="font-semibold text-base">Recurring Split</CardTitle>
                           </CardHeader>
                            <CardContent>
                               <CardDescription className="text-xs">An ongoing bill that will be settled at a set frequency.</CardDescription>
                           </CardContent>
                        </Card>
                    </div>
                    {billType === 'recurring' && (
                        <Card className="p-4 bg-secondary/50">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="recurrence-frequency">Recurrence Frequency</Label>
                                    <Select value={recurrenceFrequency} onValueChange={setRecurrenceFrequency}>
                                        <SelectTrigger id="recurrence-frequency">
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
                                    <Label htmlFor="recurrence-date">Start Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <Button
                                            id="recurrence-date"
                                            variant={"outline"}
                                            className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !recurrenceDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {recurrenceDate ? format(recurrenceDate, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={recurrenceDate}
                                                onSelect={setRecurrenceDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>

               {/* Participants */}
               <div className="space-y-2">
                <Label htmlFor="participants"><Users className="inline-block mr-2 h-4 w-4"/>Participants</Label>
                <div className="flex gap-2">
                  <Input
                    id="participants"
                    placeholder="ENS or wallet address (0x...)"
                    value={newParticipant}
                    onChange={(e) => setNewParticipant(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addParticipant()}
                  />
                  <Button type="button" variant="outline" onClick={addParticipant}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {participants.map((p) => (
                    <div key={p} className="flex items-center gap-2 bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm">
                      <User className="h-4 w-4" />
                      <span>{p.length > 12 ? `${p.slice(0,6)}...${p.slice(-4)}` : p}</span>
                      <button onClick={() => removeParticipant(p)} className="text-muted-foreground hover:text-foreground">
                        <X className="h-4 w-4"/>
                      </button>
                    </div>
                  ))}
                </div>
               </div>

                {/* Split Logic */}
                {participants.length > 0 && (amount > 0 || !isFixedAmount) && (
                  <div className="space-y-4">
                    <Label>Split Logic</Label>
                    <div className="grid sm:grid-cols-3 gap-4">
                        <Card className={cn("cursor-pointer", splitLogic === 'equal' && "border-primary ring-2 ring-primary")} onClick={() => setSplitLogic('equal')}>
                           <CardHeader className="flex-row items-center gap-4 space-y-0 p-4">
                                <div className="bg-primary/20 p-2 rounded-lg"><Users className="h-6 w-6 text-primary"/></div>
                                <CardTitle className="font-semibold text-base">Equal</CardTitle>
                           </CardHeader>
                           <CardContent className="p-4 pt-0">
                               <CardDescription className="text-xs">Split the bill equally among all participants.</CardDescription>
                           </CardContent>
                        </Card>
                        <Card className={cn("cursor-pointer", splitLogic === 'custom' && "border-primary ring-2 ring-primary")} onClick={() => setSplitLogic('custom')}
                            aria-disabled={!isFixedAmount}
                            style={{pointerEvents: !isFixedAmount ? 'none' : 'auto', opacity: !isFixedAmount ? 0.5 : 1}}
                        >
                           <CardHeader className="flex-row items-center gap-4 space-y-0 p-4">
                                <div className="bg-primary/20 p-2 rounded-lg"><User className="h-6 w-6 text-primary"/></div>
                                <CardTitle className="font-semibold text-base">Custom</CardTitle>
                           </CardHeader>
                            <CardContent className="p-4 pt-0">
                               <CardDescription className="text-xs">Assign custom, fixed amounts for each participant.</CardDescription>
                           </CardContent>
                        </Card>
                        <Card className={cn("cursor-pointer", splitLogic === 'percentage' && "border-primary ring-2 ring-primary")} onClick={() => setSplitLogic('percentage')}>
                           <CardHeader className="flex-row items-center gap-4 space-y-0 p-4">
                                <div className="bg-primary/20 p-2 rounded-lg"><Percent className="h-6 w-6 text-primary"/></div>
                                <CardTitle className="font-semibold text-base">Percentage</CardTitle>
                           </CardHeader>
                            <CardContent className="p-4 pt-0">
                               <CardDescription className="text-xs">Split the bill by percentage for each participant.</CardDescription>
                           </CardContent>
                        </Card>
                    </div>
                    
                    {splitLogic !== 'equal' && (
                        <Card className="p-4 bg-secondary/50">
                            <div className="space-y-2">
                                {participants.map(p => (
                                    <div key={p} className="flex items-center gap-4">
                                        <Label htmlFor={`split-${p}`} className="w-1/3 truncate text-muted-foreground">{p.length > 12 ? `${p.slice(0,6)}...${p.slice(-4)}` : p}</Label>
                                        <Input
                                            id={`split-${p}`}
                                            type="number"
                                            placeholder={splitLogic === 'custom' ? '0.00' : '0'}
                                            value={splitLogic === 'custom' ? customSplits[p] || '' : percentageSplits[p] || ''}
                                            onChange={(e) => splitLogic === 'custom' ? handleCustomSplitChange(p, e.target.value) : handlePercentageSplitChange(p, e.target.value)}
                                            className="flex-grow"
                                            disabled={splitLogic === 'custom' && !isFixedAmount}
                                        />
                                        {splitLogic === 'percentage' && <span className="text-muted-foreground">%</span>}
                                    </div>
                                ))}
                            </div>
                            {splitLogic === 'custom' && isFixedAmount && totalCustomAmount !== amount && (
                                <p className="text-destructive text-xs mt-2">
                                    Total custom split (${totalCustomAmount.toFixed(2)}) does not match the bill amount (${amount.toFixed(2)}).
                                </p>
                            )}
                            {splitLogic === 'percentage' && totalPercentage !== 100 && (
                                <p className="text-destructive text-xs mt-2">
                                    Total percentage ({totalPercentage}%) must be exactly 100%.
                                </p>
                            )}
                        </Card>
                    )}
                  </div>
                )}
               
                {/* Distribution Mode */}
                <div className="space-y-3">
                    <Label>Distribution Mode</Label>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Card className={cn("cursor-pointer", distributionMode === 'pull' && "border-primary ring-2 ring-primary")} onClick={() => setDistributionMode('pull')}>
                           <CardHeader className="flex-row items-center gap-4 space-y-0">
                                <div className="bg-primary/20 p-2 rounded-lg"><Download className="h-6 w-6 text-primary"/></div>
                                <CardTitle className="font-semibold text-base">Pull Mode</CardTitle>
                           </CardHeader>
                           <CardContent>
                               <CardDescription className="text-xs">Participants pull their share from the contract. Lower gas for you.</CardDescription>
                           </CardContent>
                        </Card>
                         <Card className={cn("cursor-pointer", distributionMode === 'push' && "border-primary ring-2 ring-primary")} onClick={() => setDistributionMode('push')}>
                           <CardHeader className="flex-row items-center gap-4 space-y-0">
                                <div className="bg-primary/20 p-2 rounded-lg"><Upload className="h-6 w-6 text-primary"/></div>
                                <CardTitle className="font-semibold text-base">Push Mode</CardTitle>
                           </CardHeader>
                            <CardContent>
                               <CardDescription className="text-xs">You push funds to participants. More convenient for them, higher gas for you.</CardDescription>
                           </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Bounty & Referral */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="text-primary"/>
                      Bounty & Referral
                    </CardTitle>
                    <CardDescription>Reward the bill creator or a referrer with a small percentage of the bill amount.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bounty-percentage">Bounty Percentage</Label>
                        <Select value={bountyPercentage.toString()} onValueChange={(v) => setBountyPercentage(parseInt(v))}>
                          <SelectTrigger id="bounty-percentage">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">0% (None)</SelectItem>
                            <SelectItem value="1">1%</SelectItem>
                            <SelectItem value="2">2%</SelectItem>
                            <SelectItem value="3">3%</SelectItem>
                            <SelectItem value="4">4%</SelectItem>
                            <SelectItem value="5">5%</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="referral-wallet">Referral Wallet (Optional)</Label>
                        <Input id="referral-wallet" placeholder="ENS or 0x address" />
                      </div>
                    </div>
                    {bountyPercentage > 0 && isFixedAmount && amount > 0 && (
                      <div className="text-sm text-muted-foreground p-3 bg-secondary rounded-md">
                        Bounty: <span className="font-bold text-foreground">{bountyAmount.toFixed(2)} USDC</span> will be paid to creator upon full settlement.
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* AI Recommendations */}
               {participants.length > 0 && isFixedAmount && amount > 0 && (
                <BillRecommendation members={participants} billAmount={amount}/>
               )}

              {/* Gas Preview */}
              <div className="space-y-2">
                <Label><Fuel className="inline-block mr-2"/>Estimated Gas</Label>
                <Card className="bg-secondary/50">
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center text-sm">
                            <p className="text-muted-foreground">Creator Fee:</p>
                            <p className="font-mono text-foreground">~0.005 MATIC ($0.003)</p>
                        </div>
                         <div className="flex justify-between items-center text-sm mt-2">
                            <p className="text-muted-foreground">Participant Fee (per person):</p>
                            <p className="font-mono text-foreground">~0.002 MATIC ($0.001)</p>
                        </div>
                    </CardContent>
                </Card>
              </div>


            </div>
            <DialogFooter>
              <Button type="button" onClick={handleCreateBill} disabled={isFixedAmount && !amount || participants.length === 0}>
                {fundingSource === 'safe' ? 'Create Bill & Send to Safe' : 'Create & Share Bill'}
              </Button>
            </DialogFooter>
          </>
        ) : (
           <ShareBillCard onDone={resetAndClose} isSafeFunded={fundingSource === 'safe'} />
        )}
      </DialogContent>
    </Dialog>
  );
}
