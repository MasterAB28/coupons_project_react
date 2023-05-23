import Coupon from "../../../Models/Coupon";
import "./CouponCard.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import notificationService from "../../../Services/NotificationService";
import CompanyService from "../../../Services/CompanyService";
import {Button, Modal} from "react-bootstrap";
interface CouponProp{
    coupon : Coupon;
}


function CouponCard(props : CouponProp): JSX.Element {
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    function deleteCoupon(){
        new CompanyService().deleteCoupon(props.coupon.id)
            .then(()=>{
                handleClose();
                notificationService.success("coupon deleted!");
                window.location.reload();
            })
            .catch(error => notificationService.error(error))
    }
    function updateCoupon(){
        navigate("/coupon/edit/" + props.coupon.id);
    }
    return (
        <div className="CouponCard">
			{props.coupon.title}<br/>
            <Button variant="danger" onClick={handleShow}>DELETE</Button>
            <Button variant="warning" onClick={updateCoupon}>EDIT</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete {props?.coupon?.title}</Modal.Body>
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

export default CouponCard;
