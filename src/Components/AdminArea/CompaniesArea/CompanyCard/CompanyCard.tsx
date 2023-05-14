import { NavLink } from "react-router-dom";
import Company from "../../../../Models/Company";
import "./CompanyCard.css";
import AdminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface CompanyProp{
    company : Company;
}
function CompanyCard(props: CompanyProp): JSX.Element {
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function deleteCompany(){
        new AdminService().deleteCompany(props.company.id)
        .then(()=>{
            handleClose();
            notificationService.success("Customer deleted!");
            window.location.reload();
        })
        .catch(error => notificationService.error(error))
    }
    return (
        <div className="CompanyCard">
            <NavLink to={"/company/"+props.company.id}>
			<h4>name: {props.company.name}<br/></h4>
            </NavLink>
            <p>email: {props.company.email}<br/></p>
            <p>password: {props.company.password}</p>
            <Button variant="danger" onClick={handleShow}>DELETE</Button>

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
      </Modal>
        </div>
    );
}

export default CompanyCard;
