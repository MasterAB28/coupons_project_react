import { useForm } from "react-hook-form";
import authService from "../../../Services/AuthService";
import { authStore } from "../../../Store/AuthState";
import "./Login.css";
import LoginReq from "../../../Models/LoginReq";
import notificationService from "../../../Services/NotificationService";
import { useNavigate} from "react-router-dom";
import React, { SetStateAction, useState } from "react";
import {Button, Form, Card} from "react-bootstrap";


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
			 <Form onSubmit={handleSubmit(send)}>
                 <Card>
                <Form.Control type="email" id="email" placeholder="email" {...register("email", {
                    required: { value: true, message: "email is required" }
                })} />
                 {formState.errors?.email?.message && <span>{formState.errors?.email?.message}<br/></span>}
                <Form.Control type="password" id="password" placeholder="password"  {...register("password",
                {required:{value:true, message:"password is required"}
                })} />
                 {formState.errors?.password?.message && <span>{formState.errors?.password?.message}<br/></span>}
                <select className={"form-select"} id="clientType"  defaultValue={value} onChange={handleChange} {...register("clientType", {
                    required: { value: true, message: "clientType is required" }
                })}>
                    <option disabled={true} hidden value="">Select a clientType</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Company">Company</option>
                    <option value="Customer">Customer</option>
                </select>
                     {formState.errors?.clientType?.message && <span>{formState.errors?.clientType?.message}</span>}
                <Button variant={"primary"} name="login" type="submit">Login</Button>
                 </Card>
            </Form>
        </div>
    );
}

export default Login;
