/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavTop from "../Components/NavTop";
import NavBottom from "../Components/NavBottom";
import Posts from "../Components/Posts";
import NewPosts from "../Components/NewPosts";
import Stories from "../Components/Stories";

const Dashboard = () => {
  const scrollerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (scrollerRef.current) {
      setIsReady(true);
    }
  }, [scrollerRef]);

  return (
    <div className="root flex w-full h-full items-center justify-center flex-col ">
      <div className="topNav w-full h-fit ">
        <NavTop />
      </div>

      <div
        className="flex posts w-full h-full flex-col overflow-y-auto overscroll-auto"
        ref={scrollerRef}
        style={{ scrollSnapType: "y mandatory", padding: "10px" }}
      >
        <div className="stories w-full">
          <Stories />
        </div>
        {isReady && <Posts customScrollParent={scrollerRef.current} />}
      </div>
    </div>
  );
};

export default Dashboard;
