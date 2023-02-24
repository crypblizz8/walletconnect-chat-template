import { ChatClient } from "@walletconnect/chat-client";
import { useEffect, useState } from "react";

export let chatClient;

// Init functions for Chat
export const createChatClient = async () => {
  chatClient = await ChatClient.init({
    projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!,
  });
};

// Initialize Chat Client
export default function initializeChatClient() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      createChatClient();
      setInitialized(true);
    }
  }, [initialized]);

  return initialized;
}

// Event listners for chat client
export const chatEventListeners = async (initialized: boolean) => {
  useEffect(() => {
    if (initialized & chatClient) {
      console.log("hi...");
      // console.log(
      //   'chatInvites on load:',
      //   chatClient.chatReceivedInvites.getAll({ inviteeAccount: eip155Address })
      // )

      console.log("chatThreads on load:", chatClient.chatThreads.getAll());
      console.log("chatMessages on load:", chatClient.chatMessages.getAll());

      chatClient.on("chat_invite", async (args) => {
        console.log("chat_invite:", args);
      });

      chatClient.on("chat_joined", async (args) => {
        console.log("chat_joined:", args);
        console.log(chatClient.chatThreads.getAll());
      });
    }
  }, [initialized]);
};

// Step 1: Register Own Address to the KeyServer
export const registerSelf = async (address: string) => {
  await chatClient.register({ account: `eip155:1:${address}` });
};

// Step 2: Register Own Address to the KeyServer
