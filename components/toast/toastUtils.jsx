import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom

import Toast from "./toast";

const toastTypes = {
  SUCCESS: "success",
  ERROR: "error",
};

const showToast = (message, type, duration) => {
  const toast = document.createElement("div");
  document.body.appendChild(toast);

  return new Promise((resolve) => {
    const handleRemove = () => {
      document.body.removeChild(toast);
      resolve();
    };

    // Use createRoot instead of ReactDOM.render
    const root = createRoot(toast);
    root.render(<Toast message={message} type={type} duration={duration} />);

    setTimeout(handleRemove, duration);
  });
};

export const successNotify = (message, duration = 3000) => {
  return showToast(message, toastTypes.SUCCESS, duration);
};

export const errorNotify = (message, duration = 3000) => {
  return showToast(message, toastTypes.ERROR, duration);
};
