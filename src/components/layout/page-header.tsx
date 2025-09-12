
"use client";

import { WalletConnect } from "@/components/dashboard/wallet-connect";
import { Input } from "@/components/ui/input";
import { Search, Menu } from "lucide-react";
import { NotificationBell } from "./notification-bell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useSidebar } from "../ui/sidebar";
import { Button } from "../ui/button";


interface PageHeaderProps {
    title: string;
    children?: React.ReactNode;
    hideWalletConnect?: boolean;
}

export function PageHeader({ title, children, hideWalletConnect = false }: PageHeaderProps) {
  const { open, setOpen } = useSidebar();
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/50 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 sm:gap-4">
        <Button variant="ghost" size="icon" className="md:hidden shrink-0" onClick={() => setOpen(!open)}>
            <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-lg sm:text-xl font-bold font-headline truncate">{title}</h1>
      </div>
      <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
        <div className="relative w-full max-w-xs sm:max-w-sm hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search bills or transactions..." className="pl-9 bg-background/70 border-border"/>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
            {children}
        </div>
        <NotificationBell />
        {!hideWalletConnect && <WalletConnect />}
         <Link href="/settings">
          <Avatar className="h-8 w-8 sm:h-9 sm:w-9 cursor-pointer hidden md:block">
              <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxwZXJzb258ZW58MHx8fHwxNzU0OTk5MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="@user" />
              <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
