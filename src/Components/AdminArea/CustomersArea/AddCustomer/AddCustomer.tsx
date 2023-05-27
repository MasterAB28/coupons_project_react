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
        new AdminService().addCustomer(customer)
         .then(newCus=>{
            notificationService.success("Customer added!");
            navigate("/customer/"+newCus.id);
         })
         .catch(error=> notificationService.error(error))
    }

    return (
        <div className="AddCustomer">
			<form onSubmit={handleSubmit(sendCustomer)}>
                <h2>Add new customer</h2>
                <input type="text" placeholder="Enter first name here" {...register("firstName",{
                    required:{value:true, message:"you must enter first name"},
                    minLength: {value:2, message:"You must enter at least 2 characters"}
                })}/><br/>{}
                {formState.errors?.firstName?.message && <><span>{formState.errors?.firstName?.message}</span><br/></>}
                <input type="text" placeholder="Enter last name here" {...register("lastName",{
                    required:{value:true, message:"you must enter last name"},
                    minLength: {value:2, message:"You must enter at least 2 characters"}
                })}/><br/>{}
                {formState.errors?.lastName?.message && <> <span>{formState.errors?.lastName?.message}</span><br/> </>}
                <input type={"email"} placeholder="Enter email here" {...register("email",{
                    required:{value:true , message:"you must enter email"}
                })}/><br/>{}
                {formState.errors?.email?.message && <><span>{formState.errors?.email?.message}</span><br/></>}
                <input type={"password"} placeholder="Enter password here" {...register("password",{
                    required:{value:true,message:"You must enter password"}
                })}/><br/>{}
                {formState.errors?.password?.message && <><span>{formState.errors?.password?.message}</span><br/> </>}
                <input type={"submit"} value="Add"/>
            </form>
        </div>
    );
}

export default AddCustomer;
