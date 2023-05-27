import { useForm } from "react-hook-form";
import "./AddCoupon.css";
import Coupon from "../../../Models/Coupon";
import { useNavigate } from "react-router-dom";
import CompanyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import Categories from "../../../Models/Categories";
import React, {SetStateAction, useState} from "react";

function AddCoupon(): JSX.Element {
    const {register, handleSubmit , formState} = useForm <Coupon>();
    const navigate = useNavigate();
    const [base64image, setImage] = useState<string>('');
    const categories = Object.values(Categories).filter((v)=> isNaN(Number(v    )))

    const [value, setValue] = useState("");
    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setValue(e.target.value);
    };

    function sendCoupon(coupon: Coupon){
        coupon.image = base64image;
        new CompanyService().addCoupon(coupon)
        .then(newCoupon =>{
            notificationService.success("Coupon " + newCoupon.title + " added!");
            navigate("/company/coupons")
        })
        .catch(err=> notificationService.error(err))
    }
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const toBase64 = (file: File) => new Promise<string|ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        toBase64(event.target.files[0]).then(base64 => setImage(base64 as string))
    }

    return (
        <div className="AddCoupon">
			<form onSubmit={handleSubmit(sendCoupon)}>
            <h2>Add New Coupon:</h2>              
             <select id="category" defaultValue={value} onChange={handleChange}  {...register("category", {
                 required: { value: true, message: "category is required" }
                })}>
            <option disabled={true} hidden value="">Select a category</option>
            {categories.map((value,key)=> <option key={key}>{value}</option>)}
            </select><br/>
            <span>{formState.errors?.price?.message}</span><br/>
            <input type="text" placeholder=" title " {...register("title", {
                required: {value:true, message:"title is required"}
            })} /><br/> 
            <span>{formState.errors?.price?.message}</span><br/>
            <input type="text" placeholder=" description " {...register("description",{
                required:{value:true,message:"description is required"}
            })} /><br/>
            <span>{formState.errors?.price?.message}</span><br/>
            <input type="date" placeholder="start-date" {...register("startDate",{
                required:{value: true, message:"start date is required"}
            })} min={getCurrentDate()} /><br/>
            <span>{formState.errors?.price?.message}</span><br/>
            <input type="date" placeholder="end-date"{...register("endDate",{
                required:{value:true, message:"End date is required"},
            })} min={getCurrentDate()}/><br/>
            <span>{formState.errors?.price?.message}</span><br/>
            <input type="number" placeholder="amount"{...register("amount",{
            required:{value:true,message:"required field!"},
            min:{value:1,message:"Amount must be above 0"}
            })} /><br/>
            <span>{formState.errors?.amount?.message}</span><br/>
            <input type="number" placeholder="price"{...register("price",{
            required:{value:true,message:"required field!"},
            min:{value:0,message:"Price must be above than 0"}
            })} /><br/>
            <span>{formState.errors?.price?.message}</span><br/>
            <input type="file" id="image" name="image" accept="image/*" onChange={handleFileChange}/><br/>
            <input type="submit" value="Add Coupon" /><br/>
            </form>
        </div>
    );
}

export default AddCoupon;
