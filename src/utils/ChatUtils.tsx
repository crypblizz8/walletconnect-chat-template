import { signMessage } from "@wagmi/core";
import { ChatClient } from "@walletconnect/chat-client";
import { useCallback, useEffect, useState } from "react";

export let chatClient;

// Init functions for Chat
export const createChatClient = async () => {
  console.log(
    "[CONFIG] Initializing Chat Client...",
    process.env.NEXT_PUBLIC_WC_PROJECT_ID
  );
  chatClient = await ChatClient.init({
    logger: "debug",
    keyseverUrl: "https://keys.walletconnect.com",
    projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!,
    relayUrl: "wss://relay.walletconnect.com",
  });
};

// Initialize Chat Client
export default function initializeChatClient() {
  //@ts-ignore
  const [initialized, setInitialized] = useState(false);

  //@ts-ignore
  useEffect(() => {
    if (!initialized) {
      createChatClient();
      setInitialized(true);
    }
  }, [initialized]);

  return initialized;
}

export const checkInvites = async (address: string) => {};

// Event listners for chat client
export const chatEventListeners = async (initialized: boolean) => {
  // ToDo: update and pass through the inviteeAddress
  // console.log(
  //   'chatInvites on load:',
  //   chatClient.chatReceivedInvites.getAll({ inviteeAccount: eip155Address })
  // )

  console.log("chatThreads on load:", chatClient?.chatThreads.getAll());
  console.log("chatMessages on load:", chatClient?.chatMessages.getAll());

  chatClient?.on("chat_invite", async (args) => {
    console.log("chat_invite...:", args);
  });

  chatClient?.on("chat_joined", async (args) => {
    console.log("chat_joined:", args);
    console.log(chatClient.chatThreads.getAll());
  });
};

// Step 1: Register Own Address to the KeyServer
export const registerSelf = async (address: string) => {
  console.log("registeringAddress: ", address);
  await chatClient?.register({
    account: `eip155:1:${address}`,
    onSign: async (message) => {
      console.log("[Chat] signing message...", message);
      signMessage({ message });
    },
  });
};

export const createInvite = async (inviter: string, targetAddress: string) => {
  const inviteePublicKey = await chatClient?.resolve({
    account: `eip155:1:${targetAddress}`,
  });
  await chatClient?.invite({
    message: "Hey, lets chat!",
    inviteeAccount: `eip155:1:${targetAddress}`,
    inviterAccount: `eip155:1:${inviter}`,
    inviteePublicKey,
  });
};
