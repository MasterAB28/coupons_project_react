import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Customer from "../../../../Models/Customer";
import AdminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./CustomerDetails.css";

function CustomerDetails(): JSX.Element {
    const [customer,setCustomer]=useState<Customer>();
    const id:number=+useParams().cusId;
    useEffect(()=>{
        new AdminService().getCustomer(id)
        .then(c=>setCustomer(c))
        .catch(error=>notificationService.error(error))
    },[])
    return (
        <div className="CustomerDetails">
			<h1>{(customer?.firstName)} {customer?.lastName}</h1><br/>
            <h2>{customer?.email}</h2>
        </div>
    );
}

export default CustomerDetails;
