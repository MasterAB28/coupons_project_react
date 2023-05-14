import { NavLink, useNavigate } from "react-router-dom";
import Customer from "../../../../Models/Customer";
import "./CustomerCard.css";
import AdminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import { error } from "console";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface CustomerProps{
    customer : Customer
}
function CustomerCard(props: CustomerProps): JSX.Element {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function deleteCustomer(){
        new AdminService().deleteCustomer(props.customer.id)
        .then(()=>{
            handleClose();
            notificationService.success("Customer deleted!");
            window.location.reload();
        })
        .catch(error => notificationService.error(error))
    }
    return (
        <div className="CustomerCard">
            <NavLink to={"/customer/"+props.customer.id}>
			<h4>Name: {(props.customer.firstName)+ " " + (props.customer.lastName)}</h4>
            </NavLink>
            <p>Email: {props.customer.email}</p>
            <p>Password: {props.customer.password}</p>
            <p>coupons: {props.customer.coupons?.map( c=> c.title)} </p>
            <Button variant="danger" onClick={handleShow}>DELETE</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Warning!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete {(props?.customer?.firstName)+ " " + (props?.customer?.lastName)}</Modal.Body>
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

export default CustomerCard;
