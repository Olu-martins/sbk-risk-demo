import { ACCESS_TOKEN, logout, setCredentials } from "@api/data/authSlice";
import { useAppDispatch } from "@api/data/store";
import { useGlobalContext } from "@contexts/GlobalContext";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface IProtectedRoute {
  children: React.ReactNode;
}

const ProtectedRoute = (props: IProtectedRoute) => {
  const { children } = props;
  const dispatch = useAppDispatch();
  const { updateUserData, setIsAuthenticated } = useGlobalContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const token =
    sessionStorage.getItem(ACCESS_TOKEN) ||
    localStorage.getItem(ACCESS_TOKEN) ||
    "";

  const fetchUser = useCallback(async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data) {
        updateUserData(res.data.data.user);
        dispatch(setCredentials({ user: res.data.data.user }));
        setIsAuthenticated(true);
      }
    } catch (error) {
      const err = error as { response?: { data?: { statusCode?: number } } };
      if (err.response?.data?.statusCode === 401) {
        dispatch(logout());
        setIsAuthenticated(false);
        navigate("/");
      }
    } finally {
      setIsLoading(false);
    }
  }, [token, updateUserData, dispatch, navigate, setIsAuthenticated]);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      if (mounted) {
        await fetchUser();
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []); // Empty dependency array means this only runs once on mount

  if (isLoading) {
    return null;
  }

  return <>{token ? <>{children}</> : <Navigate to="/" replace />}</>;
};

export default ProtectedRoute;
