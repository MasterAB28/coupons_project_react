import Coupon from "../../../Models/Coupon";
import "./CouponCard.css";
import {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import notificationService from "../../../Services/NotificationService";
import CompanyService from "../../../Services/CompanyService";
import {Button, Modal} from "react-bootstrap";
import { authStore } from "../../../Store/AuthState";
import CustomerService from "../../../Services/CustomerService";
import {customerStore, getCustomerCoupons} from "../../../Store/CustomerState";
import {wait} from "@testing-library/user-event/dist/utils";
interface CouponProp{
    coupon : Coupon;
}


function CouponCard(props : CouponProp): JSX.Element {
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const [refresh,setRefresh] = useState(true);

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
    const [customerCoupons , setCustomerCoupons] = useState<Coupon[]>([]);


    useEffect(()=>{
        if (authStore.getState().clientType === "Customer" && refresh){
            new CustomerService().getCustomerCoupons()
                .then(coupons => {
                    setCustomerCoupons(coupons)
                })
                .catch(err=> notificationService.error(err))
            setRefresh(false)
        }
    },[])
    function purchaseCoupon(){
        new CustomerService().purchaseCoupon(props.coupon)
            .then(()=>{
                notificationService.success("Purchase success");
                navigate("/customerCoupons");
            })
            .catch(err=>notificationService.error(err));
    }
    function deletePurchaseCoupon(){
        new CustomerService().deletePurchaseCoupon(props.coupon)
            .then(()=>{
                notificationService.success("Purchase delete success");
                setRefresh(true)
            })
            .catch(err=>notificationService.error(err));
    }
    return (
        <div className="CouponCard">
            <NavLink to={"/coupons/"+props.coupon.id}>
			{props.coupon.title}<br/>
            </NavLink>
            <img src={props.coupon.image} alt={props.coupon.title} /><br/>

            {authStore.getState().clientType === "Customer" && !customerCoupons.some(c=>c.id === props.coupon.id) && <>
                <Button variant={"success"} onClick={purchaseCoupon}>Purchase coupon</Button>
            </> ||
            customerCoupons.some(c=> c.id == props.coupon.id) &&
            <>
                <Button variant={"danger"} onClick={deletePurchaseCoupon}>Delete purchase</Button>
            </>}

            {authStore.getState().clientType === "Company" && <>
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
            </>}
        </div>
    );
}

export default CouponCard;
