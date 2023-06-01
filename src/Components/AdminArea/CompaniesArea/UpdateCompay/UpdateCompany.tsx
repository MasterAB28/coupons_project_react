import { useNavigate, useParams } from "react-router-dom";
import "./UpdateCompany.css";
import { useEffect } from "react";
import Company from "../../../../Models/Company";
import AdminService from "../../../../Services/AdminService";
import { useForm } from "react-hook-form";
import notificationService from "../../../../Services/NotificationService";
import {Button, Card, Form} from "react-bootstrap";

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
				<Form onSubmit={handleSubmit(sendCompany)}>
                    <Card>
                <h2>Update Company:</h2>
                <Form.Control type="text"  disabled {...register("name")} />
                <Form.Control type="email"   {...register("email", {
                required:{value: true, message:"You must enter email"}
                })} />
                    { formState.errors?.email?.message && <><span>{formState.errors?.email?.message}</span><br/></>}
                <Form.Control type="password"  placeholder="Enter password here" {...register("password", {
                            required:{ value:true, message: "You must enter password"}
                        })} />
                    {formState.errors?.password?.message && <><span>{formState.errors?.password?.message}</span><br/></>}
                <Button variant={"primary"} type="submit" >Update company</Button >
                    </Card>
            </Form>
        </div>
    );
}

export default UpdateCompany;
