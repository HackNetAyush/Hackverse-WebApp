import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
// import { useQueryClient } from "react-query";
// import { AcmeLogo } from "./AcmeLogo.jsx";

export default function NavTop() {
  const userContext = useContext(UserContext);
  const user = userContext.user;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // function Nav() {
  //   navigate("/theme");
  // }

  function goToLoginPage() {
    navigate("/login");
  }

  function logout() {
    // navigate("/login");
    queryClient.removeQueries("posts");
    userContext.logout();
  }

  return (
    <Navbar>
      {/* Its of 64px */}
      <NavbarBrand>
        {/* <AcmeLogo /> */}
        <p className="font-extrabold text-inherit text-lg ">TOGETHER</p>
      </NavbarBrand>

      <NavbarContent justify="end">
        {/* <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem> */}
        <NavbarItem>
          {user ? (
            <Button
              color="primary"
              onPress={() => {
                logout();
              }}
              variant="flat"
            >
              Logout
            </Button>
          ) : (
            <Button
              color="primary"
              onPress={() => {
                goToLoginPage();
              }}
              variant="flat"
            >
              Login
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
