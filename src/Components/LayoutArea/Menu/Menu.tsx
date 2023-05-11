import { NavLink } from "react-router-dom";
import "./Menu.css";
import { authStore } from "../../../Store/AuthState";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<NavLink to="/home">Home</NavLink><br/>
            {
                authStore.getState().token && authStore.getState().clientType == "Administrator" &&
                <><NavLink to="/customers">Customers</NavLink></>
            }
        </div>
    );
}

export default Menu;
