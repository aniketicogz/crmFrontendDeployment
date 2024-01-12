"use client";
import { errorNotify, successNotify } from "@components/toast/toastUtils";
import React, { useCallback, useState } from "react";
import { login } from "@redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Wrapper from "@components/helpers/wrapper";
import "./login.scss";
import Link from "next/link";
import Button from "@components/button/button";

const userLoginDefaultData = {
  email: "",
  password: "",
};

const userLoginDefaultErrors = {
  email: null,
  password: null,
};

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // LOGIN FORM DATA & ERROS
  const [loginFormData, setLoginFormData] = useState(userLoginDefaultData);
  const [loginFormErrors, setLoginFormErrors] = useState(userLoginDefaultErrors);
  const [loginAPIStatus, setLoginAPIStatus] = useState({
    isLoading: false,
    isLoaded: false,
    null: null,
  });

  // UPDATE LOGIN FORM DATA
  const updateLoginFields = (fields) => {
    setLoginFormData((prev) => {
      return { ...prev, ...fields };
    });
  };

  // UPDATE LOGIN FORM ERROS
  const updateLoginErrors = (fields) => {
    setLoginFormErrors((prev) => {
      return { ...prev, ...fields };
    });
  };

  const [isEmailInputFieldIsValid, setEmailInputFieldIsValid] = useState(true);
  const onEmailChangeHandler = (enteredValue) => {
    const { value } = enteredValue.target;

    if (value.trim() !== "") {
      setEmailInputFieldIsValid(true);
      updateLoginErrors({ email: null });
    } else {
      setEmailInputFieldIsValid(false);
      updateLoginErrors({ email: "Email is required" });
    }
    updateLoginFields({ email: value });
  };

  const [isPasswordInputFieldIsValid, setPasswordInputFieldIsValid] = useState(true);
  const onPasswordChangeHandler = (enteredValue) => {
    const { value } = enteredValue.target;

    if (value.trim() !== "") {
      setPasswordInputFieldIsValid(true);
      updateLoginErrors({ password: null });
    } else {
      setPasswordInputFieldIsValid(false);
      updateLoginErrors({ password: "Password is required" });
    }
    updateLoginFields({ password: value });
  };

  const onSubmitBtnClickHandler = () => {
    submitLoginForm(loginFormData);
  };

  const submitLoginForm = useCallback(async (formData) => {
    setLoginAPIStatus((prevStatus) => ({
      ...prevStatus,
      isLoading: true,
      isLoaded: false,
      error: null,
    }));

    try {
      const url = `${API_URL}user/login`;

      const headers = {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      };

      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log("data", data);

      if (data.error) {
        errorNotify(data.error);
        setLoginAPIStatus((prevStatus) => ({
          ...prevStatus,
          isLoading: true,
          isLoaded: false,
          error: data.error,
        }));
      } else {
        dispatch(
          login({
            isAuth: true,
            userName: data.userName,
            authToken: data.token,
            isSuperAdmin: data.isSuperAdmin,
            isAdmin: data.isAdmin,
            isLeader: data.isLeader,
            isPartner: data.isPartner,
          })
        );
        successNotify("Login Successful");
        setLoginAPIStatus((prevStatus) => ({
          ...prevStatus,
          isLoading: false,
          isLoaded: true,
          error: null,
        }));
        router.push("/home");
      }
    } catch (error) {
      errorNotify(error);
      setLoginAPIStatus((prevStatus) => ({
        ...prevStatus,
        isLoading: true,
        isLoaded: false,
        error: error,
      }));
    }
  }, []);

  return (
    <Wrapper>
      <div className="form-wrapper">
        <div className="form">
          <div className="card">
            <div className="header grid grid-center">
              <h2>Login</h2>
            </div>
            <div className="body">
              <div className="">{loginAPIStatus.error}</div>
              <div className="">
                <form>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <div className="form-control-wrapper">
                      <input className={`form-control ${!isEmailInputFieldIsValid && "invalid"}`} value={loginFormData.email} onChange={(e) => onEmailChangeHandler(e)} onBlur={(e) => onEmailChangeHandler(e)} type="email" id="email" placeholder="Please enter email" />
                      {loginFormErrors.email && <span className="invalid-feedback">{loginFormErrors.email}</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      Password
                    </label>
                    <div className="form-control-wrapper">
                      <input className={`form-control ${!isPasswordInputFieldIsValid && "invalid"}`} value={loginFormData.password} onChange={(e) => onPasswordChangeHandler(e)} onBlur={(e) => onPasswordChangeHandler(e)} type="password" id="password" placeholder="Please enter password" />
                      {loginFormErrors.password && <span className="invalid-feedback">{loginFormErrors.password}</span>}
                    </div>
                  </div>
                  <div className="form-group grid grid-margin-bottom">
                    <Link href={"/"} className="form-label">
                      Forgot Password
                    </Link>
                  </div>
                  <div className="grid w-100 flex justify-between items-center">
                    <Button variant={"primary"} onClick={onSubmitBtnClickHandler}>
                      SignIn
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
