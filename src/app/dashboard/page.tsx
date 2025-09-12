
'use client';
import { useState, useEffect } from 'react';
import { MainSidebar } from "@/components/layout/main-sidebar";
import { PageHeader } from "@/components/layout/page-header";
import {
  Sidebar,
} from "@/components/ui/sidebar";
import { CreateBillDropdown } from "@/components/bill/create-bill-dropdown";
import { WalletBalances } from "@/components/dashboard/wallet-balances";
import { RoyaltyPoolOverview } from "@/components/dashboard/royalty-pool-overview";
import { BillsOverview } from "@/components/dashboard/bills-overview";
import { Card } from "@/components/ui/card";
import { DashboardLoader } from '@/components/dashboard/dashboard-loader';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Simulate loading time, can be adjusted or removed
    return () => clearTimeout(timer);
  }, []);

  return (
    <Sidebar>
      <MainSidebar />
      <div className="flex-1">
        <PageHeader title="Dashboard">
            <CreateBillDropdown />
        </PageHeader>
        <main className="p-4 sm:p-6 lg:p-8 space-y-8 bg-background min-h-screen">
          {loading ? <DashboardLoader /> : (
            <>
              <WalletBalances />
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <Card className="lg:col-span-3">
                  <BillsOverview />
                </Card>
                <div className="lg:col-span-2">
                  <RoyaltyPoolOverview />
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </Sidebar>
  );
}
