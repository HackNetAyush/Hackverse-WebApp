import { useContext, useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { AvatarGroup } from "@nextui-org/react";
import { User } from "@nextui-org/react";
import { FiHeart } from "react-icons/fi";
import { Button } from "@nextui-org/react";
import { AiOutlineComment } from "react-icons/ai";
import { RiSendPlaneLine } from "react-icons/ri";
import { DarkModeContext } from "../Contexts/DarkModeContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const NewPost = (props) => {
  const dmc = useContext(DarkModeContext);
  const darkMode = dmc.DarkMode;
  const {
    post_uid,
    title,
    description,
    imgUrl,
    uploadedBy,
    username,
    likes,
    createdAt,
    isLikedByYou,
  } = props;

  const [liked, setLiked] = useState(isLikedByYou);
  const [imageSize, setImageSize] = useState("object-cover");
  const [expanded, setExpanded] = useState(0);
  const queryClient = useQueryClient();
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const truncatedStyle = {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
  };

  const calculatePostAge = (postTimestamp) => {
    const postDate = new Date(postTimestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - postDate) / 1000);
    let interval = Math.floor(diffInSeconds / 31536000);
    if (interval >= 1) return `${interval} year${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(diffInSeconds / 2592000);
    if (interval >= 1) return `${interval} month${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(diffInSeconds / 86400);
    if (interval >= 1) return `${interval} day${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(diffInSeconds / 3600);
    if (interval >= 1) return `${interval} hour${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(diffInSeconds / 60);
    if (interval >= 1)
      return `${interval} minute${interval > 1 ? "s" : ""} ago`;

    return `${diffInSeconds} second${diffInSeconds !== 1 ? "s" : ""} ago`;
  };

  const age = calculatePostAge(createdAt);

  const likePost = async (postId) => {
    const response = await axios.post(
      `${serverUrl}/api/posts/likePost`,
      { post_id: postId },
      { withCredentials: true }
    );
    if (response.status !== 200) throw new Error("Error liking post");
    return response.data;
  };

  const unlikePost = async (postId) => {
    const response = await axios.post(
      `${serverUrl}/api/posts/unlikePost`,
      { post_id: postId },
      { withCredentials: true }
    );
    if (response.status !== 200) throw new Error("Error unliking post");
    return response.data;
  };

  const likeMutation = useMutation(likePost, {
    onMutate: async (postId) => {
      setLiked(true);
      queryClient.setQueryData(["posts"], (oldPosts) => {
        return oldPosts.map((post) =>
          post._id === postId
            ? { ...post, isLikedByYou: true, likes: post.likes + 1 }
            : post
        );
      });
    },
    onError: (err, variables, context) => {
      setLiked(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const unlikeMutation = useMutation(unlikePost, {
    onMutate: async (postId) => {
      setLiked(false);
      queryClient.setQueryData(["posts"], (oldPosts) => {
        return oldPosts.map((post) =>
          post._id === postId
            ? { ...post, isLikedByYou: false, likes: post.likes - 1 }
            : post
        );
      });
    },
    onError: (err, variables, context) => {
      setLiked(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleLike = () => {
    if (liked) {
      unlikeMutation.mutate(post_uid);
    } else {
      likeMutation.mutate(post_uid);
    }
  };

  const handleImageSize = () => {
    if (imageSize === "object-cover") {
      setImageSize("object-contain");
    } else if (imageSize === "object-contain") {
      setImageSize("object-cover");
    }
  };

  return (
    <div
      data-postid={post_uid}
      className="w-full flex items-center justify-center"
    >
      <div className="sm:min-w-[370px] sm:max-w-[500px] min-w-[96%] sm:mt-3">
        <Card className=" mt-3 h-full box-border">
          <CardHeader className="py-3 px-4 flex-row items-center box-border">
            <div className="avatar_div flex items-center w-1/2">
              <User
                name={uploadedBy}
                description={`@${username}`}
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                }}
              />
            </div>
            <div className="options_div w-1/2 h-full flex items-center justify-end">
              <Button
                className="flex items-center justify-center"
                color="primary"
                radius="full"
                size="md"
                variant="solid"
              >
                Follow
              </Button>
            </div>
          </CardHeader>
          <CardBody className="overflow-visible py-2 w-full flex items-center">
            {imgUrl && (
              <div className="image_container object-cover rounded-xl !max-w-full !w-full aspect-square flex items-center justify-center">
                <Image
                  alt="Card background"
                  className={`${imageSize} rounded-xl !max-w-full !w-full aspect-square`}
                  src={imgUrl}
                  loading="lazy"
                  disableSkeleton={false}
                  onClick={handleImageSize}
                />
              </div>
            )}
            <div className="title p-2 w-full font-semibold text-lg text-center mt-2">
              {title}
            </div>
            <div
              className={`${
                darkMode ? "text-zinc-300" : "text-zinc-800"
              } desc px-2 w-full`}
              onClick={() => setExpanded(!expanded)}
              style={expanded ? {} : truncatedStyle}
            >
              {description}
            </div>
            <div className="p-2 w-full mt-3">
              <AvatarGroup isBordered max={3} total={likes}>
                {/* Avatar Group for users who liked */}
              </AvatarGroup>
            </div>
          </CardBody>
          <CardHeader className="py-3 pt-0 px-4 flex-row items-center box-border">
            <div className="avatar_div flex w-1/2 items-center">
              <Button
                color="foreground"
                variant="solid"
                className={`p-[10px] min-w-[45px] ${liked ? "bg-red-500" : ""}`}
                onClick={handleLike}
              >
                <FiHeart size={30} />
              </Button>
              <Button
                color="foreground"
                variant="light"
                className="p-[10px] min-w-[45px]"
              >
                <AiOutlineComment size={30} />
              </Button>
              <Button
                color="foreground"
                variant="light"
                className="p-[10px] min-w-[45px]"
              >
                <RiSendPlaneLine size={30} />
              </Button>
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

export default NewPost;
