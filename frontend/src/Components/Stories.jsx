/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Story from "./Story";

const Stories = () => {
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Ayush",
      initials: "A",
      dpUrl: "https://i.pravatar.cc/150?u=a04258114e29026702f",
      storyImgUrl: "https://via.placeholder.com/120x200",
    },
    {
      id: "2",
      name: "Bikesh",
      initials: "B",
      dpUrl: "https://i.pravatar.cc/150?u=a04258114e29026702g",
      storyImgUrl: "https://via.placeholder.com/120x200",
    },
    {
      id: "3",
      name: "Yuvraj",
      initials: "Y",
      dpUrl: "https://i.pravatar.cc/150?u=a04258114e29026702h",
      storyImgUrl: "https://via.placeholder.com/120x200",
    },
    {
      id: "4",
      name: "Krish",
      initials: "K",
      dpUrl: "https://i.pravatar.cc/150?u=a04258114e29026702i",
      storyImgUrl: "https://via.placeholder.com/120x200",
    },
    {
      id: "5",
      name: "Shakil",
      initials: "S",
      dpUrl: "https://i.pravatar.cc/150?u=a04258114e29026702j",
      storyImgUrl: "https://via.placeholder.com/120x200",
    },
    {
      id: "6",
      name: "Atharav",
      initials: "A",
      dpUrl: "https://i.pravatar.cc/150?u=a04258114e29026702k",
      storyImgUrl: "https://via.placeholder.com/120x200",
    },
    {
      id: "7",
      name: "Jaivardhan",
      initials: "J",
      dpUrl: "https://i.pravatar.cc/150?u=a04258114e29026702l",
      storyImgUrl: "https://via.placeholder.com/120x200",
    },
    {
      id: "8",
      name: "Vinay",
      initials: "V",
      dpUrl: "https://i.pravatar.cc/150?u=a04258114e29026702m",
      storyImgUrl: "https://via.placeholder.com/120x200",
    },
  ]);

  return (
    <div className=" hide-scrollbar w-full h-[200px]  overflow-x-auto overflow-y-hidden  flex-col gap-2  px-2 py-0 whitespace-nowrap">
      {users.map((user) => {
        return (
          <Story
            name={user.name}
            id={user.id}
            key={user.id}
            initials={user.initials}
            dpUrl={user.dpUrl}
            storyImgUrl={user.storyImgUrl}
          />
        );
      })}

      {/* <Story />
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
      <Story /> */}
    </div>
  );
};

export default Stories;
