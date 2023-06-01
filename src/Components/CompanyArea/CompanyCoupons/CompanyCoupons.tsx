import React, {SetStateAction, useEffect, useState} from "react";
import "./CompanyCoupons.css";
import Coupon from "../../../Models/Coupon";
import CompanyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import CouponCard from "../../CouponsArea/CouponCard/CouponCard";
import { NavLink } from "react-router-dom";
import Categories from "../../../Models/Categories";
import {Button} from "react-bootstrap";



function CompanyCoupons(): JSX.Element {
    const [getCoupons, setCoupons] = useState<Coupon[]>([]);
    const options = ["All","Category", "Max Price"]
    const [value, setValue] = useState("All");
    const [category,setCategory] = useState("")
    const categories = Object.values(Categories).filter((v)=> isNaN(Number(v)))
    const [num,setNum] = useState(0);
    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setValue(e.target.value);
    };
    const categoryChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setCategory(e.target.value);
    };
    function numChange () {
        const e = document.getElementById("PriceInput") as HTMLInputElement;
        const input = parseInt(e.value,10);
        setNum(input);
    }

    useEffect(()=>{
    new CompanyService().getAllCompanyCoupons()
    .then((coupons)=>{
        setCoupons(coupons);
    })
    .catch(err=>(notificationService.error(err)))
    },[])

    const categoryCoupons = getCoupons.filter(c=> c.category === category);
    const maxPriceCoupons = getCoupons.filter(c=> c.price <= num)
    return (
        <div className="Coupons">
            Filter: <select defaultValue={value} onChange={handleChange}>
            {options.map((value,key)=> <option key={key}>{value}</option>)}
        </select>
            {value === "Category" &&<><br/>Category: <select id="category" defaultValue={category} onChange={categoryChange}>
                <option disabled={true} hidden value="">Select a category</option>
                {categories.map((value,key)=> <option key={key}>{value}</option>)}
            </select></>}
            {value === "Max Price" &&<><br/>Enter max price: <input id={"PriceInput"} placeholder={"Max price"} type={"number"} min={0}/>
                <Button variant={"info"}  type={"submit"} onClick={numChange}>Search</Button>
            </>}<br/>
                <NavLink  to={"/coupon/add"}>
                    <Button variant={"primary"} >Add new Coupon </Button>
                </NavLink><br/>

            {value==="All" && getCoupons.map((c=> <CouponCard key={c.id} coupon={c}/>))}
            {value === "Category" && categoryCoupons.map(c=> <CouponCard key={c.id} coupon={c}/>)}
            {value === "Max Price" && maxPriceCoupons.map((c=> <CouponCard key={c.id} coupon={c}/>))}
        </div>
    );
}

export default CompanyCoupons;
