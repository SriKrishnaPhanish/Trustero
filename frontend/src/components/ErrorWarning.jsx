export const ErrorWarning = ({ label, isHidden }) => {
  return (
    <div className={isHidden ? "hidden" : ""}>
      <div className="text-red-500 text-md mb-2 font-semibold">{label}</div>
    </div>
  );
};
