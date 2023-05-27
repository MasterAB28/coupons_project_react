import "./CouponDetails.css";
import {useEffect, useState} from "react";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import CompanyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import Coupon from "../../../Models/Coupon";
import {Modal} from "react-bootstrap";

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
                navigate("/company/coupons")
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
            <h3>{coupon?.title}</h3>
            Description: {coupon?.description}<br/>
            Start date: {coupon?.startDate.toString()}<br/>
            End date: {coupon?.endDate.toString()}<br/>
            Price: {coupon?.price}<br/>
            Amount: {coupon?.amount}<br/>

            {coupon?.image &&<><img src={coupon?.image} alt={coupon?.title} /><br/></> }
            {!coupon?.image && <> <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'} alt={coupon?.title} /><br/></>}
            <button onClick={handleShow}>DELETE</button>
            <button onClick={updateCoupon}>EDIT</button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete {coupon?.title}</Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose}>
                        No
                    </button>
                    <button onClick={deleteCoupon}>
                        YES
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CouponDetails;
