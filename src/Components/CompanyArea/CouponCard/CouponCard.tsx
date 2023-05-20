import Coupon from "../../../Models/Coupon";
import "./CouponCard.css";
interface CouponProp{
    coupon : Coupon;
}

function CouponCard(props : CouponProp): JSX.Element {
    return (
        <div className="CouponCard">
			{props.coupon.title}
            
        </div>
    );
}

export default CouponCard;
