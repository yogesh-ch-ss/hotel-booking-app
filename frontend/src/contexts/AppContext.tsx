// context is used to manage a state or share data globally
// instead of passing props all the way down to the component, we can make the data/state available globally

import React, { useContext } from "react";

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
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          console.log(toastMessage);
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
