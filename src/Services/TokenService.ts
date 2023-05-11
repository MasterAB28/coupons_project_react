import axios from "axios";
import { authStore } from "../Store/AuthState";

export function tokenInterceptor(){
    axios.interceptors.request.use( (config)=>{
        if(authStore.getState().token){
            config.headers.Authorization = "Bearer " + authStore.getState().token
        }

        return config;
    })
}