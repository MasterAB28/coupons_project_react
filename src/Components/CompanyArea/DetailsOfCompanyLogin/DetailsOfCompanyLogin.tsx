import "./DetailsOfCompanyLogin.css";
import CompanyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import {useEffect, useState} from "react";
import Company from "../../../Models/Company";



function DetailsOfCompanyLogin(): JSX.Element {
    const [company,setCompany] = useState<Company>()

    useEffect(()=> {
        new CompanyService().companyDetails().then(
            comp=>{
                setCompany(comp)
            }
        ).catch(err=>notificationService.error(err))
    })
    return (
        <div className="DetailsOfCompanyLogin">
            <h4>Your company details:</h4>
            Name: {company?.name}<br/>
            Email: {company?.email}<br/>
            Password: {company?.password}
        </div>
    );
}

export default DetailsOfCompanyLogin;
