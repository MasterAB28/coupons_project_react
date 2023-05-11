import axios from "axios";
import LoginReq from "../Models/LoginReq";
import { authStore, loginAction, logout } from "../Store/AuthState";

class AuthService{
    public async login(loginReq: LoginReq){
        const token = (await axios.post<string>("http://localhost:8080/auth/login", loginReq)).data;
        console.log(token);  
        authStore.dispatch(loginAction(token));
    }

    public async logout(){
        authStore.dispatch(logout())
        
    }
}
const authService = new AuthService();
export default authService;