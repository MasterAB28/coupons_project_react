import "./CustomerCoupons.css";
import {useEffect, useState} from "react";
import Coupon from "../../../Models/Coupon";
import CustomerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import CouponCard from "../../CouponsArea/CouponCard/CouponCard";

function CustomerCoupons(): JSX.Element {
    const [getCustomerCoupon, setCustomerCoupons] = useState<Coupon[]>([])

    useEffect(()=>{
        new CustomerService().getCustomerCoupons()
            .then(coupons=> {
                setCustomerCoupons(coupons)
            })
            .catch(err=> notificationService.error(err))
    })

    return (
        <div className="CustomerCoupons">
            <h4>Your Coupons:</h4><br/>
            {getCustomerCoupon.map(c=> <CouponCard key={c.id} coupon={c}/>)}
        </div>
    );
}

export default CustomerCoupons;
