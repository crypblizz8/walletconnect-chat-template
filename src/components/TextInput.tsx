interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const TextInput = ({ value, onChange }: TextInputProps) => {
  return (
    <div className="mt-6">
      <div className="relative flex h-10 w-full flex-row-reverse overflow-clip rounded-lg">
        <input
          className="peer w-full rounded-r-lg border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-sky-400 focus:outline-none"
          type="text"
          name="domain"
          id="domain"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="vitalik.eth or 0x1234..."
        />
        <label className="flex pt-2  rounded-l-lg border border-slate-400 bg-slate-50 px-2 text-sm text-slate-400 transition-colors duration-300 peer-focus:border-sky-400 peer-focus:bg-sky-400 peer-focus:text-white">
          Address:
        </label>
      </div>
    </div>
  );
};
