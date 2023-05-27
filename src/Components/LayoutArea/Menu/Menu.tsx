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
        return ()=>{
            unsubscribe();
        }
    },[])
    return (
        <div className="Menu">
			<NavLink to="/home">Home</NavLink>
            { authStore.getState().token && authStore.getState().clientType === "Administrator" && <>
                    <NavLink to="/customers">Customers</NavLink>
                    <NavLink to="/companies">Companies</NavLink>
                </> }
            { authStore.getState().token && authStore.getState().clientType === "Company" && <>
                    <NavLink to={"/company/coupons"}>Your Coupons</NavLink>
                    <NavLink to={"/companyDetails"}>Your details</NavLink>
                </>}
            { authStore.getState().token && authStore.getState().clientType === "Customer" &&<>
                <NavLink to={"/coupons"}>Our Coupons</NavLink>
                <NavLink to={"/customerCoupons"}>Your coupons</NavLink>
                <NavLink to={"/customerDetails"}>Your details</NavLink>
            </>}

                
        </div>
    );
}

export default Menu;
