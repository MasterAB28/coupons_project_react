import { useForm } from "react-hook-form";
import "./AddCustomer.css";
import Customer from "../../../../Models/Customer";
import { useNavigate } from "react-router-dom";
import AdminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import {Button, Card, Form} from "react-bootstrap";

function AddCustomer(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<Customer>();
    const navigate = useNavigate();

    function sendCustomer(customer:Customer){
        new AdminService().addCustomer(customer)
         .then(newCus=>{
            notificationService.success("Customer added!");
            navigate("/customer/"+newCus.id);
         })
         .catch(error=> notificationService.error(error))
    }

    return (
        <div className="AddCustomer">
			<Form onSubmit={handleSubmit(sendCustomer)}>
                <Card>
                <h2>Add new customer</h2>
                <Form.Control type="text" placeholder="Enter first name here" {...register("firstName",{
                    required:{value:true, message:"you must enter first name"},
                    minLength: {value:2, message:"You must enter at least 2 characters"}
                })}/>
                {formState.errors?.firstName?.message && <><span>{formState.errors?.firstName?.message}</span></>}
                <Form.Control type="text" placeholder="Enter last name here" {...register("lastName",{
                    required:{value:true, message:"you must enter last name"},
                    minLength: {value:2, message:"You must enter at least 2 characters"}
                })}/>
                {formState.errors?.lastName?.message && <> <span>{formState.errors?.lastName?.message}</span></>}
                <Form.Control type={"email"} placeholder="Enter email here" {...register("email",{
                    required:{value:true , message:"you must enter email"}
                })}/>
                {formState.errors?.email?.message && <><span>{formState.errors?.email?.message}</span></>}
                <Form.Control type={"password"} placeholder="Enter password here" {...register("password",{
                    required:{value:true,message:"You must enter password"}
                })}/>
                {formState.errors?.password?.message && <><span>{formState.errors?.password?.message}</span> </>}
                <Button variant={"primary"} type={"submit"} >Add Customer</Button>
                </Card>
            </Form>
        </div>
    );
}

export default AddCustomer;
