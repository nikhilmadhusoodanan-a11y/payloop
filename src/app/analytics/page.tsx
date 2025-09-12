
import { MainSidebar } from "@/components/layout/main-sidebar";
import { PageHeader } from "@/components/layout/page-header";
import { Sidebar } from "@/components/ui/sidebar";
import { StatCard } from "@/components/analytics/stat-card";
import { VolumeChart } from "@/components/analytics/volume-chart";
import { TokenDistributionChart } from "@/components/analytics/token-distribution-chart";
import { TransactionsTable } from "@/components/analytics/transactions-table";
import { DollarSign, Users, User, Flame, Banknote, Calendar, TrendingUp, Gem, Trophy } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoyaltyIncomeAnalytics } from "@/components/analytics/royalty-income-analytics";
import { BountiesAnalytics } from "@/components/analytics/bounties-analytics";
import MagicBento from "@/components/dashboard/magic-bento";

export default function AnalyticsPage() {
  const stats = [
    { title: "Total Split Volume", value: "$125,680", icon: DollarSign, change: "+12.5%" },
    { title: "Most Active Collaborator", value: "dev.eth", icon: User, change: "15 splits" },
    { title: "Most Used Token", value: "USDC", icon: Banknote, change: "72% of volume" },
    { title: "Top Team", value: "Frontend Devs", icon: Users, change: "24 payouts" },
  ];

  return (
    <Sidebar>
      <MainSidebar />
      <div className="flex-1">
        <PageHeader title="Analytics" />
        <main className="p-4 sm:p-6 lg:p-8 space-y-8 bg-background min-h-screen">
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-1 sm:w-auto sm:grid-cols-3 h-auto">
              <TabsTrigger value="overview">
                <TrendingUp className="mr-2 h-4 w-4" />
                Overview
                </TabsTrigger>
              <TabsTrigger value="royalty-incomes">
                <Gem className="mr-2 h-4 w-4" />
                Royalty Incomes
                </TabsTrigger>
              <TabsTrigger value="bounties">
                <Trophy className="mr-2 h-4 w-4" />
                Bounties
                </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6 space-y-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                   <MagicBento key={stat.title}
                        textAutoHide={false}
                        enableStars={true}
                        enableSpotlight={true}
                        enableBorderGlow={true}
                        enableTilt={true}
                        enableMagnetism={true}
                        clickEffect={true}
                        spotlightRadius={200}
                        particleCount={10}
                        glowColor="263, 76%, 59%"
                    >
                        <StatCard {...stat} />
                    </MagicBento>
                ))}
              </div>
              
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                <div className="lg:col-span-3">
                  <VolumeChart />
                </div>
                <div className="lg:col-span-2">
                  <TokenDistributionChart />
                </div>
              </div>

              <div>
                <TransactionsTable />
              </div>
            </TabsContent>
             <TabsContent value="royalty-incomes" className="mt-6">
              <RoyaltyIncomeAnalytics />
            </TabsContent>
            <TabsContent value="bounties" className="mt-6">
              <BountiesAnalytics />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </Sidebar>
  );
}
