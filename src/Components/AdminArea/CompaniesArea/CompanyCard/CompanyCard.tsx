import Company from "../../../../Models/Company";
import "./CompanyCard.css";

interface CompanyProp{
    company : Company;
}
function CompanyCard(props: CompanyProp): JSX.Element {
    return (
        <div className="CompanyCard">
			<h4>name: {props.company.name}<br/></h4>
            <p>email: {props.company.email}<br/></p>
            <p>password: {props.company.password}</p>
        </div>
    );
}

export default CompanyCard;
