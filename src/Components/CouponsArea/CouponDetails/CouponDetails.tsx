import "./CouponDetails.css";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import CompanyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import Coupon from "../../../Models/Coupon";
import CouponCard from "../CouponCard/CouponCard";

function CouponDetails(): JSX.Element {
    const [coupon, setCoupon] = useState<Coupon>();
    const id:number =+ useParams().copId;

    useEffect(()=>{
        new CompanyService().getCoupon(id)
            .then(c=>setCoupon(c))
            .catch(err=> notificationService.error(err))
    },[id])
    return (
        <div className="CouponDetails">
            <CouponCard coupon={coupon}/>
        </div>
    );
}

export default CouponDetails;
