import React, { useState, useEffect } from "react";
import "./customToast.css";

const Toast = ({ message, type, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return isVisible ? <div className={`toast ${type}`}>{message}</div> : null;
};

export default Toast;
