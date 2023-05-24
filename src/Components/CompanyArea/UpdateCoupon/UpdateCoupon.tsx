import "./UpdateCoupon.css";
import {useForm} from "react-hook-form";
import Coupon from "../../../Models/Coupon";
import {useNavigate, useParams} from "react-router-dom";
import React, {SetStateAction, useEffect, useState} from "react";
import CompanyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import Categories from "../../../Models/Categories";


function UpdateCoupon(): JSX.Element {
    const {register, handleSubmit, formState, setValue} = useForm<Coupon>();
    const id:number =+ useParams().copId;
    const navigate = useNavigate();
    const [base64image, setImage] = useState<string>('');
    const categories = Object.values(Categories).filter((v)=> isNaN(Number(v    )))
    const [value, setValue1] = useState("");
    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setValue1(e.target.value);
    };

    useEffect(()=> {
        new CompanyService().getCoupon(id)
            .then(c=>{
                setValue("company",c.company)
                setValue("category",c.category)
                setValue("title",c.title)
                setValue("description",c.description)
                setValue("startDate",c.startDate)
                setValue("endDate",c.endDate)
                setValue("amount",c.amount)
                setValue("price",c.price)
                setValue("image",c.image)
            }).catch(err=> notificationService.error(err))
        },[])

    function sendCoupon(coupon:Coupon){
        coupon.id = id;
        if (base64image != '') {
            coupon.image = base64image;
        }
        new CompanyService().updateCoupon(coupon)
            .then(newCop=>{
                notificationService.success("coupon "+newCop.title + " updated!")
            }).catch(err=> notificationService.error(err))
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
        <div className="UpdateCoupon">
            <form onSubmit={handleSubmit(sendCoupon)}>
                <h2>Update Coupon:</h2>
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
                <input type="submit" value="Update Coupon" /><br/>
            </form>
        </div>
    );
}

export default UpdateCoupon;
