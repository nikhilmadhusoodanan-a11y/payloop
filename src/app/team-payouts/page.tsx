
"use client";
import { MainSidebar } from "@/components/layout/main-sidebar";
import { PageHeader } from "@/components/layout/page-header";
import { Sidebar } from "@/components/ui/sidebar";
import { TeamPayoutCard } from "@/components/payouts/team-payout-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const CreateBillDialog = dynamic(() => import('@/components/bill/create-bill-dialog').then(mod => mod.CreateBillDialog), { ssr: false });


const teams = [
  {
    name: "Frontend Developers",
    avatar: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Z3JvdXB8ZW58MHx8fHwxNzU0OTk5MTA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    members: [
      { name: "Alice", avatar: "https://placehold.co/40x40" },
      { name: "Bob", avatar: "https://placehold.co/40x40" },
      { name: "Charlie", avatar: "https://placehold.co/40x40" },
    ],
    splitAmount: "1,500 USDC",
    frequency: "Weekly",
    nextDue: "2024-08-01",
    pastBills: 12,
  },
  {
    name: "Backend Engineers",
    avatar: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Z3JvdXB8ZW58MHx8fHwxNzU0OTk5MTA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    members: [
        { name: "David", avatar: "https://placehold.co/40x40" },
        { name: "Eve", avatar: "https://placehold.co/40x40" },
    ],
    splitAmount: "2,000 USDC",
    frequency: "Bi-weekly",
    nextDue: "2024-08-10",
    pastBills: 6,
  },
  {
    name: "Design Team",
    avatar: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Z3JvdXB8ZW58MHx8fHwxNzU0OTk5MTA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    members: [
        { name: "Frank", avatar: "https://placehold.co/40x40" },
        { name: "Grace", avatar: "https://placehold.co/40x40" },
        { name: "Heidi", avatar: "https://placehold.co/40x40" },
        { name: "Ivan", avatar: "https://placehold.co/40x40" },
    ],
    splitAmount: "1,800 DAI",
    frequency: "Monthly",
    nextDue: "2024-08-20",
    pastBills: 3,
  },
];


export default function TeamPayoutsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <Sidebar>
      <MainSidebar />
      <div className="flex-1">
        <PageHeader title="Team Payouts">
            <Button onClick={() => setDialogOpen(true)}>
              <Plus />
              <span className="hidden sm:inline">Create New Team</span>
              <span className="inline sm:hidden">New Team</span>
            </Button>
            <CreateBillDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                title="Create a New Team Split"
                description="Use this form to set up a new recurring payout for your team."
                billTitleLabel="Team Name"
            />
        </PageHeader>
        <main className="p-4 sm:p-6 lg:p-8 space-y-8 bg-background min-h-screen">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {teams.map((team) => (
              <TeamPayoutCard key={team.name} {...team} />
            ))}
          </div>
        </main>
      </div>
    </Sidebar>
  );
}
