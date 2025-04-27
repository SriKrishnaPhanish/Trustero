export const InputBox = ({ type, placeholder, label, onChange, value }) => {
  return (
    <div>
      <div className="text-left text-sm">{label}</div>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="border rounded pl-2 pt-2 pb-2 w-[320px] mb-4 mt-1 focus:border-2 focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
};
