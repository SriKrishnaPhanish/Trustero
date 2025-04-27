export const Button = ({ label, onPress }) => {
  return (
    <div>
      <button
        type="button"
        onClick={onPress}
        className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none mt-3 mb-1"
      >
        {label}
      </button>
    </div>
  );
};
