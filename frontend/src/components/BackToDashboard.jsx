import * as goIcon from "react-icons/go";
import { Link } from "react-router-dom";

export const BackToDashBoard = () => {
  return (
    <div>
      <Link to={"/"}>
        <div className="flex text-blue-600 ml-4 mt-4 text-xl hover:text-gray-500">
          <div className="pt-1 pr-1 text-2xl">
            <goIcon.GoArrowLeft />
          </div>
          <div className="underline">Back to Dashboard</div>
        </div>
      </Link>
    </div>
  );
};
