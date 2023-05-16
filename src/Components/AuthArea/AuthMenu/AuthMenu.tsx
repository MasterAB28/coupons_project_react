import { NavLink, useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import { authStore } from "../../../Store/AuthState";
import { useEffect, useState } from "react";
import notificationService from "../../../Services/NotificationService";


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
    

    return (
        <div className="AuthMenu">
            {
                !token && 
                <>
                    <NavLink to={"/login"}>Login</NavLink>
                </> ||
                <>
                    Hello {authStore.getState().name} <button onClick={logout}>Logout</button> 
                </>
            }
			
        </div>
    );
        }


export default AuthMenu;
