import { NavLink, useNavigate } from "react-router-dom";
import Company from "../../../../Models/Company";
import "./CompanyCard.css";
import AdminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {authStore} from "../../../../Store/AuthState";

interface CompanyProp{
    company : Company;
}
function CompanyCard(props: CompanyProp): JSX.Element {
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    function deleteCompany(){
        new AdminService().deleteCompany(props.company?.id)
        .then(()=>{
            handleClose();
            notificationService.success("Company deleted!");
            window.location.reload();
        })
        .catch(error => notificationService.error(error))
    }
    function updateCompany(){
        navigate("/company/edit/" + props.company?.id);
    }
    return (
        <div className="CompanyCard box">
            <NavLink to={"/company/"+props.company?.id}>
			<h3> {props.company?.name}<br/></h3>
            </NavLink>
            <p>email: {props.company?.email}<br/></p>
            <p>password: {props.company?.password}</p>
            {authStore.getState().clientType === "Administrator" && <>
            <Button variant="danger" onClick={handleShow}>DELETE</Button>
            <Button variant="warning" onClick={updateCompany}>EDIT</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Warning!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete {props?.company?.name}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
                <Button variant="primary" onClick={deleteCompany}>
                    YES
                </Button>
                </Modal.Footer>
      </Modal></>
}
        </div>
    );
}

export default CompanyCard;
