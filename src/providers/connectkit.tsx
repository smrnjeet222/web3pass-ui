"use client";

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { publicProvider } from "wagmi/providers/public";
import { polygonMumbai } from "@wagmi/core/chains";
import { env } from "@/env.mjs";
import { useTheme } from "next-themes";

const { publicClient, webSocketPublicClient, chains } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: "", // or infuraId
    walletConnectProjectId: env.NEXT_PUBLIC_WALLET_CONNECT,
    // Required
    appName: "AviArte",

    chains,
    publicClient,
    webSocketPublicClient,
  })
);

// https://docs.family.co/connectkit/customization

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider
        theme={theme === "dark" ? "midnight" : "soft"}
        options={{
          hideNoWalletCTA: true,
          hideQuestionMarkCTA: true,
          hideRecentBadge: true,
          hideTooltips: false,
          enforceSupportedChains: false,
          walletConnectName: "WalletConnect",
        }}
      >
        {children}
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
