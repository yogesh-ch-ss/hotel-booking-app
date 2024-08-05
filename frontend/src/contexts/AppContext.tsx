// context is used to manage a state or share data globally
// instead of passing props all the way down to the component, we can make the data/state available globally

import React, { useContext, useState } from "react";
import Toast from "../components/Toast";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void; // the message tab
};

// defining the context
const AppContext = React.createContext<AppContext | undefined>(undefined);

// provider component holds the data that must be shared
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // hold the state of the toast
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage); // setting the toast value
          console.log(toastMessage);
        },
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
