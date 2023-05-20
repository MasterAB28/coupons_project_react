import { useForm } from "react-hook-form";
import "./AddCoupon.css";
import Coupon from "../../../Models/Coupon";
import { useNavigate } from "react-router-dom";
import CompanyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import Categroies from "../../../Models/Categories";

function AddCoupon(): JSX.Element {
    const {register, handleSubmit , formState} = useForm <Coupon>();
    const navigate = useNavigate();

    const categories = Object.values(Categroies).filter((v)=> isNaN(Number(v    )))

    function sendCoupon(coupon: Coupon){
        coupon.image = null;
        new CompanyService().addCoupon(coupon)
        .then(newCoupon =>{
            notificationService.success("Coupon Added");
            navigate("/coupons")
        })
        .catch(err=> notificationService.error(err))
    }

    return (
        <div className="AddCoupon">
			<form onSubmit={handleSubmit(sendCoupon)}>
            <h2>Add New Coupon:</h2>              
             <select id="category"  {...register("category", {
                 required: { value: true, message: "category is required" }
                })}>
            <option disabled={true} hidden value="">Select a caategory</option>
            {categories.map((value,key)=> <option key={key}>{value}</option>)}
            </select><br/>
            <span>{formState.errors?.price?.message}</span><br/>
            <input type="text" placeholder=" title " {...register("title", {
                required: {value:true, message:"title is requierd"}
            })} /><br/> 
            <span>{formState.errors?.price?.message}</span><br/>
            <input type="text" placeholder=" description " {...register("description",{
                required:{value:true,message:"description is required"}
            })} /><br/>
            <span>{formState.errors?.price?.message}</span><br/>
            <input type="date" placeholder="start-date" {...register("startDate",{
                required:{value: true, message:"start date is required"}
            })} /><br/>
            <span>{formState.errors?.price?.message}</span><br/>
            <input type="date" placeholder="end-date"{...register("endDate",{
                required:{value:true, message:"End date is required"}
            })} /><br/>
            <span>{formState.errors?.price?.message}</span><br/>
            <input type="number" placeholder="amount"{...register("amount",{
            required:{value:true,message:"requierd field!"},
            min:{value:1,message:"Amount must be above 0"}
            })} /><br/>
            <span>{formState.errors?.amount?.message}</span><br/>
            <input type="number" placeholder="price"{...register("price",{
            required:{value:true,message:"requierd field!"},
            min:{value:0,message:"Price must be above than 0"}
            })} /><br/>
            <span>{formState.errors?.price?.message}</span><br/>
                          
            <input type="file" {...register("image")} /><br/>
            <input type="submit" value="Add Coupon" /><br/>
            </form>
        </div>
    );
}

export default AddCoupon;
