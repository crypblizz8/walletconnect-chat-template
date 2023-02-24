import { modalConnectors, walletConnectProvider } from "@web3modal/ethereum";
import { configureChains, createClient } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";

export const walletConnectProjectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID!;
// console.log("[ENV] NEXT_WC_PROJECT_ID", walletConnectProjectId);

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [walletConnectProvider({ projectId: walletConnectProjectId })]
);

export const client = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "My wagmi + Web3Modal App", chains }),
  provider,
  webSocketProvider,
});

export { chains };
