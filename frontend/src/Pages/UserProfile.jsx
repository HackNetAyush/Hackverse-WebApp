import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import { Button } from "@nextui-org/button";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";
import { Avatar } from "@nextui-org/react";
import { Divider } from "@nextui-org/divider";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

const UserProfile = () => {
  const { user } = useContext(UserContext);

  const params = useParams();
  const username = params.username;

  console.log(user);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // -1 will navigate to the previous page in the history stack
  };

  return (
    <div className="w-full h-full flex items-center flex-col">
      <div className="top_nav_fake h-[64px] w-full"></div>
      <div className="top_nav flex items-center justify-center w-full  h-[64px] z-10 fixed top-0 {bg-[#00000033]}">
        <div className="left h-full  flex items-center justify-center">
          <Button
            isIconOnly
            color="black"
            variant="light"
            aria-label="Go back"
            className="flex items-center justify-center fixed z-10 top-3 left-3"
            onClick={handleGoBack}
          >
            <IoIosArrowBack size={25} />
          </Button>
        </div>
        <div className="right h-full w-[100%] flex items-center justify-center font-bold text-lg">
          {username}
        </div>

        <div className="left h-full  flex items-center justify-center">
          <Button
            isIconOnly
            color="black"
            variant="light"
            aria-label="Go back"
            className="flex items-center justify-center fixed z-10 top-3 right-3"
            onClick={handleGoBack}
          >
            <FiMoreHorizontal size={25} />
          </Button>
        </div>
      </div>

      {/* <div className="photo_banner w-full {aspect-[16/9]} h-[225px] {h-[289px]} bg-slate-800 brightness-75">
        <img
          src="https://wallpapercave.com/wp/wp13066639.png"
          className="w-full h-full object-cover"
        />
      </div> */}

      {/* <div className="userInfo_container w-full flex items-start justify-center h-[50px] ">
        <div className="left_conatiner w-full items-center flex justify-center h-full">
          <div className="followers_container">13M</div>
        </div>
        <div className="dp_container rounded-full bg-blue-500 flex translate-y-[-50px] shadow-2xl">
          <Avatar
            isBordered
            name="John"
            src="https://i.pravatar.cc/150?u=a04258114e29026708cdefghij1234"
            className="w-[100px] h-[100px] text-large "
          />
        </div>
        <div className="right_container w-full items-center flex justify-center h-full">
          <div className="followers_container">1024</div>
        </div>
      </div> */}

      <div className="userInfo_container w-full flex flex-col items-center justify-center mt-4">
        <div className="dp_container rounded-full bg-blue-500 flex shadow-2xl">
          <Avatar
            isBordered
            name={username.toUpperCase()}
            // src="https://i.pravatar.cc/150?u=a04258114e29026708cdefghij1234"
            className="w-[100px] h-[100px] text-large "
          />
        </div>

        <div className="user_details w-full h-full flex flex-col items-center justify-center mt-5 ">
          <span className="u_name font-semibold text-lg uppercase">
            {username}
          </span>
          <span className="u_bio text-center text-sm text-foreground-400">
            Content Creator
          </span>
        </div>

        <div className="f_details w-[90%] flex items-center justify-around mt-8">
          <div className="followers w-full box-border flex flex-col items-center justify-center">
            <span className="font-semibold">13M</span>
            <span className="font-tiny">Followers</span>
          </div>
          <Divider orientation="vertical" />
          <div className="following w-full box-border flex flex-col items-center justify-center">
            <span className="font-semibold">1024</span>
            <span className="font-tiny">Following</span>
          </div>
          <Divider orientation="vertical" />
          <div className="posts w-full box-border flex flex-col items-center justify-center">
            <span className="font-semibold">120</span>
            <span className="font-tiny">Posts</span>
          </div>
          <Divider orientation="vertical" />

          <div className="likes w-full box-border flex flex-col items-center justify-center">
            <span className="font-semibold">120M</span>
            <span className="font-tiny">Likes</span>
          </div>
        </div>

        <div className="btns w-full mt-5 flex items-center justify-center p-2">
          <Button className="w-full" color="primary">
            Follow
          </Button>
        </div>
      </div>

      <div className="moreDetails p-2 w-full">
        <Tabs aria-label="Options">
          <Tab key="photos" title="Photos">
            <div className="photos_container w-full flex gap-2 flex-2">
              <Card className="w-fit ">
                <CardBody className="flex items-center justify-center ">
                  Hellloo
                </CardBody>
              </Card>

              <Card className="w-fit ">
                <CardBody className="flex items-center justify-center">
                  Hellloo
                </CardBody>
              </Card>

              <Card className="w-fit ">
                <CardBody className="flex items-center justify-center">
                  Hellloo
                </CardBody>
              </Card>

              <Card className="w-fit ">
                <CardBody className="flex items-center justify-center">
                  Hellloo
                </CardBody>
              </Card>
            </div>
            {/* <Card>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card> */}
          </Tab>
          <Tab key="music" title="Music">
            <Card>
              <CardBody>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </CardBody>
            </Card>
          </Tab>
          <Tab key="videos" title="Videos">
            <Card>
              <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>

      {/* <div>{username}</div> */}
    </div>
  );
};

export default UserProfile;
