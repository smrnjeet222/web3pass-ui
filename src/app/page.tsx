"use client";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
