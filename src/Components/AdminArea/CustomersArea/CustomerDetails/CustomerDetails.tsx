import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Customer from "../../../../Models/Customer";
import AdminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./CustomerDetails.css";
import { Button, Modal } from "react-bootstrap";
import CustomerCard from "../CustomerCard/CustomerCard";

function CustomerDetails(): JSX.Element {
    const [customer,setCustomer]=useState<Customer>();
    const id:number=+useParams().cusId;
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        new AdminService().getCustomer(id)
        .then(c=>setCustomer(c))
        .catch(error=>notificationService.error(error))
    },[])
   
    function deleteCustomer(){
        new AdminService().deleteCustomer(id)
        .then(()=>{
            handleClose();
            notificationService.success("Customer deleted!");
            navigate("/customers")
        })
        .catch(error => notificationService.error(error))
    }
    function updateCustomer(){
        navigate("/customer/edit/"+id)
    }
    return (
        <div className="CustomerDetails">
            {<CustomerCard key={customer?.id} customer={customer}/>}
        </div>
        
    );
}

export default CustomerDetails;
