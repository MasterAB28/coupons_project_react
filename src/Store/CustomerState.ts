import Coupon from "../Models/Coupon";
import Customer from "../Models/Customer"
import Company from "../Models/Company";
import {createStore} from "redux";
import {CompanyActionTypes, CompanyState} from "./CompanyState";
import customer from "../Models/Customer";

// 1. the state - array of CompanyCoupons and Company
export class CustomerState{
    public coupons: Coupon[]=[];
    public customer: Customer;
    public customerCoupons: Coupon[]=[];
}
// 2. a list of Action Types
export enum CustomerActionTypes{
    FetchCoupons,GetCustomerCoupons, PurchaseCoupon, DeletePurchaseCoupon, CustomerDetails
}
// 3. wrapper for Action and Value
export interface CustomerAction{
    type:CustomerActionTypes,
    payload:any
}

// 4. helper functions to create above interface instances
export function fetchCoupons(coupons:Coupon[]){
    return{type:CustomerActionTypes.FetchCoupons,payload:coupons}
}
export function getCustomerCoupons(coupons:Coupon[]){
    return{type:CustomerActionTypes.GetCustomerCoupons,payload:coupons}
}
export function purchaseCoupon(coupon:Coupon){
    return{type:CustomerActionTypes.PurchaseCoupon,payload:coupon}
}

export function deletePurchaseCoupon(id:number){
    return {type:CustomerActionTypes.DeletePurchaseCoupon,payload:id}
}
export function customerDetails(customer:Customer){
    return {type:CustomerActionTypes.CustomerDetails,payload:customer}
}

// 5. Reducer - the logic for each Action
function couponReducer(currentState=new CustomerState(),action:CustomerAction){
    const newState={...currentState};// copy the state to a new instance
    switch(action.type){
        case CustomerActionTypes.FetchCoupons:
            newState.coupons=action.payload;
            break;
        case CustomerActionTypes.GetCustomerCoupons:
            newState.customerCoupons = action.payload;
            break;
        case CustomerActionTypes.PurchaseCoupon:
            newState.customerCoupons.push(action.payload);
            break;
        case CustomerActionTypes.DeletePurchaseCoupon:
            const id=action.payload; // payload is number
            const index = newState.customerCoupons.findIndex(c=>c.id===id);
            if (index>=0)
                newState.customerCoupons.splice(index,1);
            break;
        case CustomerActionTypes.CustomerDetails:
            newState.customer = action.payload;
            break;
    }
    return newState;
}
export const customerStore = createStore(couponReducer);