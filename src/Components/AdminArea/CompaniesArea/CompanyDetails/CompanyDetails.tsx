import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Company from "../../../../Models/Company";
import AdminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./CompanyDetails.css";

function CompanyDetails(): JSX.Element {
    const [company,setCompany]=useState<Company>();
    const id:number=+useParams().compId;
    useEffect(()=>{
        new AdminService().getCompany(id)
        .then(c=>setCompany(c))
        .catch(error=>notificationService.error(error))
    },[])
    return (
        <div className="CompanyDetails">
			<h1>{company?.name}</h1><br/>
            <h2>{company?.email}</h2>
        </div>
    );
}

export default CompanyDetails;
