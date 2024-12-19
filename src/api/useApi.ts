import { useSelector } from "react-redux"
import { AppRootStateType } from "../state/store";
import axios from "axios";
import { baseInstance } from "./baseInstance";


export const useApi = () => {
    const token = useSelector((state: AppRootStateType) => state.auth.auth.token)

    const instanceWithToken = axios.create({
        ...baseInstance.defaults,
        headers: {
            ...baseInstance.defaults.headers,
            Authorization: token ? `Bearer ${token}` : ""
        }
    })

    return instanceWithToken
}