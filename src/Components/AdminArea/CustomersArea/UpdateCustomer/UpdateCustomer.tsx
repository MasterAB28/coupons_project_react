import { useEffect, useState } from "react";
import Customer from "../../../../Models/Customer";
import "./UpdateCustomer.css";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import AdminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import {Button, Card, Form} from "react-bootstrap";

function UpdateCustomer(): JSX.Element {
    const {register, handleSubmit, formState, setValue} = useForm<Customer>();
    const id:number=+useParams().cusId;
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
    },[])
    function sendCustomer(customer:Customer){
        customer.id = id;
        new AdminService().updateCustomer(customer)
        .then(newCus=>{
            notificationService.success("customer update");
            navigate("/customer/"+newCus.id)
        })
        .catch(error=> notificationService.error(error))
    }
    
    return (
        <div className="UpdateCustomer">
			<Form onSubmit={handleSubmit(sendCustomer)}>
                <Card>
                <h2>Update customer:</h2>
                <Form.Control type="text" placeholder="Enter first name here" {...register("firstName",{
                    required:{value:true, message:"you must enter first name"},
                    minLength: {value:2, message:"You must enter at least 2 characters"}
                })}/>
                {formState.errors?.firstName?.message && <><span>{formState.errors?.firstName?.message}</span><br/></>}
                <Form.Control type="text" placeholder="Enter last name here" {...register("lastName",{
                    required:{value:true, message:"you must enter last name"},
                    minLength: {value:2, message:"You must enter at least 2 characters"}
                })}/>
                {formState.errors?.lastName?.message && <> <span>{formState.errors?.lastName?.message}</span><br/> </>}
                <Form.Control type={"email"} placeholder="Enter email here" {...register("email",{
                    required:{value:true , message:"you must enter email"}
                })}/>
                {formState.errors?.email?.message && <><span>{formState.errors?.email?.message}</span><br/></>}
                <Form.Control type={"password"} placeholder="Enter password here" {...register("password",{
                    required:{value:true,message:"You must enter password"}
                })}/>
                {formState.errors?.password?.message && <><span>{formState.errors?.password?.message}</span><br/> </>}
                    <Button variant={"primary"} type="submit" >Update customer</Button>
                </Card>
            </Form>
        </div>
    );
}

export default UpdateCustomer;
