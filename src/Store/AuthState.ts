import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import { User } from "../Models/User";


export class AuthState{
    public token: string = null ;
    public name: string = null;
    public clientType: string = null;

    constructor(){
        if(localStorage.token){
            this.token = localStorage.token;
            const container: { name:string, clientType: string} = jwtDecode(this.token);
            this.clientType = container.clientType;
            this.name = container.name;
        }
    }

}

export enum AuthActionTypes{
    Login, Logout
}

export interface AuthAction{
    type: AuthActionTypes,
    payload?: string
}


export function loginAction(token: string){
    return {type: AuthActionTypes.Login, payload: token}
}

export function logout(){
    return { type: AuthActionTypes.Logout}
}

export function authReducer(currentState = new AuthState(), action: AuthAction){

    const newState = {...currentState}; 

    switch(action.type){
        case AuthActionTypes.Login:
            const token = action.payload;
            newState.token = token;
            const container: { name:string, clientType: string} = jwtDecode(token);
            newState.clientType = container.clientType;
            newState.name = container.name;
            localStorage.token = token;
        break;

        case AuthActionTypes.Logout:
            newState.token = null;
            newState.name = null;
            newState.clientType = null;
            localStorage.removeItem("token");
        break;
    }

    return newState;
}

export const authStore = createStore(authReducer);