import * as GoIcons from "react-icons/go";
import * as RiIcons from "react-icons/ri";
import * as HiIcons from "react-icons/hi";

export const SideBarData = [
  {
    title: "Home",
    path: "/",
    icon: <GoIcons.GoHome />,
  },
  {
    title: "Sign Up",
    path: "/signup",
    icon: <HiIcons.HiOutlineUserAdd />,
  },
  {
    title: "Sign In",
    path: "/signin",
    icon: <GoIcons.GoSignIn />,
  },
  {
    title: "Author",
    path: "/author",
    icon: <RiIcons.RiAccountCircleLine />,
  },
];
