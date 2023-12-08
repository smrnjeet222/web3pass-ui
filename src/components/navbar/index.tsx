"use client";
import { Logo } from "@/assets/logo";
import { ConnectKitButton } from "connectkit";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

function Navbar() {
  return (
    <nav className={cn("relative inset-x-0 z-10 h-16")}>
      <div className={cn("container flex items-center justify-between p-4")}>
        <Link href={"/"}>
          <h1 className="text-3xl font-black font-mono">Web3Pass</h1>
        </Link>
        <ConnectKitButton.Custom>
          {({ isConnected, isConnecting, show, ensName, truncatedAddress }) => {
            if (isConnected) {
              return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"secondary"}>
                      {ensName ?? truncatedAddress}
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    {
                      /*
                      <DropdownMenuItem asChild>
                        <Link href="/me/layers">My Layers</Link>
                      </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/me/aviarts">My AviArts</Link>
                        </DropdownMenuItem>
                          <DropdownMenuSeparator />
                      */
                    }
                    <DropdownMenuItem onClick={show}>
                      Disconnect
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
    </nav>
  );
}

export default Navbar;
