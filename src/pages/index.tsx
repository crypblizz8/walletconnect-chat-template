import { Web3Button } from "@web3modal/react";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { Header } from "../components/Header";
import { TextInput } from "../components/TextInput";
import initializeChatClient, {
  chatEventListeners,
  createChatClient,
  registerSelf,
} from "../utils/ChatUtils";

function Page() {
  const { address, isConnected } = useAccount();

  const initialized = initializeChatClient();
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
            disabled={!address}
            onClick={() => registerSelf(address)}
            className="bg-blue-500  text-white font-bold py-2 px-4 rounded inline-flex items-center ml-2"
          >
            Register Self
          </button>
        </div>

        <div className="flex justify-center items-center flex-col mt-8">
          <h1 className="text-2xl  underline mb-4">Step 2: Invite fren</h1>
          <p>React Chat Dapp 1: 0xE43ef1155D98Cd1D428091283CdCfb9Fa0f605C0</p>
          <p>React Chat Dapp 2: 0x9dbE00C80ef9C6C00239162a6dA4B2E610f670Ea</p>
          <TextInput />
        </div>

        <div className="flex justify-center items-center flex-col mt-8">
          <h1 className="text-2xl  underline mb-4">Step 3: Talk to fren</h1>
          <p>Add some sort of React chat package</p>
        </div>
      </div>
    </div>
  );
}

export default Page;
