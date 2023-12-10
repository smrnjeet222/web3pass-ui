"use client";
import { ConnectKitButton } from "connectkit";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PassForm } from "@/app/_components/PassForm";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();
  const condition = pathname.startsWith("/auth/login");
  if (condition) {
    return null;
  }
  return (
    <nav className={cn("relative inset-x-0 z-10 h-16")}>
      <div className={cn("container flex items-center justify-between py-4")}>
        <Link href={"/"}>
          <h1 className="text-3xl font-black font-mono">SAFUPass</h1>
        </Link>
        <div className="flex gap-x-2 items-center">
          <NewEntry />
          <ConnectKitButton.Custom>
            {(
              { isConnected, isConnecting, show, ensName, truncatedAddress },
            ) => {
              if (isConnected) {
                return (
                  <Button onClick={show}>
                    {ensName ?? truncatedAddress}
                  </Button>
                );
              }
              return (
                <Button onClick={show}>
                  {isConnecting ? "Connecting ..." : "Connet Wallet"}
                </Button>
              );
            }}
          </ConnectKitButton.Custom>
        </div>
      </div>
    </nav>
  );
}

export function NewEntry() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Plus className="sm:mr-2 h-4 w-4" />
          <span className="hidden sm:inline">New Entry</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new entry</DialogTitle>
          <DialogDescription>
            Username and Password will be encrypted and stored On-Chain.
          </DialogDescription>
        </DialogHeader>
        <PassForm />
      </DialogContent>
    </Dialog>
  );
}

export default Navbar;
