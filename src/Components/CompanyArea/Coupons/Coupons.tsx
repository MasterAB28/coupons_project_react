import { useEffect, useState } from "react";
import "./Coupons.css";
import Coupon from "../../../Models/Coupon";
import CompanyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import CouponCard from "../CouponCard/CouponCard";
import { NavLink } from "react-router-dom";



function Coupons(): JSX.Element {
    const [getCoupons, setCoupons] = useState<Coupon[]>([]);

    useEffect(()=>{
    new CompanyService().getAllCompanyCoupons()
    .then((coupons)=>{
        setCoupons(coupons);
    })
    .catch(err=>(notificationService.error(err)))
    },[])

    return (
        <div className="Coupons">
            <div className="addBtn">
                <NavLink to={"/coupon/add"}>
                    <button>Add new Coupon </button>
                </NavLink>
            </div>
			{getCoupons.map(c=><CouponCard key={c.id} coupon={c}/>)}
        </div>
    );
}

export default Coupons;
