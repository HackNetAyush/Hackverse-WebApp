/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Post from "./Post";
import { Virtuoso } from "react-virtuoso";
import { Spinner } from "@nextui-org/spinner";
// import { useQueryClient } from "@tanstack/react-query";

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

const Posts = ({ customScrollParent }) => {
  // const [loading, setLoading] = useState(false);
  // const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
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

  if (isLoading) {
    return (
      <div className="w-full !h-full flex items-center justify-center ">
        <Spinner size="md" />
      </div>
    );
  }
  if (status === "error")
    return (
      <div className="w-full h-full flex items-center justify-center">
        Error: {error.message}
      </div>
    );

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
            <Post
              uploadedBy={post.authorUsername}
              username={post.authorUsername}
              authorUID={post.author}
              id={index}
              title={post.title}
              description={post.description}
              imgUrl={post.imgUrl}
              key={post._id} // Use unique _id as key
              post_uid={post._id}
              likes={post.likesCount}
              createdAt={post.createdAt}
              isLiked={post.isLikedByYou}
              // queryClient={queryClient}
            />
          );
        }}
      />
      {isFetchingNextPage && (
        <div className="w-full !h-fit flex items-center justify-center ">
          <Spinner size="md" />
          Loading Bottom
        </div>
      )}
    </>
  );
};

export default Posts;

// ////////////////////////////////////////////////////////////////////////////////////////

// import { useRef, useState, useEffect, useCallback } from "react";
// import Post from "./Post";
// import { Virtuoso } from "react-virtuoso";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { Spinner } from "@nextui-org/spinner";

// const Posts = ({ customScrollParent }) => {
//   const [posts, setPosts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const prevPageRef = useRef(0); // To track the previous page

//   const fetchPosts = useCallback(async (page) => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://vibe-backend-7grj.onrender.com/api/posts?page=${page}&limit=10`,
//         { method: "GET", credentials: "include" }
//       );
//       const newPosts = await response.json();

//       setPosts((prevPosts) => [...prevPosts, ...newPosts]);
//       setHasMore(newPosts.length > 0);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//     setLoading(false);
//   }, []);

//   useEffect(() => {
//     if (page !== prevPageRef.current) {
//       fetchPosts(page);
//       prevPageRef.current = page;
//     }
//   }, [page, fetchPosts]);

//   // const [data, setData] = useState([]);

//   // useEffect(() => {
//   //   fetch("/data.json")
//   //     .then((response) => response.json())
//   //     .then((data) => setData(data))
//   //     .catch((error) => console.error("Error fetching data:", error));
//   // }, []);

//   return (
//     <>
//       <Virtuoso
//         style={{ scrollSnapType: "y mandatory" }}
//         customScrollParent={customScrollParent}
//         useWindowScroll
//         // scrollerRef={scrollerRef}
//         className="!h-full w-full flex items-center justify-center"
//         // totalCount={data.length}
//         increaseViewportBy={800}
//         data={posts}
//         endReached={() => {
//           if (hasMore && !loading) {
//             setPage((prevPage) => prevPage + 1);
//           }
//         }}
//         itemContent={(index) => {
//           const post = posts[index];
//           return (
//             <Post
//               uploadedBy={post.authorUsername}
//               // isLiked={post.isLikedByYou}
//               username={post.authorUsername}
//               id={index}
//               title={post.title}
//               description={post.description}
//               imgUrl={post.imgUrl}
//               post_uid={post._id}
//               likes={post.likes.length}
//               createdAt={post.createdAt}
//             />
//           );
//         }}
//       />

//       {loading ? (
//         <div className="w-full !h-fit flex items-center justify-center ">
//           <Spinner size="md" />
//         </div>
//       ) : (
//         ""
//       )}
//     </>

//     // <Virtuoso
//     //   style={{ scrollSnapType: "y mandatory" }}
//     //   customScrollParent={customScrollParent}
//     //   useWindowScroll
//     //   // scrollerRef={scrollerRef}
//     //   className="!h-full w-full flex items-center justify-center"
//     //   totalCount={data.length}
//     //   itemContent={(index) => {
//     //     const post = data[index];
//     //     return (
//     //       <Post
//     //         uploadedBy={post.uploadedBy}
//     //         isLiked={post.isLikedByYou}
//     //         username={post.username}
//     //         id={index}
//     //       />
//     //     );
//     //   }}
//     // />
//   );
// };

// export default Posts;

// //////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import Post from "./Post";
// import { Virtuoso } from "react-virtuoso";
// import { Spinner } from "@nextui-org/spinner";

// const fetchPosts = async ({ pageParam = 1 }) => {
//   const response = await fetch(
//     `${import.meta.env.VITE_SERVER_URL}/api/posts?page=${pageParam}&limit=10`,
//     { method: "GET", credentials: "include" }
//   );
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// };

// const Posts = ({ customScrollParent }) => {
//   const [loading, setLoading] = useState(0);

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     error,
//     status,
//   } = useInfiniteQuery({
//     queryKey: ["posts"],
//     queryFn: fetchPosts,
//     getNextPageParam: (lastPage, pages) =>
//       lastPage.length ? pages.length + 1 : undefined,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//     cacheTime: 10 * 60 * 1000, // 10 minutes
//     keepPreviousData: true,
//   });

//   const posts = data?.pages.flat() || [];

//   if (status === "loading") {
//     setLoading(true);
//     return <div>Loading...</div>;
//   }
//   if (status === "error") return <div>Error: {error.message}</div>;

//   return (
//     <>
//       <Virtuoso
//         style={{ scrollSnapType: "y mandatory" }}
//         customScrollParent={customScrollParent}
//         useWindowScroll
//         className="!h-full w-full flex items-center justify-center"
//         data={posts}
//         endReached={() => {
//           if (hasNextPage && !isFetchingNextPage) {
//             fetchNextPage();
//           }
//         }}
//         itemContent={(index) => {
//           const post = posts[index];
//           return (
//             <Post
//               uploadedBy={post.authorUsername}
//               username={post.authorUsername}
//               id={index}
//               title={post.title}
//               description={post.description}
//               imgUrl={post.imgUrl}
//               key={post._id}
//               post_uid={post._id}
//               likes={post.likes.length}
//               createdAt={post.createdAt}
//             />
//           );
//         }}
//       />
//       {loading ? (
//         <div className="w-full !h-fit flex items-center justify-center ">
//           <Spinner size="md" />
//         </div>
//       ) : (
//         ""
//       )}
//     </>
//   );
// };

// export default Posts;

// ///////////////////////////////////////////////////////////////////////////////////
