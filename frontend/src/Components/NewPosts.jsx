import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
// import Post from "./Post";
import NewPost from "./NewPost";
import { Virtuoso } from "react-virtuoso";
import { Spinner } from "@nextui-org/spinner";

const fetchPosts = async ({ pageParam = 1 }) => {
  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/posts?page=${pageParam}&limit=10`,
    { method: "GET", credentials: "include" }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const NewPosts = ({ customScrollParent }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length ? pages.length + 1 : undefined,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    keepPreviousData: true,
  });

  const posts = data?.pages.flat() || [];

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Virtuoso
        style={{ scrollSnapType: "y mandatory" }}
        customScrollParent={customScrollParent}
        useWindowScroll
        className="!h-full w-full flex items-center justify-center"
        data={posts}
        endReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        itemContent={(index) => {
          const post = posts[index];
          return (
            <NewPost
              uploadedBy={post.authorUsername}
              username={post.authorUsername}
              title={post.title}
              description={post.description}
              imgUrl={post.imgUrl}
              post_uid={post._id}
              likes={post.likes.length}
              createdAt={post.createdAt}
              isLiked={post.isLikedByYou}
            />
          );
        }}
      />
      {isFetchingNextPage && (
        <div className="w-full !h-fit flex items-center justify-center">
          <Spinner size="md" />
        </div>
      )}
    </>
  );
};

export default NewPosts;
