import "./UpdateCoupon.css";
import {useForm} from "react-hook-form";
import Coupon from "../../../Models/Coupon";
import {useNavigate, useParams} from "react-router-dom";
import React, {SetStateAction, useEffect, useState} from "react";
import CompanyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import Categories from "../../../Models/Categories";
import {Button, Card, Form} from "react-bootstrap";


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
            <Form onSubmit={handleSubmit(sendCoupon)}>
                <Card>
                    <h2>Update coupon:</h2>
                    <select className={"form-select"} id="category" defaultValue={value} onChange={handleChange}  {...register("category", {
                        required: { value: true, message: "You must enter category" }
                    })}>
                        <option disabled={true} hidden value="">Select a category</option>
                        {categories.map((value,key)=> <option key={key}>{value}</option>)}
                    </select>
                    {formState.errors?.category?.message && <><p>{formState.errors?.category?.message}</p></>}
                    <Form.Control type="text" placeholder="Title" {...register("title", {
                        required: {value:true, message:"You must enter title"}
                    })} />
                    {formState.errors?.title?.message && <><span>{formState.errors?.title?.message}</span></>}
                    <Form.Control type="text" placeholder="Description" {...register("description",{
                        required:{value:true,message:"You must enter description"}
                    })} />
                    {formState.errors?.description?.message && <><span>{formState.errors?.description?.message}</span></>}
                    <Form.Control type="date" placeholder="Start-date" {...register("startDate",{
                        required:{value: true, message:"You must enter start date"}
                    })} min={getCurrentDate()} />
                    {formState.errors?.startDate?.message && <><span>{formState.errors?.endDate?.message}</span></>}
                    <Form.Control type="date" placeholder="End-date"{...register("endDate",{
                        required:{value:true, message:"You must enter end date"},
                    })} min={getCurrentDate()}/>
                    {formState.errors?.endDate?.message && <><span>{formState.errors?.endDate?.message}</span></>}
                    <Form.Control type="number" placeholder="Amount"{...register("amount",{
                        required:{value:true,message:"You must enter amount"},
                        min:{value:1,message:"Amount must be above 0"}
                    })} />
                    {formState.errors?.amount?.message && <><span>{formState.errors?.amount?.message}</span></>}
                    <Form.Control type="number" placeholder="Price"{...register("price",{
                        required:{value:true,message:"You must enter price"},
                        min:{value:0,message:"Price must be above than 0"}
                    })} />
                    {formState.errors?.price?.message && <><span>{formState.errors?.price?.message}</span></>}
                    <Form.Control type="file" id="image" name="image" accept="image/*" onChange={handleFileChange}/>
                    <Button variant={"primary"} type="submit">Update coupon</Button>
                </Card>
            </Form>
        </div>
    );
}

export default UpdateCoupon;
