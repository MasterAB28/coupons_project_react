import { NavLink, useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import { authStore } from "../../../Store/AuthState";
import { useEffect, useState } from "react";
import notificationService from "../../../Services/NotificationService";
import "./AuthMenu.css";
import {Button} from "react-bootstrap";


function AuthMenu(): JSX.Element {
    const navigate = useNavigate();
    const [token, setToken] = useState<string>();

    useEffect(()=>{
        setToken(authStore.getState().token);
        const unsubscribe = authStore.subscribe(()=>{
            setToken(authStore.getState().token);
        })

        return ()=>{
            unsubscribe();
        }
    }, []);

    function logout(){
        authService.logout().then(
            ()=>{
                navigate("/login");
            }
        ).catch(error=> notificationService.error(error));
    }
    const {pathname} = window.location;


    return (
        <div className="AuthMenu">
            {!token && pathname !== "/login" &&
                   <> <NavLink to={"/login"}><Button variant={"primary"}>Login</Button></NavLink> </>|| token &&
                <div>
                    Hello {authStore.getState().name}
                    <Button variant={"light"} className={"logout"} onClick={logout}>Logout</Button></div> }

        </div>
    );
        }


export default AuthMenu;
