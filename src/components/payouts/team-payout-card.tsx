
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Repeat, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

interface TeamMember {
  name: string;
  avatar: string;
}

interface TeamPayoutCardProps {
  name: string;
  avatar: string;
  members: TeamMember[];
  splitAmount: string;
  frequency: string;
  nextDue: string;
  pastBills: number;
}

export function TeamPayoutCard({
  name,
  avatar,
  members,
  splitAmount,
  frequency,
  nextDue,
  pastBills,
}: TeamPayoutCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center text-center">
        <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src={avatar} data-ai-hint="group picture" />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex items-center justify-center">
            <CardTitle className="font-headline">{name}</CardTitle>
        </div>
        <CardDescription>{members.length} members</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-grow">
        <div className="text-3xl font-bold font-headline text-center">{splitAmount}</div>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Repeat className="h-4 w-4" />
              <span>Frequency</span>
            </div>
            <span className="font-semibold text-foreground">{frequency}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Next Due</span>
            </div>
            <span className="font-semibold text-foreground">{nextDue}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>Past Bills</span>
            </div>
            <span className="font-semibold text-foreground">{pastBills}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button asChild className="w-full">
            <Link href="/team-payouts/1">
              <span>Manage Team</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
