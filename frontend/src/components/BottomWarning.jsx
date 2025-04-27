import { Link } from "react-router-dom";

export const BottomWarning = ({ label, buttonText, to }) => {
  return (
    <div>
      {label}
      <Link to={to} className="text-blue-600 underline hover:text-black mt-1">
        {buttonText}
      </Link>
    </div>
  );
};
