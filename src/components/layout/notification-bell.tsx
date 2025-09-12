
"use client";

import { Bell, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const notifications = [
    {
        title: "You have a pending bill",
        description: "From jane.eth for Team Dinner",
        amount: "25 USDC",
        link: "/s/xyz123",
        isNew: true,
    },
    {
        title: "Payout Successful",
        description: "Your payout to Frontend Developers is complete.",
        amount: "1,500 USDC",
        isNew: false,
    },
    {
        title: "New Member Added",
        description: "charlie.eth was added to Backend Engineers.",
        isNew: false,
    }
];

export function NotificationBell() {
    const hasNewNotifications = notifications.some(n => n.isNew);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {hasNewNotifications && (
                        <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
                <Card className="border-0">
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>You have {notifications.length} new messages.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="space-y-2">
                           {notifications.map((notification, index) => (
                               <div key={index}>
                                    <div className="p-4 hover:bg-secondary/50 transition-colors">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-semibold">{notification.title}</h4>
                                            {notification.isNew && (
                                                <Badge variant="default" className="text-xs">New</Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                                        {notification.amount && (
                                             <p className="text-sm font-medium mt-1">{notification.amount}</p>
                                        )}
                                        {notification.link && (
                                            <Button variant="link" asChild className="p-0 h-auto mt-2 text-sm">
                                                <Link href={notification.link}>
                                                    View Bill
                                                    <ArrowRight className="ml-1 h-3 w-3" />
                                                </Link>
                                            </Button>
                                        )}
                                    </div>
                                    {index < notifications.length - 1 && <Separator />}
                               </div>
                           ))}
                        </div>
                    </CardContent>
                </Card>
            </PopoverContent>
        </Popover>
    );
}
