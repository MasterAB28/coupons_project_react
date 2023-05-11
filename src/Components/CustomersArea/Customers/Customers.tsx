import { useEffect, useState } from "react";
import "./Customers.css";
import Customer from "../../../Models/Customer";
import CustomersService from "../../../Services/CustomersService";
import { error } from "console";
import notificationService from "../../../Services/NotificationService";
import CustomerCard from "../CustomerCard/CustomerCard";

function Customers(): JSX.Element {
    
    const [getCustomers, setCustomers] = useState<Customer[]>([])
    useEffect(()=>{
        const  customersService = new CustomersService();
        customersService.getAllCustomers()
        .then( (customers)=>{
            setCustomers(customers)
        } )
        .catch (error => notificationService.error(error))
    })

    return (
        <div className="Customers">
			{getCustomers.map(c=> <CustomerCard key={c.id} customer={c} />)}
        </div>
    );
}

export default Customers;
