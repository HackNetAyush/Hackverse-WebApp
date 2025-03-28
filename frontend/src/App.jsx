import "./App.css";
import { NextUIProvider } from "@nextui-org/react";
import Dashboard from "./Pages/Dashboard";
import { DarkModeContext } from "./Contexts/DarkModeContext";
import { UserContext } from "./Contexts/UserContext";
import React, { useContext } from "react";
import {
  createBrowserRouter,
  // BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Theme from "./Pages/Theme";
import Inbox from "./Pages/Inbox";
import Login from "./Pages/Login";
import NewAccount from "./Pages/NewAccount";
import { Toaster } from "react-hot-toast";
import NavBottom from "./Components/NavBottom";
import MainLayout from "./Layout/MainLayout";
import AddPost from "./Pages/AddPost";
import PostPage from "./Pages/PostPage";
import UserProfile from "./Pages/UserProfile";

function ProtectedRoute({ children }) {
  const { user, loading } = React.useContext(UserContext);
  // console.log(user, loading);
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
}

function RestrictedForLoggedInUsers({ children }) {
  const { user, loading } = React.useContext(UserContext);
  if (loading) return <div>Loading...</div>;
  return user ? <Navigate to="/" /> : children;
}

const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      { path: "theme", element: <Theme /> },
      { path: "inbox", element: <Inbox /> },
      { path: "newAccount", element: <NewAccount /> },
      { path: "addPost", element: <AddPost /> },
      { path: "post/:postId", element: <PostPage /> },
      { path: "/u/:username", element: <UserProfile /> },
    ],
  },
  {
    path: "/post",
    // element: <SecondaryLayout />,
    children: [{ index: true, element: <>Hola!</> }],
  },

  {
    path: "/login",
    children: [
      {
        index: true,
        element: (
          <RestrictedForLoggedInUsers>
            <Login />
          </RestrictedForLoggedInUsers>
        ),
      },
    ],
  },
  {
    path: "/newAccount",
    children: [
      {
        index: true,
        element: (
          <RestrictedForLoggedInUsers>
            <NewAccount />
          </RestrictedForLoggedInUsers>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  const darkContext = useContext(DarkModeContext);
  var isDark = darkContext.DarkMode;
  // const { loading, user } = useContext(UserContext);

  // const shouldShowNavBottom = !loading && location.pathname !== "/theme";

  return (
    <NextUIProvider className="w-full h-full">
      <main
        className={`${
          isDark ? "dark" : "light"
        } text-foreground bg-background w-full h-full flex flex-col items-center justify-center  overflow-auto`}
      >
        <Toaster
          position="top-center"
          reverseOrder={true}
          toastOptions={{
            style: {
              background: isDark ? "#18181b" : "white",
              color: isDark ? "white" : "black",
            },
          }}
        />

        <RouterProvider router={router} />

        {/* <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/theme" element={<Theme />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/login" element={<Login />} />
            <Route path="/newAccount" element={<NewAccount />} />
          </Routes> */}

        {/* {shouldShowNavBottom && <NavBottom />} */}
      </main>
    </NextUIProvider>
  );
}

export default App;
