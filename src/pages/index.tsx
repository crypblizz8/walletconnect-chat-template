import { useCallback, useEffect } from "react";
import { useAccount } from "wagmi";
import { signMessage } from "@wagmi/core";
import { Header } from "../components/Header";
import initializeChatClient, {
  chatClient,
  chatEventListeners,
  createInvite,
} from "../utils/ChatUtils";

function Page() {
  const { address, isConnected } = useAccount();

  const initialized = initializeChatClient();

  const registerChatClient = useCallback(
    async (address: string) => {
      console.log("registeringAddress: ", address);

      try {
        await chatClient?.register({
          account: `eip155:1:${address}`,
          onSign: async (message: any) => {
            console.log("[Chat] signing message.....", message);
            return signMessage({ message });
          },
        });
        console.log(
          "[Chat] registered address %s on keyserver",
          `eip155:1:${address}`
        );
      } catch (error) {
        console.log("error: ", error);
      }
    },
    [signMessage]
  );

  chatEventListeners(initialized);

  useEffect(() => {
    console.log("Chat Client Initialized: ", initialized);
  }, [address, initialized]);

  return (
    <div className="flex h-screen justify-between items-center flex-col">
      <Header />

      <div className="h-4/5">
        <div className="flex justify-center items-center flex-col mt-8">
          <h1 className="text-2xl underline mb-4">Step 1: Register Self</h1>

          <button
            disabled={!address && !initialized}
            onClick={() => registerChatClient(address!)}
            className="bg-blue-500  text-white font-bold py-2 px-4 rounded inline-flex items-center ml-2"
          >
            Register Self
          </button>
        </div>

        <div className="flex justify-center items-center flex-col mt-8">
          <h1 className="text-2xl  underline mb-4">Step 2: Invite fren</h1>
          <button
            disabled={!address}
            // Hard Coded from a react-chat-app.
            // ToDo: Add UseState and hook it to a text input
            onClick={() =>
              createInvite(
                address!,
                "0x9dbE00C80ef9C6C00239162a6dA4B2E610f670Ea"
              )
            }
            className="bg-blue-500 mt-4  text-white font-bold py-2 px-4 rounded inline-flex items-center ml-2"
          >
            Invite betwen Peers
          </button>
        </div>

        <div className="flex justify-center items-center flex-col mt-8">
          <h1 className="text-2xl  underline mb-4">Step 3: Talk to fren</h1>
          <p>Add some sort of Chat Component.</p>
        </div>
      </div>
    </div>
  );
}

export default Page;
