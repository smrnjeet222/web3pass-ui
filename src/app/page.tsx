"use client";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Button } from "@/components/ui/button";
import { ethers } from "ethers";

import { encryptMsg } from "@/lib/utils";
import { useAccount } from "wagmi";
import { PassForm } from "./_components/PassForm";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-wrap gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Card key={i} className="w-96 h-96 flex-auto"></Card>
        ))}
      </div>
    </>
  );
}

// <Button
//   variant="default"
//   onClick={async () => {
//     const pr = new ethers.BrowserProvider(window.ethereum);
//
//     const encryptedKey = await pr.send("eth_getEncryptionPublicKey", [
//       address,
//     ]);
//
//     console.log("encryptedKey", encryptedKey);
//
//     const encMsg = encryptMsg("Hello WOrld", encryptedKey);
//
//     console.log("encMsg", encMsg);
//
//     const accounts = await pr.send("eth_decrypt", [
//       encMsg,
//       address,
//     ]);
//
//     console.log(accounts);
//   }}
// >
//   Check Raw rpc call
// </Button>
//
