import { useState } from "react";
import copyImg from "../assets/copy.png";
import copiedImg from "../assets/copied.png";
import { copiedBox_DOM } from "../utils";

export const CopyBox = ({ testimonialURL }) => {
  const [inputBoxVal, setinputBoxVal] = useState(testimonialURL);

  const copyToClipBoard = async () => {
    const inputBox = document.getElementById("inputBox");
    document.getElementById("copyImg").src = copiedImg;
    setinputBoxVal(inputBox.value);
    navigator.clipboard.writeText(inputBox.value);
    copiedBox_DOM();
  };

  return (
    <div id="copyBoxId" className="bg-white pt-5">
      <div className="mx-auto w-full max-w-[400px]">
        <div className="relative">
          <input
            type="text"
            value={inputBoxVal}
            id="inputBox"
            className="h-12 w-full rounded-lg border border-stroke bg-gray-1 py-3 pl-5 pr-14 text-dark outline-none duration-200 selection:bg-transparent focus:border-primary"
          />
          <button
            onClick={copyToClipBoard}
            className="absolute right-0 top-0 flex h-12 w-14 items-center justify-center text-body-color duration-200 hover:text-primary"
          >
            <div className="w-7 h-7">
              <img id="copyImg" src={copyImg} alt="" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
