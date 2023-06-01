    import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Company from "../../../../Models/Company";
import AdminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import "./CompanyDetails.css";
import { Button, Modal } from "react-bootstrap";
    import CompanyCard from "../CompanyCard/CompanyCard";

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
            {<CompanyCard key={company?.id} company={company}/>}
        </div>
    );
}

export default CompanyDetails;
