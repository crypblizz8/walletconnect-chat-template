import { Web3Button } from "@web3modal/react";

export const Header = () => {
  return (
    <div className="w-screen flex justify-between px-6 pt-4">
      <h1 className="text-3xl font-bold underline mb-4">Chat SDK Template</h1>
      <Web3Button />
    </div>
  );
};
