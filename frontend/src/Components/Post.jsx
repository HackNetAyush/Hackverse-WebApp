/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import { User } from "@nextui-org/react";
import { FiHeart } from "react-icons/fi";
import { Button } from "@nextui-org/react";
import { AiOutlineComment } from "react-icons/ai";
import { RiSendPlaneLine } from "react-icons/ri";
import { UserContext } from "../Contexts/UserContext";
import { DarkModeContext } from "../Contexts/DarkModeContext";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const Post = (props) => {
  const userInfo = useContext(UserContext);
  // console.log("Uuser: ", user);
  const dmc = useContext(DarkModeContext);
  const darkMode = dmc.DarkMode;
  const [liked, setLiked] = useState(props.isLiked);
  const [imageSize, setImageSize] = useState("object-cover");
  const [expanded, setExpanded] = useState(0);
  var imgUrl = props.imgUrl;
  var postTimestamp = props.createdAt;
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const queryClient = useQueryClient();

  const truncatedStyle = {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    // maxHeight: "4rem", // Adjust based on your font size and line height
  };

  const handleImageSize = () => {
    if (imageSize === "object-cover") {
      setImageSize("object-contain");
    } else if (imageSize === "object-contain") {
      setImageSize("object-cover");
    }
  };

  function calculatePostAge(postTimestamp) {
    const postDate = new Date(postTimestamp);
    const now = new Date();

    const diffInSeconds = Math.floor((now - postDate) / 1000);

    let interval = Math.floor(diffInSeconds / 31536000);
    if (interval >= 1) {
      return `${interval} year${interval > 1 ? "s" : ""} ago`;
    }

    interval = Math.floor(diffInSeconds / 2592000);
    if (interval >= 1) {
      return `${interval} month${interval > 1 ? "s" : ""} ago`;
    }

    interval = Math.floor(diffInSeconds / 86400);
    if (interval >= 1) {
      return `${interval} day${interval > 1 ? "s" : ""} ago`;
    }

    interval = Math.floor(diffInSeconds / 3600);
    if (interval >= 1) {
      return `${interval} hour${interval > 1 ? "s" : ""} ago`;
    }

    interval = Math.floor(diffInSeconds / 60);
    if (interval >= 1) {
      return `${interval} minute${interval > 1 ? "s" : ""} ago`;
    }

    return `${diffInSeconds} second${diffInSeconds !== 1 ? "s" : ""} ago`;
  }

  const age = calculatePostAge(postTimestamp);

  // async function handleLike() {
  //   if (liked) {
  //     // Unlike the post
  //     try {
  //       const response = await axios.post(
  //         `${serverUrl}/api/posts/unlikePost`,
  //         { post_id: props.post_uid },
  //         { withCredentials: true }
  //       );

  //       if (response.status === 200) {
  //         setLiked(false);
  //         console.log("Post unliked!");
  //       }
  //     } catch (error) {
  //       console.error("Error unliking post", error);
  //     }
  //   } else {
  //     // Like the post
  //     try {
  //       const response = await axios.post(
  //         `${serverUrl}/api/posts/likePost`,
  //         { post_id: props.post_uid },
  //         { withCredentials: true }
  //       );

  //       if (response.status === 200) {
  //         setLiked(true);
  //         console.log("Post liked!");
  //       }
  //     } catch (error) {
  //       console.error("Error liking post", error);
  //     }
  //   }
  // }

  async function handleLike() {
    if (liked) {
      queryClient.setQueryData(["posts"], (oldData) => {
        // Ensure that 'pages' is an array before mapping
        return {
          ...oldData,
          pages: oldData.pages.map((page) =>
            page.map((post) =>
              post._id === props.post_uid
                ? {
                    ...post,
                    isLikedByYou: false,
                    likesCount: post.likesCount - 1, // Decrease likes count
                  }
                : post
            )
          ),
        };
      });

      try {
        const response = await axios.post(
          `${serverUrl}/api/posts/unlikePost`,
          { post_id: props.post_uid },
          { withCredentials: true }
        );

        if (response.status === 200) {
          setLiked(false);
          console.log("Post unliked!");
        }
      } catch (error) {
        queryClient.setQueryData(["posts"], (oldData) => {
          return {
            ...oldData,
            pages: oldData.pages.map((page) =>
              page.map((post) =>
                post._id === props.post_uid
                  ? {
                      ...post,
                      isLikedByYou: true,
                      likesCount: post.likesCount + 1, // Revert likes count
                    }
                  : post
              )
            ),
          };
        });
        console.error("Error unliking post", error);
      }
    } else {
      // Like the post
      try {
        queryClient.setQueryData(["posts"], (oldData) => {
          return {
            ...oldData,
            pages: oldData.pages.map((page) =>
              page.map((post) =>
                post._id === props.post_uid
                  ? {
                      ...post,
                      isLikedByYou: true,
                      likesCount: post.likesCount + 1, // Increase likes count
                    }
                  : post
              )
            ),
          };
        });

        const response = await axios.post(
          `${serverUrl}/api/posts/likePost`,
          { post_id: props.post_uid },
          { withCredentials: true }
        );

        if (response.status === 200) {
          setLiked(true);
          console.log("Post liked!");
        }
      } catch (error) {
        queryClient.setQueryData(["posts"], (oldData) => {
          return {
            ...oldData,
            pages: oldData.pages.map((page) =>
              page.map((post) =>
                post._id === props.post_uid
                  ? {
                      ...post,
                      isLikedByYou: false,
                      likesCount: post.likesCount - 1, // Revert likes count
                    }
                  : post
              )
            ),
          };
        });
        console.error("Error liking post", error);
      }
    }
  }

  // useEffect(() => {
  //   console.log("Liked: ", liked);
  // }, [liked]);

  return (
    <div
      data-postid={props.post_uid}
      className="w-full flex items-center justify-center  "
      // style={
      //   props.id === 0
      //     ? { scrollSnapAlign: "unset" }
      //     : { scrollSnapAlign: "center" }
      // }
    >
      <div className="#sm:min-w-[370px] sm:min-w-[500px] sm:max-w-[500px] min-w-[96%] max-w-[96%] {min-h-[700px]} {sm:aspect-[7/11]} sm:mt-3">
        <Card className=" mt-3 h-full box-border">
          <CardHeader className="py-3 px-4 flex-row items-center  box-border">
            <div className="avatar_div flex items-center  w-1/2">
              {/* <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="md"
              /> */}

              <User
                name={props.uploadedBy}
                description={`@${props.username}`}
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                }}
              />
            </div>
            <div className="options_div w-1/2 h-full  flex items-center justify-end">
              {userInfo.user.uid != props.authorUID ? (
                <Button
                  className={"flex items-center justify-center"}
                  color="primary"
                  radius="full"
                  size="md"
                  variant={"solid"}
                  // onPress={() => setIsFollowed(!isFollowed)}
                >
                  {/* {isFollowed ? "Unfollow" : "Follow"} */} Follow
                </Button>
              ) : (
                ""
              )}
            </div>
          </CardHeader>

          <CardBody className="overflow-visible py-2 w-full flex items-center {max-h-[554px]} ">
            {imgUrl ? (
              <div className="image_container object-cover rounded-xl !max-w-full !w-full aspect-square flex items-center justify-center">
                <Image
                  alt="Card background"
                  className={`${imageSize} rounded-xl !max-w-full !w-full aspect-square`}
                  src={props.imgUrl}
                  // width={270}
                  loading="lazy"
                  disableSkeleton={false}
                  onClick={handleImageSize}
                />
              </div>
            ) : (
              ""
            )}

            <div className="title p-2 w-full font-semibold text-lg text-center mt-2">
              {props.title}
            </div>
            <div
              className={`${
                darkMode ? "text-zinc-300" : "text-zinc-800"
              } desc px-2 w-full  `}
              onClick={() => {
                setExpanded(!expanded);
              }}
              style={expanded ? {} : truncatedStyle}
            >
              {props.description}
            </div>
            <div className="p-2 w-full mt-3 ">
              <AvatarGroup
                isBordered
                max={3}
                total={10}
                renderCount={(count) => (
                  <p className="text-small text-foreground font-medium ms-2">
                    {/* +{count} others liked this */}
                    {props.likes} people liked this
                  </p>
                )}
              >
                <Avatar
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                />
                <Avatar
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                />
                <Avatar
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
                <Avatar
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                />
                <Avatar
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                />
                <Avatar
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                />
              </AvatarGroup>
            </div>
          </CardBody>

          <CardHeader className="py-3 pt-0 px-4 flex-row items-center  box-border">
            <div className="avatar_div flex w-1/2 items-center ">
              <Button
                color="foreground"
                variant="solid"
                className={`p-[10px] min-w-[45px] ${
                  liked ? "bg-red-500" : " "
                }`}
                onClick={handleLike}
              >
                <FiHeart size={30} />
              </Button>

              <Button
                color="foreground"
                variant="light"
                className=" p-[10px] min-w-[45px]    "
              >
                <AiOutlineComment size={30} />
              </Button>

              <Button
                color="foreground"
                variant="light"
                className=" p-[10px] min-w-[45px]"
              >
                <RiSendPlaneLine size={30} />
              </Button>

              {/* <FiHeart size={30} />
              <FiHeart size={30} /> */}
              {/* <User
                name="Jane Doe"
                description="Product Designer"
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                }}
              /> */}
            </div>
            <div className="options_div w-1/2 flex items-center justify-end">
              <div className="postAge text-sm">{age}</div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Post;
