"use client";

import { Store } from "@redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export const ReduxProvider = ({ children }) => {
  let persistor = persistStore(Store);

  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
};
