import { NavLink } from "react-router-dom";
import Customer from "../../../../Models/Customer";
import "./CustomerCard.css";

interface CustomerProps{
    customer : Customer
}
function CustomerCard(props: CustomerProps): JSX.Element {
    return (
        <div className="CustomerCard">
            <NavLink to={"/customer/"+props.customer.id}>
			<h4>Name: {(props.customer.firstName)+ " " + (props.customer.lastName)}</h4>
            </NavLink>
            <p>Email: {props.customer.email}</p>
            <p>Password: {props.customer.password}</p>
            <p>coupons: {props.customer.coupons?.map( c=> c.title)} </p>
        </div>
    );
}

export default CustomerCard;
