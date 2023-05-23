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
                <h1>Add new Company</h1>
                <input type="text"placeholder="Enter name here"{...register("name",{
                    required:{value:true,message:"Required field"}
                })} /><br/>
                <span>{formState.errors?.name?.message}</span><br />
                <input type="text" placeholder="Enter email here"{...register("email",{
                    required:{value:true,message:"Required field"}
                })} /> <br />
                <span>{formState.errors?.email?.message}</span><br />
                <input type="text" placeholder="Enter password here"{...register("password",{
                    required:{value:true,message:"Required field"}
                })} /><br/>
                <span>{formState.errors?.password?.message}</span><br />
                <button name="add" type="submit">Add Company</button>

            </form>
        </div>
    );
}

export default AddCompany;
