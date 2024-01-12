import { errorNotify, successNotify } from "@components/toast/toastUtils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@redux/features/authSlice";

function useApi() {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.persistedReducer.auth.value);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const HEADERS = JSON.parse(process.env.NEXT_PUBLIC_API_HEADERS);
  HEADERS["Authorization"] = `Bearer ${auth.authToken}`;

  const [data, setData] = useState(null);
  const [apiStatus, setAPIStatus] = useState({
    isLoading: false,
    isLoaded: false,
    error: null,
  });

  useEffect(() => {
    if (apiStatus.error !== null && apiStatus.error.status === 401 && apiStatus.error.message === "Unauthorized: The provided authentication token has expired.") {
      router.push("/login");
      errorNotify("authentication token has expired");
      dispatch(logout());
    }
  }, [apiStatus.error]);

  const fetchData = async (url) => {
    setAPIStatus((prevStatus) => ({
      ...prevStatus,
      isLoading: true,
      isLoaded: false,
      error: null,
    }));

    try {
      const URL = `${API_URL}${url}`;

      const headers = HEADERS;

      const response = await fetch(URL, {
        method: "GET",
        headers: headers,
      });

      const data = await response.json();

      if (data.error) {
        setAPIStatus((prevStatus) => ({
          ...prevStatus,
          isLoading: true,
          isLoaded: false,
          error: data.error,
        }));
      } else {
        setData(data);
        setAPIStatus((prevStatus) => ({
          ...prevStatus,
          isLoading: false,
          isLoaded: true,
          error: null,
        }));
      }
    } catch (error) {
      setAPIStatus((prevStatus) => ({
        ...prevStatus,
        isLoading: true,
        isLoaded: false,
        error: error,
      }));
    }
  };

  const postData = async (url, body, successMessage) => {
    setAPIStatus((prevStatus) => ({
      ...prevStatus,
      isLoading: true,
      isLoaded: false,
      error: null,
    }));
    setData(null);

    try {
      const URL = `${API_URL}${url}`;

      const headers = HEADERS;

      const response = await fetch(URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.error) {
        errorNotify(data.error);
        setData(null);
        setAPIStatus((prevStatus) => ({
          ...prevStatus,
          isLoading: false,
          isLoaded: true,
          error: data.error,
        }));
      } else {
        successNotify(successMessage);
        setData("success");
        setAPIStatus((prevStatus) => ({
          ...prevStatus,
          isLoading: false,
          isLoaded: true,
          error: null,
        }));
      }
    } catch (error) {
      errorNotify(error);
      setData(null);
      setAPIStatus((prevStatus) => ({
        ...prevStatus,
        isLoading: false,
        isLoaded: true,
        error: error,
      }));
    }
  };

  const putData = async (url, body, successMessage) => {
    setAPIStatus((prevStatus) => ({
      ...prevStatus,
      isLoading: true,
      isLoaded: false,
      error: null,
    }));
    setData(null);

    try {
      const URL = `${API_URL}${url}`;

      const headers = HEADERS;

      const response = await fetch(URL, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.error) {
        errorNotify(data.error);
        setData(null);
        setAPIStatus((prevStatus) => ({
          ...prevStatus,
          isLoading: false,
          isLoaded: true,
          error: data.error,
        }));
      } else {
        successNotify(successMessage);
        setData("success");
        setAPIStatus((prevStatus) => ({
          ...prevStatus,
          isLoading: false,
          isLoaded: true,
          error: null,
        }));
      }
    } catch (error) {
      errorNotify(error);
      setData(null);
      setAPIStatus((prevStatus) => ({
        ...prevStatus,
        isLoading: false,
        isLoaded: true,
        error: error,
      }));
    }
  };

  const deleteData = async (url, successMessage) => {
    setData(null);
    setAPIStatus((prevStatus) => ({
      ...prevStatus,
      isLoading: true,
      isLoaded: false,
      error: null,
    }));
    try {
      const URL = `${API_URL}${url}`;

      const headers = HEADERS;

      const response = await fetch(URL, {
        method: "DELETE",
        headers: headers,
      });

      const data = await response.json();

      if (data.error) {
        errorNotify(data.error);
        setData(null);
        setAPIStatus((prevStatus) => ({
          ...prevStatus,
          isLoading: true,
          isLoaded: false,
          error: data.error,
        }));
      } else {
        successNotify(successMessage);
        setData("success");
        setAPIStatus((prevStatus) => ({
          ...prevStatus,
          isLoading: false,
          isLoaded: true,
          error: null,
        }));
      }
    } catch (error) {
      errorNotify(error);
      setData(null);
      setAPIStatus((prevStatus) => ({
        ...prevStatus,
        isLoading: true,
        isLoaded: false,
        error: error,
      }));
    }
  };

  return {
    data,
    apiStatus,
    fetchData,
    postData,
    putData,
    deleteData,
  };
}

export default useApi;
