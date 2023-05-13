import { NavLink } from "react-router-dom";
import "./Menu.css";
import { authStore } from "../../../Store/AuthState";
import { useEffect, useState } from "react";

function Menu(): JSX.Element {
    const [token, setToken] = useState<string>();
    useEffect(()=>{
        const unsubscribe = authStore.subscribe(()=>{
            setToken(authStore.getState().token)
        })
    },[])
    return (
        <div className="Menu">
			<NavLink to="/home">Home</NavLink><br/>
            { authStore.getState().token && authStore.getState().clientType == "Administrator" &&
                <><NavLink to="/customers">Customers</NavLink><br/></> }
                { authStore.getState().token && authStore.getState().clientType == "Administrator" &&
                <><NavLink to="/companies">Companies</NavLink></> }
        </div>
    );
}

export default Menu;
