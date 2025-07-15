import { AUTH_USER } from "@api/data/authSlice";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
// Global context types
export type UserInfo = { [key: string]: null | string | number | boolean };

interface AppContextProps {
  updateUserData: (userInfo: UserInfo | null) => void;
  userInfo: UserInfo | null;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  setFeature: Dispatch<SetStateAction<string>>;
  feature: string;
}

export const GlobalContext = createContext<AppContextProps | undefined>(
  undefined
);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [feature, setFeature] = useState<string>("overview");
  // State update functions
  const updateUserData = (userInfo: UserInfo | null) => {
    setUserInfo(userInfo);
  };

  useEffect(() => {
    const userData =
      sessionStorage.getItem(AUTH_USER) || localStorage.getItem(AUTH_USER);
    if (userData) setUserInfo(JSON.parse(userData));
  }, []);

  //   Store Values
  const store = {
    userInfo,
    updateUserData,

    setIsAuthenticated,
    isAuthenticated,
    setFeature,
    feature,
  };

  return (
    <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = (): AppContextProps => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
