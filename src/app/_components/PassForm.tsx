/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Check, Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { encryptMsg } from "@/lib/utils";
import { useContractWrite } from "wagmi";
import { ABI, ADDRESS } from "@/contract";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const formSchema = z.object({
  domain: z.string().url(),
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export function PassForm() {
  const { toast } = useToast();

  const { data, isLoading, isSuccess, writeAsync, reset } = useContractWrite({
    address: ADDRESS,
    abi: ABI,
    functionName: "addPassword",
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      domain: "",
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const pr = new ethers.BrowserProvider(window.ethereum);

    try {
      const address: string[] = await pr.send("eth_requestAccounts", []);

      const encryptedKey: string = await pr.send("eth_getEncryptionPublicKey", [
        address[0],
      ]);

      console.log("encryptedKey", encryptedKey);

      const encMsg = encryptMsg(
        `${values.username} ${values.password}`,
        encryptedKey,
      );

      console.log("encMsg", encMsg);

      await writeAsync({
        args: [values.domain, encMsg],
      });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Transaction Submitted",
        action: (
          <ToastAction
            altText="open"
            onClick={() => {
              if (data?.hash) {
                window.open(
                  `https://mumbai.polygonscan.com/tx/${data.hash}`,
                  "_blank",
                );
              }
            }}
          >
            Open in Explorer
          </ToastAction>
        ),
      });
    }
  }, [data?.hash, isSuccess]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domain</FormLabel>
              <FormControl>
                <Input placeholder="example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johnxxx" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="********"
                    type={showPass ? "text" : "password"}
                    {...field}
                  />
                  <Button
                    variant="link"
                    type="button"
                    onClick={() => setShowPass((p) => !p)}
                    className="absolute z-10 right-1 top-1/2 -translate-y-1/2"
                  >
                    {showPass
                      ? <EyeOff className="w-4 h-4" />
                      : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          {loading || isLoading
            ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            )
            : isSuccess
            ? (
              <Button
                type="button"
                onClick={() => {
                  form.reset();
                  reset();
                }}
              >
                <Check className="mr-2 h-4 w-4" />
                Success
              </Button>
            )
            : <Button type="submit">Save</Button>}
        </DialogFooter>
      </form>
    </Form>
  );
}
