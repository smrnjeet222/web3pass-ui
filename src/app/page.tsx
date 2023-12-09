"use client";
import { Button } from "@/components/ui/button";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import type { RouterOutputs } from "@/trpc/shared";
import { ethers } from "ethers";
import { EyeOffIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAccount } from "wagmi";

import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { address } = useAccount();
  const { data, isLoading } = api.graphql.getPass.useQuery({
    wallet: address!,
  }, {
    enabled: !!address,
  });

  return (
    <>
      <div className="flex justify-center flex-wrap gap-4">
        {isLoading
          ? [1, 2, 3].map((i) => <Skeleton key={i} className="w-60 h-60" />)
          : data?.list.map((data, i) => <PassCard key={i} data={data} />)}
      </div>
    </>
  );
}

function PassCard({
  data,
}: {
  data: RouterOutputs["graphql"]["getPass"]["list"][number];
}) {
  const [loading, setLoading] = useState(false);
  const [decryptedString, setDecryptedString] = useState("");

  async function decrypt() {
    setLoading(true);

    const pr = new ethers.BrowserProvider(window?.ethereum);
    try {
      const address: string[] = await pr.send("eth_requestAccounts", []);

      const decrypted = await pr.send("eth_decrypt", [
        data.data,
        address[0],
      ]);

      setDecryptedString(decrypted);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="min-w-[300px]">
      <CardHeader>
        <CardTitle>{data.domain}</CardTitle>
      </CardHeader>
      <CardContent className="relative flex justify-center">
        <div className="w-full min-h-[90px] flex flex-col gap-2">
          <Label className="text-sm">Username</Label>
          <Input
            readOnly
            value={decryptedString?.split(" ")[0]}
            placeholder=""
          />
          <Label className="text-sm mt-2">Password</Label>
          <Input
            readOnly
            value={decryptedString?.split(" ")[1]}
            placeholder=""
          />
        </div>
        {decryptedString === "" && (
          <>
            <Button
              variant={"outline"}
              onClick={decrypt}
              className="absolute inset-0 w-full h-full flex flex-col place-items-center 
              justify-center bg-primary-foreground hover:bg-primary-foreground/95"
            >
              {loading
                ? <Loader2 className="w-6 h-6 animate-spin" />
                : <EyeOffIcon className="w-6 h-6 text-primary" />}
              <p className="text-sm mt-3 text-primary">
                Click to decrypt and view
              </p>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
