import { createStore } from "redux";
import Customer from "../Models/Customer";
import Company from "../Models/Company";

// 1. the state - array of Customers and Companies
export class AdminState{
    public customers: Customer[]=[];
    public companies: Company[]=[];
}
// 2. a list of Action Types
export enum AdminActionTypes{
    FetchCustomers, AddCustomer, DeleteCustomer,UpdateCustomer, FetchCompanies, AddCompany, DeleteCompany,UpdateCompany
}
// 3. wrapper for Action and Value
export interface AdminAction{
    type:AdminActionTypes,
    payload:any
}
// 4. helper functions to create above interface instances
export function fetchCustomers(customers:Customer[]){
    return{type:AdminActionTypes.FetchCustomers,payload:customers}
}
export function addCus(customer:Customer){
    return{type:AdminActionTypes.AddCustomer,payload:customer}
}
export function updateCustomer(customer:Customer){
    return{type:AdminActionTypes.UpdateCustomer,payload:customer}
}
export function deleteCustomer(id:number){
    return {type:AdminActionTypes.DeleteCustomer,payload:id}
}
export function fetchCompanies(companies:Company[]){
    return{type:AdminActionTypes.FetchCompanies,payload:companies}
}
export function AddCompany(company:Company){
    return{type:AdminActionTypes.AddCompany,payload:company}
}
export function updateCompany(company:Company){
    return{type:AdminActionTypes.UpdateCompany,payload:company}
}
export function deleteCompany(id:number){
    return {type:AdminActionTypes.DeleteCompany,payload:id}
}
// 5. Reducer - the logic for each Action
function adminReducer(currentState=new AdminState(),action:AdminAction){
    const newState={...currentState};// copy the state to a new instance
    switch(action.type){
        case AdminActionTypes.FetchCustomers:
            newState.customers=action.payload;
            break;
        case AdminActionTypes.AddCustomer:
            newState.customers.push(action.payload);
            break;
        case AdminActionTypes.UpdateCustomer:
            const custId=action.payload.id;
            const cusIndex=newState.customers.findIndex(c=>c.id==custId);
            if(cusIndex>=0)
                    newState.customers[cusIndex]=action.payload;
            break;
        case AdminActionTypes.DeleteCustomer:
            const customerId=action.payload; // payload is number
            const customeIndex=newState.customers.findIndex(c=>c.id==customerId);
            if (customeIndex>=0)
                    newState.customers.splice(customeIndex,1);
            break;
        case AdminActionTypes.FetchCompanies:
            newState.companies=action.payload;
            break;
        case AdminActionTypes.AddCompany:
            newState.companies.push(action.payload);
            break;
        case AdminActionTypes.UpdateCompany:
            const compId=action.payload.id;
            const compIndex=newState.companies.findIndex(c=>c.id==compId);
            if(compIndex>=0)
                    newState.companies[compIndex]=action.payload;
            break;
        case AdminActionTypes.DeleteCompany:
            const comoanyId=action.payload; // payload is number
            const companyIndex=newState.companies.findIndex(c=>c.id==comoanyId);
            if (companyIndex>=0)
                    newState.companies.splice(companyIndex,1);
            break;
        
    }
    return newState;
}
export const adminStore = createStore(adminReducer);