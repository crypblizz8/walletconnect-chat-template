export const TextInput = () => {
  return (
    <div className="mt-6">
      <div className="relative flex h-10 w-full flex-row-reverse overflow-clip rounded-lg">
        <button className="bg-blue-500 hover:bg-blue-100 text-white font-bold py-2 px-4 rounded inline-flex items-center ml-2">
          Invite
        </button>
        <input
          className="peer w-full rounded-r-lg border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-sky-400 focus:outline-none"
          type="text"
          name="domain"
          id="domain"
          placeholder="vitalik.eth or 0x1234..."
        />
        <label className="flex  rounded-l-lg border border-slate-400 bg-slate-50 px-2 text-sm text-slate-400 transition-colors duration-300 peer-focus:border-sky-400 peer-focus:bg-sky-400 peer-focus:text-white">
          Address or ENS:
        </label>
      </div>
    </div>
  );
};
