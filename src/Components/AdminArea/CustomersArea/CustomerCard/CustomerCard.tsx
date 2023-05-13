import Customer from "../../../../Models/Customer";
import "./CustomerCard.css";

interface CustomerProps{
    customer : Customer
}
function CustomerCard(props: CustomerProps): JSX.Element {
    return (
        <div className="CustomerCard">
			<h4>Name: {(props.customer.firstName)+ " " + (props.customer.lastName)}</h4>
            <p>Email: {props.customer.email}</p>
            <p>Password: {props.customer.password}</p>
            <p>coupons: {props.customer.coupons.map( c=> c.title)} </p>
        </div>
    );
}

export default CustomerCard;
