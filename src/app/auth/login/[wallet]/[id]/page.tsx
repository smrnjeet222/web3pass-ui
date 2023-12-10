/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ABI, ADDRESS } from "@/contract";
import { encryptMsg } from "@/lib/utils";
import { ConnectKitButton } from "connectkit";
import { ethers } from "ethers";
import React from "react";
import { useContractWrite } from "wagmi";

function OAuth({ params }: { params: { id: string; wallet: string } }) {
  const { data, isLoading, isSuccess, writeAsync, reset } = useContractWrite({
    address: ADDRESS,
    abi: ABI,
    functionName: "auths",
  });

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="min-w-[400px] mb-64">
        <CardHeader>
          <ConnectKitButton />
        </CardHeader>
        <CardContent>
          <Button
            className="w-full mt-4"
            onClick={async () => {
              const pr = new ethers.BrowserProvider(window.ethereum);
              try {
                const data = await writeAsync({
                  args: [params.wallet, params.id],
                });

                console.log(data);

                const address: string[] = await pr.send(
                  "eth_requestAccounts",
                  [],
                );

                const encryptedKey: string = await pr.send(
                  "eth_getEncryptionPublicKey",
                  [
                    address[0],
                  ],
                );

                console.log("encryptedKey", encryptedKey);

                const encMsg = encryptMsg(
                  `Hello`,
                  encryptedKey,
                );

                console.log("encMsg", encMsg);
              } catch (error) {
              }
            }}
          >
            Login with Safu
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default OAuth;
