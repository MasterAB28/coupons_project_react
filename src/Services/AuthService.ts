import axios from "axios";
import LoginReq from "../Models/LoginReq";
import { authStore, loginAction,  logoutAction } from "../Store/AuthState";

class AuthService{
    public async login(loginReq: LoginReq){
        const token = (await axios.post<string>("http://localhost:8080/auth/login", loginReq)).data;
        authStore.dispatch(loginAction(token));
    }

    public async logout(){
        if(authStore.getState().token != null){
            await axios.post<string>("http://localhost:8080/auth/logout");
        }
        authStore.dispatch(logoutAction())
    }
    
}
const authService = new AuthService();
export default authService;