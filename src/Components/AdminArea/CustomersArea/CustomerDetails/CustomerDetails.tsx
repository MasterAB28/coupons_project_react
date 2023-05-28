import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Customer from "../../../../Models/Customer";
import AdminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./CustomerDetails.css";
import { Button, Modal } from "react-bootstrap";

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
			<h4>Name: {customer?.firstName} {customer?.lastName}</h4><br/>
            Email: {customer?.email}<br/>
            Password: {customer?.password}<br/>
            Coupons: {customer?.coupons?.length === 0 && <>The customer has not bought any coupons yet<br/></>}
            {customer?.coupons?.length > 0 && <>{customer?.coupons?.map(c=> c.title)}<br/></>}

            <Button variant="danger" onClick={handleShow}>DELETE</Button>
            <Button variant="warning" onClick={updateCustomer}>EDIT</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Warning!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete {customer?.firstName} {customer?.lastName}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
                <Button variant="primary" onClick={deleteCustomer}>
                    YES
                </Button>
                </Modal.Footer>
      </Modal>
        </div>
        
    );
}

export default CustomerDetails;
