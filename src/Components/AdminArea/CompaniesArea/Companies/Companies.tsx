import { useEffect, useState } from "react";
import "./Companies.css";
import Company from "../../../../Models/Company";
import AdminService from "../../../../Services/AdminService";
import notificationService from "../../../../Services/NotificationService";
import CompanyCard from "../CompanyCard/CompanyCard";
import { NavLink, Navigate } from "react-router-dom";
import {Button} from "react-bootstrap";

function Companies(): JSX.Element {
    
    const [getCompanies, setCompanies] = useState<Company[]>([])
    useEffect(()=>{
        const  adminService = new AdminService();
        adminService.getAllCompanies()
        .then( (companies)=>{
            setCompanies(companies)
        } )
        .catch (error => notificationService.error(error))
    },[])
    return (
        <div className="Companies">
            <div className="addBtn">
                <NavLink to={"/company/add"}>
                    <Button variant={"primary"}>Add new Company </Button>
                </NavLink>
            </div>
			{getCompanies.map(c =><CompanyCard key={c.id} company={c}/>)}
        </div>
    );
}

export default Companies;
