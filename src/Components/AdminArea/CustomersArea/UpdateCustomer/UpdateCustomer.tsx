import { useEffect, useState } from "react";
import Customer from "../../../../Models/Customer";
import "./UpdateCustomer.css";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import AdminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";

function UpdateCustomer(): JSX.Element {
    const {register, handleSubmit, formState, setValue} = useForm<Customer>();
    const id:number=+useParams().cusId;
    const [customer,setCustomer]=useState<Customer>();
    const navigate = useNavigate();
    
    useEffect(()=>{
        new AdminService().getCustomer(id)
        .then(c=> {
            setValue("firstName", c.firstName);
            setValue("lastName", c.lastName)
            setValue("email", c.email);
            setValue("password", c.password);
            setValue("coupons", c.coupons);
        }).catch(error=>notificationService.error(error))
    })
    function sendCustomer(customer:Customer){
        customer.id = id;
        new AdminService().updateCustomer(customer)
        .then(newComp=>{
            notificationService.success("customer update");
            navigate("/customer/"+newComp.id)
        })
        .catch(error=> notificationService.error(error))
    }
    
    return (
        <div className="UpdateCustomer">
			<form onSubmit={handleSubmit(sendCustomer)}>
                <h2>Update customer:</h2>
                <input type="text" placeholder="Enter first name here" {...register("firstName",{
                    required:{value:true, message:"you must enter first name"},
                    minLength: {value:2, message:"You must entet at least 2 characters"}
                })}/><br/>{}
                <span>{formState.errors?.firstName?.message}</span><br/>
                <input type="text" placeholder="Enter last name here" {...register("lastName",{
                    required:{value:true, message:"you must enter last name"},
                    minLength: {value:2, message:"You must entet at least 2 characters"}
                })}/><br/>{}
                <span>{formState.errors?.lastName?.message}</span><br/>
                <input type={"email"} placeholder="Enter email here" {...register("email",{
                    required:{value:true , message:"you must enter email"}
                })}/><br/>{}
                <span>{formState.errors?.email?.message}</span><br/>
                <input type={"password"} placeholder="Enter password here" {...register("password",{
                    required:{value:true,message:"You must enter password"}
                })}/><br/>{}
                <span>{formState.errors?.password?.message}</span>
                <input type="submit" value="update"/>
            </form>
        </div>
    );
}

export default UpdateCustomer;
