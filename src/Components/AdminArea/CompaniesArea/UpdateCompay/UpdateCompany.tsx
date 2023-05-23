import { Form, useNavigate, useParams } from "react-router-dom";
import "./UpdateCompany.css";
import { useEffect, useState } from "react";
import Company from "../../../../Models/Company";
import AdminService from "../../../../Services/AdminService";
import { useForm } from "react-hook-form";
import notificationService from "../../../../Services/NotificationService";

function UpdateCompany(): JSX.Element {

    const {register, handleSubmit, formState, setValue} = useForm<Company>();
    const id:number=+useParams().compId;
    const navigate = useNavigate();
    
    useEffect(()=>{
        new AdminService().getCompany(id)
        .then(c=> {
            setValue("name", c.name);
            setValue("email", c.email);
            setValue("password", c.password);
        })
    },[])
    function sendCompany(company:Company){
        company.id = id;
        new AdminService().updateCompany(company)
        .then(newComp=>{
            notificationService.success("Company update");
            navigate("/company/"+newComp.id)
        })
        .catch(error=> notificationService.error(error))
    }
    
    return (
        <div className="UpdateCompany">
				<form onSubmit={handleSubmit(sendCompany)}>
                <h2>Update Company:</h2>
                <input type="text"  disabled {...register("name")} /><br/>
                <input type="email"   {...register("email", {
                required:{value: true, message:"You must enter email"}
                })} /><br/> 
                <input type="password"  placeholder="Enter password here" {...register("password", {
                            required:{ value:true, message: "You must enter password"}
                        })} /><br/>
                <span>{formState.errors?.password?.message}</span><br/>
                <input type="submit" value="Update" />
            </form>
        </div>
    );
}

export default UpdateCompany;
