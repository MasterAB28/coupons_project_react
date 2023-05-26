import "./CouponDetails.css";
import {useEffect, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import CompanyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import Coupon from "../../../Models/Coupon";
import {Button, Modal} from "react-bootstrap";

function CouponDetails(): JSX.Element {
    const [coupon, setCoupon] = useState<Coupon>();
    const id:number =+ useParams().copId;
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();


    function deleteCoupon(){
        new CompanyService().deleteCoupon(id)
            .then(()=>{
                handleClose();
                notificationService.success("coupon deleted!");
                window.location.reload();
            })
            .catch(error => notificationService.error(error))
    }
    function updateCoupon(){
        navigate("/coupon/edit/" + id);
    }
    useEffect(()=>{
        new CompanyService().getCoupon(id)
            .then(c=>setCoupon(c))
            .catch(err=> notificationService.error(err))
    },[])
    return (
        <div className="CouponDetails">
            <NavLink to={"/coupons/"+coupon?.id}>
                {coupon?.title}<br/>
            </NavLink>
            <img src={coupon?.image} alt={coupon?.title} /><br/>
            <Button variant="danger" onClick={handleShow}>DELETE</Button>
            <Button variant="warning" onClick={updateCoupon}>EDIT</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete {coupon?.title}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={deleteCoupon}>
                        YES
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CouponDetails;
