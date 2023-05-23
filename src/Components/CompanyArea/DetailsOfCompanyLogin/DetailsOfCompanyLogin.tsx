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
            {company?.name}
        </div>
    );
}

export default DetailsOfCompanyLogin;
