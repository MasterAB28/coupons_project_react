import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Company from "../../../../Models/Company";
import AdminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./AddCompany.css";

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
				<form onSubmit={handleSubmit(sendCompany)}>
                <h3>Add new Company</h3>
                <input type="text"placeholder="Enter name here"{...register("name",{
                    required:{value:true,message:"Required field"}
                })} /><br/>
                    {formState.errors?.name?.message && <><span>{formState.errors?.name?.message}</span><br/></>}
                <input type="email" placeholder="Enter email here"{...register("email",{
                    required:{value:true,message:"Required field"}
                })} /><br/>
                    { formState.errors?.email?.message && <><span>{formState.errors?.email?.message}</span><br/></>}
                <input type="password" placeholder="Enter password here"{...register("password",{
                    required:{value:true,message:"Required field"}
                })} /><br/>
                    {formState.errors?.password?.message && <><span>{formState.errors?.password?.message}</span><br/></>}
                <button name="add" type="submit">Add Company</button>

            </form>
        </div>
    );
}

export default AddCompany;
