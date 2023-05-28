import { NavLink, useNavigate } from "react-router-dom";
import Customer from "../../../../Models/Customer";
import "./CustomerCard.css";
import AdminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import { error } from "console";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {authStore} from "../../../../Store/AuthState";

interface CustomerProps{
    customer : Customer
}
function CustomerCard(props: CustomerProps): JSX.Element {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    function deleteCustomer(){
        new AdminService().deleteCustomer(props?.customer?.id)
        .then(()=>{
            handleClose();
            notificationService.success("Customer deleted!");
            window.location.reload();
        })
        .catch(error => notificationService.error(error))
    }
    function updateCustomer(){
        navigate("/customer/edit/"+props?.customer?.id)
    }
    return (
        <div className="CustomerCard box">
            {authStore.getState().clientType === "Customer" && <h4>{(props?.customer?.firstName)+ " " + (props?.customer?.lastName)}</h4>}
            {authStore.getState().clientType ==="Administrator" &&
            <NavLink to={"/customer/"+props?.customer?.id}>
			<h3>Name: {(props?.customer?.firstName)+ " " + (props?.customer?.lastName)}</h3>
            </NavLink>
            }
            <p>Email: {props?.customer?.email}</p>
            <p>Password: {props?.customer?.password}</p>
            <p>coupons: {props?.customer?.coupons.map( c=> c.title)} </p>
            {authStore.getState().clientType === "Administrator" &&<> <Button variant="danger" onClick={handleShow}>DELETE</Button>
                <Button variant="warning" onClick={updateCustomer}>EDIT</Button>

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
                </Modal></>}
        </div>
    );
}

export default CustomerCard;
