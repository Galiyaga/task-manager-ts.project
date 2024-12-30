import { useSelector } from "react-redux";
import { AppRootStateType } from "../state/store";
import axios from "axios";
import { baseInstance } from "./baseInstance";
import { useMemo } from "react";

export const useApi = () => {
  const token = useSelector((state: AppRootStateType) => state.auth.auth.token);

  const instanceWithToken = useMemo(() => {
    return axios.create({
      ...baseInstance.defaults,
      headers: {
        ...baseInstance.defaults.headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  }, [token]);

  return instanceWithToken;
};
