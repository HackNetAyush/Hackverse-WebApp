import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Post from "../Components/Post";
import NavTopWithBackButton from "../Components/NavTopWithBackButton";

const PostPage = () => {
  const params = useParams();
  const postId = params.postId;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hasFetched = useRef(false);
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    if (hasFetched.current) return; // Check if fetch has already been done

    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${serverUrl}/api/posts/getPostWithId/${postId}`,
          { credentials: "include" }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setPost(data.post);
        console.log(data.post);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    hasFetched.current = true; // Set ref to true after fetch
  }, [postId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className=" w-full h-full flex flex-col">
      <NavTopWithBackButton heading="Post" />

      <div className="p-[10px] pt-0 h-full flex items-center justify-center">
        <Post
          uploadedBy={post.authorUsername}
          username={post.authorUsername}
          title={post.title}
          description={post.description}
          imgUrl={post.imgUrl}
          post_uid={post._id}
          likes={post.likes.length}
          createdAt={post.createdAt}
        />
      </div>
    </div>
  );
};

export default PostPage;
