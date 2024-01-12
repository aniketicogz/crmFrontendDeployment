"use client";

import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@redux/features/authSlice";
import { useRouter } from "next/navigation";
import { successNotify } from "@components/toast/toastUtils";
import { useEffect, useState } from "react";
import "./navStyle.scss";
import Button from "@components/button/button";
import Wrapper from "@components/helpers/wrapper";

const Nav = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.persistedReducer.auth.value);
  // console.log("auth", auth);

  const { isAuth } = auth;

  const onLogoutBtnClickHandler = () => {
    router.push("/login");
    successNotify("Logout Successful");
    dispatch(logout());
  };
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    const newTheme = isDarkTheme ? "light" : "dark";
    localStorage.setItem("theme", newTheme);

    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle("dark", !isDarkTheme);
  };

  // Effect to load the theme from local storage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";
    setIsDarkTheme(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  return (
    <nav className="app-header grid grid_cols_4">
      <div className="col_span_2 navbar-header">
        <Link href={"/"} className="navbar-brand">
          <Image src={isDarkTheme === true ? `/assets/images/icogz-logo-white.svg` : `/assets/images/icogz-logo.svg`} alt="icogz logo" width={0} height={0} style={{ width: "auto", height: "inherit" }} />
        </Link>
      </div>
      <div className="col_span_2 navbar-nav">
        <Button variant={"secondary"} onClick={toggleTheme}>
          Toggle Theme
        </Button>
        {isAuth && (
          <Wrapper>
            <Button variant={"primary"} onClick={onLogoutBtnClickHandler}>
              Logout
            </Button>
          </Wrapper>
        )}
      </div>
    </nav>
  );
};

export default Nav;
