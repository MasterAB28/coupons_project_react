import "./CustomerData.css";
import {useEffect, useState} from "react";
import Customer from "../../../Models/Customer";
import CustomerService from "../../../Services/CustomerService";
import customer from "../../../Models/Customer";
import notificationService from "../../../Services/NotificationService";
import CustomerCard from "../../AdminArea/CustomersArea/CustomerCard/CustomerCard";

function CustomerData(): JSX.Element {
    const [getCustomer,setCustomer] = useState<Customer>();

    useEffect(()=>{
        new CustomerService().getCustomerDetails()
            .then(customer=> {
                setCustomer(customer)
            })
            .catch(err=> notificationService.error(err))
    })
    return (
        <div className="CustomerData">
            {<CustomerCard  customer={getCustomer}/>}
        </div>
    );
}

export default CustomerData;
