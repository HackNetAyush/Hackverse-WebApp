// import {
//   Navbar,
//   NavbarBrand,
//   NavbarContent,
//   NavbarItem,
//   Link,
//   Button,
// } from "@nextui-org/react";
// import { AcmeLogo } from "./AcmeLogo.jsx";
// import { Toaster } from "react-hot-toast";
// import toast from "react-hot-toast";
// import MessagePopup from "./MessagePopup";
// import { BiMessageAltAdd } from "react-icons/bi";
import { Tabs, Tab } from "@nextui-org/react";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { IoHome, IoHomeOutline } from "react-icons/io5";
// import { FaPaintBrush } from "react-icons/fa";
import { GoHome } from "react-icons/go";
// import { IoIosAddCircleOutline } from "react-icons/io";
import { BsFeather } from "react-icons/bs";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { AiOutlineThunderbolt } from "react-icons/ai";
// import { IoAtOutline } from "react-icons/io5";
import { Avatar } from "@nextui-org/react";
import { UserContext } from "../Contexts/UserContext";

// const tabListDiv = document.querySelector('div[data-slot="tabList"]');
// tabListDiv.style.display = "flex";

export default function NavBottom() {
  const [selectedTab, setSelectedTab] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  // const [user, setUser] = useState(null);

  // setUser(useContext(UserContext));

  const { user } = useContext(UserContext);

  function NavToHome() {
    navigate("/");
  }

  function NavToTheme() {
    navigate("/theme");
  }

  function NavToAddPost() {
    navigate("/addPost");
  }

  function NavToUserProfile() {
    navigate(`/u/${user.username}`);
  }

  function handleSelectionChange(e) {
    if (e === "home") {
      NavToHome();
    } else if (e === "theme") {
      NavToTheme();
    } else if (e === "addPost") {
      NavToAddPost();
    } else if (e === "userProfile") {
      NavToUserProfile();
    }
  }

  useEffect(() => {
    // Update selectedTab state based on the current path
    if (location.pathname === "/") {
      setSelectedTab("home");
    } else if (location.pathname === "/theme") {
      setSelectedTab("theme");
    } else if (location.pathname === "/contact") {
      setSelectedTab("contact");
    } else if (location.pathname === "/addPost") {
      setSelectedTab("addPost");
    } else if (location.pathname === `/u/${user.username}`) {
      setSelectedTab("userProfile");
    }
  }, [location]);

  useEffect(() => {
    // Access the div with data-slot="tabList"
    const tabListDivs = document.querySelectorAll('div[data-slot="tabList"]');
    tabListDivs.forEach((tabListDiv) => {
      // Change styles for each div
      tabListDiv.style.display = "flex";
      tabListDiv.style.width = "100%";
      tabListDiv.style.height = "100%";
      tabListDiv.style.alignItems = "center";
      tabListDiv.style.justifyContent = "space-around"; // or 'space-between'
      // You can add more styles as needed
    });
  }, []);

  return (
    <div className="flex h-[64px] w-full">
      <Tabs
        aria-label="Dynamic tabs"
        // color="primary"
        variant="underlined"
        className="w-full flex items-center justify-around  h- border-t-1 border-default-100"
        selectedKey={selectedTab}
        onSelectionChange={(e) => {
          handleSelectionChange(e);
        }}
      >
        <Tab
          className=" w-fit mx-2 h-12  rounded min-h-fit"
          key="home"
          title={
            <div className="flex items-center space-x-2">
              <GoHome size={30} />
            </div>
          }
        ></Tab>

        <Tab
          className=" w-fit h-12 mx-2 rounded min-h-fit"
          title={
            <div className="flex items-center space-x-2">
              <AiOutlineThunderbolt size={30} />
            </div>
          }
        ></Tab>

        <Tab
          key="addPost"
          className="w-fit h-12 mx-2  rounded min-h-fit"
          title={
            <div className="flex items-center space-x-2">
              <BsFeather size={27} />
            </div>
          }
        ></Tab>

        <Tab
          key="theme"
          className=" w-fit h-12 mx-2 rounded min-h-fit"
          title={
            <div className="flex items-center space-x-2">
              <HiOutlinePaintBrush size={27} />
            </div>
          }
        ></Tab>

        <Tab
          key="userProfile"
          className=" w-fit h-12 mx-2 rounded min-h-fit"
          title={
            <div className="flex items-center space-x-2">
              <Avatar
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </div>
          }
        ></Tab>
      </Tabs>
    </div>
  );
}
