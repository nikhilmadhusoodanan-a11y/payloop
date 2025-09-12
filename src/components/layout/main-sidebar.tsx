
"use client";

import { usePathname } from 'next/navigation'
import Link from 'next/link';
import {
  LayoutDashboard,
  Receipt,
  Settings,
  Users,
  LineChart,
  Gem,
} from "lucide-react";
import { SidebarBody, SidebarLink, LinkProps } from "@/components/ui/sidebar";
import { MyProductLogo } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { useSidebar } from '@/components/ui/sidebar';
import { ScrollArea } from "@/components/ui/scroll-area";

export function MainSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();

  const isActive = (path: string) => {
    if (path === "/dashboard") return pathname === path;
    return pathname.startsWith(path) && path !== '/dashboard';
  };

  const links: LinkProps[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      isActive: isActive("/dashboard"),
    },
    {
      label: "Royalty Pools",
      href: "/royalty-pools",
      icon: <Gem className="h-5 w-5" />,
      isActive: isActive("/royalty-pools"),
    },
    {
      label: "Team Payouts",
      href: "/team-payouts",
      icon: <Users className="h-5 w-5" />,
      isActive: isActive("/team-payouts"),
    },
    {
      label: "Bills",
      href: "/bills",
      icon: <Receipt className="h-5 w-5" />,
      isActive: isActive("/bills"),
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: <LineChart className="h-5 w-5" />,
      isActive: isActive("/analytics"),
    },
  ];

  const SidebarContent = () => (
     <>
        <div className="flex-grow">
            <Link href="/" className="flex items-center gap-2 px-1 mb-8">
             <MyProductLogo className="w-8 h-8 text-primary" />
             <motion.span
                animate={{
                    display: open ? "inline-block" : "none",
                    opacity: open ? 1 : 0,
                }}
                className="text-xl font-semibold font-headline text-foreground whitespace-pre"
              >
               PayLoop
             </motion.span>
          </Link>
          <ScrollArea className="h-[calc(100%-120px)]">
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <SidebarLink key={link.href} link={link} />
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="flex flex-col gap-2">
            <SidebarLink link={{
                label: "Settings",
                href: "/settings",
                icon: <Settings className="h-5 w-5" />,
                isActive: isActive("/settings"),
            }} />
             <div className="flex items-center gap-3 p-2 rounded-md transition-colors w-full">
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxwZXJzb258ZW58MHx8fHwxNzU0OTk5MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="@user" data-ai-hint="person avatar" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <motion.div
                    animate={{
                        display: open ? "flex" : "none",
                        opacity: open ? 1 : 0,
                    }}
                    className="flex-col whitespace-pre"
                >
                    <span className="text-sm font-medium text-foreground">User</span>
                    <span className="text-xs text-muted-foreground">user@email.com</span>
                </motion.div>
            </div>
        </div>
     </>
  )

  return (
      <SidebarBody className="justify-between">
        <SidebarContent />
      </SidebarBody>
  );
}
