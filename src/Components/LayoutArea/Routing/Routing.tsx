import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import "./Routing.css";
import PageNotFound from "../PageNotFound/PageNotFound";
import Login from "../../AuthArea/Login/Login";
import Customers from "../../CustomersArea/Customers/Customers";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/home" element={<Home/>}/> 
                

                <Route path="/login" element={<Login />} />
                <Route path="/customers" element={<Customers/>} />
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="*" element={<PageNotFound/>} />
            </Routes>
			
        </div>
    );
}

export default Routing;
