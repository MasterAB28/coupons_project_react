import "./DetailsOfCompanyLogin.css";
import CompanyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import {useEffect, useState} from "react";
import Company from "../../../Models/Company";
import CompanyCard from "../../AdminArea/CompaniesArea/CompanyCard/CompanyCard";



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
            {<CompanyCard key={company?.id} company={company}/>}
        </div>
    );
}

export default DetailsOfCompanyLogin;
