import React, { useState, useContext } from "react";
import { DarkModeContext } from "../Contexts/DarkModeContext";
import { UserContext } from "../Contexts/UserContext";
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Divider } from "@nextui-org/divider";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Textarea } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Post from "../Components/Post";

const AddPost = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [postBtnState, setPostBtnState] = useState(1);
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [desc, setDesc] = useState("");

  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const dmc = useContext(DarkModeContext);
  // var isDarkMode = dmc.DarkMode;
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // -1 will navigate to the previous page in the history stack
  };

  const handlePreview = () => {
    // alert("Preview");
    onOpen();
  };

  const handlePost = () => {
    setPostBtnState(0);
    toast
      .promise(
        axios.post(
          `${serverUrl}/api/posts/createNewPost`,
          {
            title,
            imgUrl,
            description: desc,
          },
          {
            withCredentials: true, // Include credentials (cookies)
          }
        ),
        {
          loading: "Posting...",
          success: <b>Post Added!</b>,
          error: <b>Failed posting!</b>,
        }
      )
      .then((response) => {
        // Redirect to login page or any other page after successful signup
        // userContext.setUser(response.data.user);
        console.log(response);
        navigate("/");
      })

      .catch((e) => {
        console.log(e);
        setPostBtnState(1);
      });
  };

  const userContext = useContext(UserContext);
  const user = userContext.user;

  // const handleLogin = () => {
  //   setLoginbtnState(0);
  //   toast
  //     .promise(
  //       axios.post(
  //         `${serverUrl}/api/auth/login`,
  //         {
  //           usernameOrEmail,
  //           password,
  //         },
  //         {
  //           withCredentials: true, // Include credentials (cookies)
  //         }
  //       ),
  //       {
  //         loading: "Processing...",
  //         success: <b>Logged In!</b>,
  //         error: <b>Failed logging in.</b>,
  //       }
  //     )
  //     .then((response) => {
  //       // Redirect to login page or any other page after successful signup
  //       userContext.setUser(response.data.user);
  //       console.log(response.data.user);
  //       navigate("/");
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       setLoginbtnState(1);
  //     });
  // };

  return (
    <div className="main flex items-center justify-center w-full h-full flex-col">
      <div className="top_nav flex items-center justify-center w-full  h-[64px] z-10 fixed top-0">
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
          TOGETHER
        </div>
      </div>

      <div className="form_container flex items-center justify-center flex-col gap-2 w-[80%] h-full">
        <h1 className="text-2xl font-bold p-5 w-full pl-2">Create new post</h1>

        <Input
          className="w-full"
          type="text"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          isRequired
        />

        <Input
          className="w-full"
          type="text"
          label="Image URL (Optional)"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        />

        <Textarea
          label="Description"
          // placeholder="Enter your description"
          className="w-full"
          minRows={3}
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />

        <Button
          onClick={handlePreview}
          color="primary"
          variant="flat"
          className="w-full p-6"
        >
          Preview
        </Button>

        <Divider className="my-4" />

        <Button
          color="primary"
          className="w-full p-6"
          onClick={handlePost}
          isDisabled={postBtnState ? false : true}
          // isDisabled
        >
          Post
        </Button>
      </div>

      <Modal
        className="{h-[80%]} max-h-full "
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        placement="bottom"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Post Preview
              </ModalHeader>
              <ModalBody>
                <Post
                  username={user.username}
                  uploadedBy={user.username}
                  title={title}
                  description={desc}
                  imgUrl={imgUrl}
                />
              </ModalBody>
              <ModalFooter>
                {/* <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button> */}
                <Button color="primary" onPress={onClose}>
                  Close Preview
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddPost;
