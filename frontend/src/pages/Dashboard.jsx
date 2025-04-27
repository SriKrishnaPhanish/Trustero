import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { TestimonialSection } from "../components/TestimonialSection";
import { IoIosLogOut } from "react-icons/io";
import { useEffect, useState } from "react";
import { CopyBox } from "../components/CopyBox";

const DashboardText = () => {
  return (
    <div className="flex flex-cols justify-center items-center h-[100px] font-DashboardFont text-3xl">
      Dashboard
    </div>
  );
};

const DashboardContent = () => {
  return <div></div>;
};

const DashboardNavBar = ({ companyNameURL }) => {
  return (
    <div className="flex items-center justify-between w-full px-4 border h-[100px] w-full">
      <div className="w-1/3"></div>
      <div className="w-1/3 mb-4">
        <CopyBox
          testimonialURL={`${window.location.origin}/global/testimonial/${companyNameURL}`}
        />
      </div>
      <Link
        to={"/"}
        className="w-1/3 flex text-xl justify-end mr-4 mt-2 text-blue-600 hover:text-gray-500"
        onClick={() => {
          localStorage.removeItem("JWT_TOKEN");
        }}
      >
        <div>Sign out</div>
        <div className="text-2xl pt-1 pl-2">
          <IoIosLogOut />
        </div>
      </Link>
    </div>
  );
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const companyNameURL = location.state.companyNameURL || {};
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("JWT_TOKEN");
      if (!token) {
        await navigate("/", { replace: true });
      }
    };
    checkToken();
  }, [navigate]);

  return (
    <div className="flex">
      <div className="w-[250px] h-[100vh] border">
        <DashboardText />
        <DashboardContent />
      </div>
      <div className="w-full ">
        <DashboardNavBar companyNameURL={companyNameURL} />
        <TestimonialSection />
      </div>
    </div>
  );
};
