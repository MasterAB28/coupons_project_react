import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Company from "../../../../Models/Company";
import AdminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./CompanyDetails.css";
import { Button, Modal } from "react-bootstrap";

function CompanyDetails(): JSX.Element {
    const [company,setCompany]=useState<Company>();
    const id:number=+useParams().compId;
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    function deleteCompany(){
        new AdminService().deleteCompany(id)
        .then(()=>{
            handleClose();
            notificationService.success("Customer deleted!");
            navigate("/companies")
        })
        .catch(error => notificationService.error(error))
    }
    function updateCompany(){
        navigate("/company/edit/" + id);
    }
    useEffect(()=>{
        new AdminService().getCompany(id)
        .then(c=>setCompany(c))
        .catch(error=>notificationService.error(error))
    },[])
    return (
        <div className="CompanyDetails">
			<h1>{company?.name}</h1><br/>
            <h2>{company?.email}</h2>
            <Button variant="danger" onClick={handleShow}>DELETE</Button>
            <Button variant="warning" onClick={updateCompany}>EDIT</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Warning!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete {company?.name}</Modal.Body>
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

export default CompanyDetails;
