

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, User, Users, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";

const CreateBillDialog = dynamic(() => import('@/components/bill/create-bill-dialog').then(mod => mod.CreateBillDialog), { ssr: false });

export function CreateBillDropdown() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogProps, setDialogProps] = useState({});

    const openDialog = (props: any) => {
        setDialogProps(props);
        setDialogOpen(true);
    }

  return (
    <>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button>
            <Plus className="mr-2 h-4 w-4" />
            <span>Create Bill</span>
            <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={(e) => {
                e.preventDefault();
                openDialog({
                    title: "Create a New One-Time Split",
                    description: "Fill in the details below to create and split a new one-time bill.",
                    billTitleLabel: "Bill Title"
                });
            }}>
                <User className="mr-2 h-4 w-4" />
                <span>New One-Time Split</span>
            </DropdownMenuItem>
             <DropdownMenuItem onSelect={(e) => {
                e.preventDefault();
                openDialog({
                    title: "Create a New Group Split",
                    description: "Fill in the details below to create and split a new group bill.",
                    billTitleLabel: "Group Name"
                });
            }}>
                <Users className="mr-2 h-4 w-4" />
                <span>New Group Split</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
        <CreateBillDialog open={dialogOpen} onOpenChange={setDialogOpen} {...dialogProps} />
    </>
  );
}
