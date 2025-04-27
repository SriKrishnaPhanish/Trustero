import { useState } from "react";
import * as faIcons from "react-icons/fa";
import * as mdIcons from "react-icons/md";
import { Link } from "react-router-dom";
import { SideBarData } from "./SideBarData";

const SideBarMenu = ({ item }) => {
  return (
    <Link
      to={item.path}
      className="hover:bg-gray-100 w-full h-[45px] pl-3 text-xl hover:rounded-[5px] flex items-center"
    >
      <div className="flex">
        <div className="pt-1 pr-1">{item.icon}</div>
        <div>{item.title}</div>
      </div>
    </Link>
  );
};
export const SideBar = () => {
  const [sideBar, setsideBar] = useState(false);
  const showSideBar = () => {
    setsideBar(!sideBar);
    console.log(sideBar);
  };
  return (
    <div>
      <div className="h-[80px] flex justify-start items-center">
        <Link
          to="#"
          className="ml-16 p-2 text-[25px] rounded-[5px] bg-[#f2f0ef]"
          onClick={showSideBar}
        >
          <faIcons.FaBars />
        </Link>
      </div>
      <div
        className={
          sideBar ? "bg-gray-50 w-[250px] ml-16 rounded-[5px] p-2" : "hidden"
        }
      >
        <Link to="#" className="w-full flex justify-end text-[30px]">
          <mdIcons.MdOutlineClose onClick={showSideBar} />
        </Link>

        {SideBarData.map((item, index) => {
          return <SideBarMenu item={item} />;
        })}
      </div>
    </div>
  );
};
