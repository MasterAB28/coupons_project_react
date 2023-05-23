import { useForm } from "react-hook-form";
import authService from "../../../Services/AuthService";
import { authStore } from "../../../Store/AuthState";
import "./Login.css";
import LoginReq from "../../../Models/LoginReq";
import notificationService from "../../../Services/NotificationService";
import { useNavigate  } from "react-router-dom";
import { SetStateAction, useState } from "react";


function Login(): JSX.Element {

    const {register, handleSubmit,formState} = useForm<LoginReq>();
    const navigate = useNavigate();
    const [value, setValue] = useState("");
    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setValue(e.target.value);
      };

    function send(LoginReq:LoginReq){
        authService.login(LoginReq).then(
            ()=>{notificationService.success("Welcome back " + authStore.getState().name);
            navigate("/home"); }
        ).catch(err => notificationService.error(err))
    }
    return (
        <div className="Login">
			 <form onSubmit={handleSubmit(send)}>   
                <label htmlFor="email"></label>
                <input type="email" id="email" placeholder="email" {...register("email", {
                    required: { value: true, message: "email is required" },
                })} />
                <br />
                <label htmlFor="password"></label>
                <input type="password" id="password" placeholder="password"  {...register("password",
                {required:{value:true, message:"password is required"} })} /><br/>{}
                <span>{formState.errors?.password?.message}</span><br/>
                <select id="clientType"  defaultValue={value} onChange={handleChange} {...register("clientType", {
                    required: { value: true, message: "clientType is required" }
                })}>
                    <option disabled={true} hidden value="">Select a clientType</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Company">Company</option>
                    <option value="Customer">Customer</option>
                </select>
                <br />
                <button name="login" type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
