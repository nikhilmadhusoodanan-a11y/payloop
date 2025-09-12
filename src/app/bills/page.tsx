
"use client";
import { MainSidebar } from "@/components/layout/main-sidebar";
import { PageHeader } from "@/components/layout/page-header";
import { Sidebar } from "@/components/ui/sidebar";
import { BillsTable } from "@/components/bills/bills-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const CreateBillDialog = dynamic(() => import('@/components/bill/create-bill-dialog').then(mod => mod.CreateBillDialog), { ssr: false });


export default function BillsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <Sidebar>
      <MainSidebar />
      <div className="flex-1">
        <PageHeader title="All Bills">
            <Button onClick={() => setDialogOpen(true)}>
                <Plus />
                <span className="hidden sm:inline">Create Bill</span>
                <span className="inline sm:hidden">New</span>
            </Button>
            <CreateBillDialog open={dialogOpen} onOpenChange={setDialogOpen} />
        </PageHeader>
        <main className="p-4 sm:p-6 lg:p-8 space-y-8 bg-background min-h-screen">
          <BillsTable />
        </main>
      </div>
    </Sidebar>
  );
}
