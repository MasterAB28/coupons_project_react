import { useEffect, useState } from "react";
import "./Customers.css";
import { error } from "console";
import AdminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import Customer from "../../../../Models/Customer";
import CustomerCard from "../CustomerCard/CustomerCard";
import { NavLink } from "react-router-dom";

function Customers(): JSX.Element {
    
    const [getCustomers, setCustomers] = useState<Customer[]>([])
    useEffect(()=>{
        const  adminService = new AdminService();
        adminService.getAllCustomers()
        .then( (customers)=>{
            setCustomers(customers)
        } )
        .catch (error => notificationService.error(error))
    })
   

    return (
        <div className="Customers">
            <div className="addBtn">
                <NavLink to={"/customer/add"}>
                    <button>Add new customer </button>
                </NavLink>
            </div>
			{getCustomers.map(c=> <CustomerCard key={c.id} customer={c} />)}
        </div>
    );
}

export default Customers;
