import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Company from "../../../../Models/Company";
import AdminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./AddCompany.css";
import {Button, Card, Form} from "react-bootstrap";

function AddCompany(): JSX.Element {
    const {register, handleSubmit,formState}=useForm<Company>();
    const navigate=useNavigate();
    function sendCompany(company:Company){
       new AdminService().addCompany(company)
       .then(newComp=>{
        notificationService.success("Company added!");
        navigate("/company/"+newComp.id);
       } )
       .catch(err=>{
        notificationService.error(err);
       })
    }
    return (
        <div className="AddCompany">
				<Form onSubmit={handleSubmit(sendCompany)}>
                    <Card>
                <h3>Add new Company</h3>
                <Form.Control type="text"placeholder="Enter name here"{...register("name",{
                    required:{value:true,message:"You must enter name"}
                })} />
                    {formState.errors?.name?.message && <><span>{formState.errors?.name?.message}</span></>}
                <Form.Control type="email" placeholder="Enter email here"{...register("email",{
                    required:{value:true,message:"You must enter email"}
                })} />
                    { formState.errors?.email?.message && <><span>{formState.errors?.email?.message}</span></>}
                <Form.Control type="password" placeholder="Enter password here"{...register("password",{
                    required:{value:true,message:"You must enter password"}
                })} />
                    {formState.errors?.password?.message && <><span>{formState.errors?.password?.message}</span></>}
                <Button variant={"primary"} type="submit">Add Company</Button>
                    </Card>
            </Form>
        </div>
    );
}

export default AddCompany;
