import React from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import { IoIosArrowBack } from "react-icons/io";

import { useNavigate } from "react-router-dom";

const NavTopWithBackButton = (props) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // -1 will navigate to the previous page in the history stack
  };
  return (
    <div className="top_nav flex items-center justify-center w-full  h-[64px]">
      <div className="left h-full  flex items-center justify-center">
        <Button
          isIconOnly
          color="primary"
          variant="light"
          aria-label="Go back"
          className="flex items-center justify-center fixed z-10 top-3 left-3"
          onClick={handleGoBack}
        >
          <IoIosArrowBack size={25} />
        </Button>
      </div>
      <div className="right h-full w-[100%] flex items-center justify-center font-bold text-lg">
        {props.heading}
      </div>
    </div>
  );
};

export default NavTopWithBackButton;
