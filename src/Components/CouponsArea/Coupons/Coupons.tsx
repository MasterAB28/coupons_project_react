import "./Coupons.css";
import React, {SetStateAction, useEffect, useState} from "react";
import Coupon from "../../../Models/Coupon";
import CustomerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import CouponCard from "../CouponCard/CouponCard";
import Categories from "../../../Models/Categories";
import {Button} from "react-bootstrap";

function Coupons(): JSX.Element {
    const [getCoupons, setCoupons] = useState<Coupon[]>([]);
    const options = ["All","Category", "Max Price"]
    const [value, setValue] = useState("All");
    const [category,setCategory] = useState("")
    const categories = Object.values(Categories).filter((v)=> isNaN(Number(v)))
    const [num,setNum] = useState(0);
    const [maxPriceCoupons,setMaxPriceCoupons] = useState<Coupon[]>([]);
    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setValue(e.target.value);
    };
    const categoryChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setCategory(e.target.value);
    };



    useEffect(()=>{
        new CustomerService().getAllCoupons()
            .then(coupons=>{
                setCoupons(coupons);
            })
            .catch(err => notificationService.error(err))
    })
    const categoryCoupons = getCoupons.filter(c=> c.category === category);
    useEffect(()=>{
        setMaxPriceCoupons(getCoupons.filter(c=> c.price < num))
    },[])
    return (
        <div className="Coupons">
            <select defaultValue={value} onChange={handleChange}>
                {options.map((value,key)=> <option key={key}>{value}</option>)}
            </select>
            {value === "Category" && <select id="category" defaultValue={category} onChange={categoryChange}>
                <option disabled={true} hidden value="">Select a category</option>
                {categories.map((value,key)=> <option key={key}>{value}</option>)}
            </select>}

            {value === "Max Price" &&<> <input id={"PriceInput"} placeholder={"Enter max price"} type={"number"} min={0} required={true} /></>}

            {value==="All" && getCoupons.map((c=> <CouponCard key={c.id} coupon={c}/>))}
            {value === "Category" && categoryCoupons.map(c=> <CouponCard key={c.id} coupon={c}/>)}
            {value === "Max Price" && maxPriceCoupons.map((c=> <CouponCard key={c.id} coupon={c}/>))}
        </div>
    );
}

export default Coupons;
