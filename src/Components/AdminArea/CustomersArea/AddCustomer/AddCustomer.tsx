import { useForm } from "react-hook-form";
import "./AddCustomer.css";
import Customer from "../../../../Models/Customer";
import { Form, useNavigate } from "react-router-dom";
import AdminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import { error } from "console";

function AddCustomer(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<Customer>();
    const navigate = useNavigate();

    function sendCustomer(customer:Customer){
        customer.coupons = [];
        new AdminService().addCustomer(customer)
         .then(newCus=>{
            notificationService.success("Customer added!");
            navigate("/customer"+newCus.id)
         })
         .catch(error=> notificationService.error(error))
    }

    return (
        <div className="AddCustomer">
			<Form onSubmit={handleSubmit(sendCustomer)}>
                <h2>Add new customer</h2>
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
                
            </Form>
        </div>
    );
}

export default AddCustomer;
