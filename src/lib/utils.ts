import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { encrypt } from "eth-sig-util";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encryptMsg(msg: string, encryptionPublicKey: string) {
  console.log("Helllo");

  const buf = Buffer.from(
    JSON.stringify(
      encrypt(
        encryptionPublicKey,
        { data: msg },
        "x25519-xsalsa20-poly1305",
      ),
    ),
    "utf8",
  );

  return buf.toString("hex");
}
