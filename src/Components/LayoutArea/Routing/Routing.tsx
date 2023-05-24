import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../../HomeArea/Home/Home";
import "./Routing.css";
import PageNotFound from "../PageNotFound/PageNotFound";
import Login from "../../AuthArea/Login/Login";
import Customers from "../../AdminArea/CustomersArea/Customers/Customers";
import Companies from "../../AdminArea/CompaniesArea/Companies/Companies";
import AddCustomer from "../../AdminArea/CustomersArea/AddCustomer/AddCustomer";
import AddCompany from "../../AdminArea/CompaniesArea/AddCompany/AddCompany";
import CustomerDetails from "../../AdminArea/CustomersArea/CustomerDetails/CustomerDetails";
import CompanyDetails from "../../AdminArea/CompaniesArea/CompanyDetails/CompanyDetails";
import UpdateCustomer from "../../AdminArea/CustomersArea/UpdateCustomer/UpdateCustomer";
import Coupons from "../../CompanyArea/Coupons/Coupons";
import AddCoupon from "../../CompanyArea/AddCoupon/AddCoupon";
import UpdateCompany from "../../AdminArea/CompaniesArea/UpdateCompay/UpdateCompany";
import UpdateCoupon from "../../CompanyArea/UpdateCoupon/UpdateCoupon";
import DetailsOfCompanyLogin from "../../CompanyArea/DetailsOfCompanyLogin/DetailsOfCompanyLogin";
import CouponDetails from "../../CompanyArea/CouponDetails/CouponDetails";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/home" element={<Home/>}/> 
                <Route path="/login" element={<Login />} />
                <Route path="/customers" element={<Customers/>} />
                <Route path="/customer/add" element={<AddCustomer/>}/>
                <Route path="/customer/:cusId" element={<CustomerDetails/>}/>
                <Route path="/customer/edit/:cusId" element={<UpdateCustomer/>}/>
                <Route path="/companies" element={<Companies/>} />
                <Route path="/company/add" element={<AddCompany/>}/>
                <Route path="/company/:compId" element={<CompanyDetails/>}/>
                <Route path="/company/edit/:compId" element={<UpdateCompany/>}/>
                <Route path="/coupons" element={<Coupons/>}/>
                <Route path="/coupon/add" element={<AddCoupon/>}/>
                <Route path="/coupon/edit/:copId" element={<UpdateCoupon/>}/>
                <Route path="/coupons/:copId" element={<CouponDetails/>}/>
                <Route path={"/companyDetails"} element={<DetailsOfCompanyLogin/>}/>
                <Route path="/" element={<Navigate to="/home"/>} />
                <Route path="*" element={<PageNotFound/>} />
            </Routes>
			
        </div>
    );
}

export default Routing;
