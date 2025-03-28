import { useContext } from "react";
import { DarkModeContext } from "../Contexts/DarkModeContext";
import { Button } from "@nextui-org/react";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
// import NavBottom from "../Components/NavBottom";

const Theme = () => {
  var dmc = useContext(DarkModeContext);
  var dm = dmc.DarkMode;
  return (
    <div className="main w-full h-full flex items-center justify-center">
      <Button
        className="text-white min-w-[150px]"
        color="primary"
        radius="lg"
        onClick={() => {
          dmc.setDarkMode(!dm);
        }}
      >
        Toggle Theme
        {dm ? <IoSunny size={20} /> : <FaMoon />}
      </Button>
      {/* <NavBottom /> */}
    </div>
  );
};

export default Theme;
