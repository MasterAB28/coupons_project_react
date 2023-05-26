import { createStore } from "redux";
import Coupon from "../Models/Coupon";
import Company from "../Models/Company";

// 1. the state - array of CompanyCoupons and Company
export class CompanyState{
    public coupons: Coupon[]=[];
    public company: Company;
}
// 2. a list of Action Types
export enum CompanyActionTypes{
    FetchCoupons, AddCoupon, DeleteCoupon,UpdateCoupon,CompanyDetails
}
// 3. wrapper for Action and Value
export interface CompanyAction{
    type:CompanyActionTypes,
    payload:any
}

// 4. helper functions to create above interface instances
export function fetchCoupons(coupons:Coupon[]){
    return{type:CompanyActionTypes.FetchCoupons,payload:coupons}
}
export function addCoupon(coupon:Coupon){
    return{type:CompanyActionTypes.AddCoupon,payload:coupon}
}
export function updateCoupon(coupon:Coupon){
    return{type:CompanyActionTypes.UpdateCoupon,payload:coupon}
}
export function deleteCoupon(id:number){
    return {type:CompanyActionTypes.DeleteCoupon,payload:id}
}
export function companyDetails(company:Company){
    return {type:CompanyActionTypes.CompanyDetails,payload:company}
}

// 5. Reducer - the logic for each Action
function companyReducer(currentState=new CompanyState(),action:CompanyAction){
    const newState={...currentState};// copy the state to a new instance
    switch(action.type){
        case CompanyActionTypes.FetchCoupons:
            newState.coupons=action.payload;
            break;
        case CompanyActionTypes.AddCoupon:
            newState.coupons.push(action.payload);
            break;
        case CompanyActionTypes.UpdateCoupon:
            const coupId=action.payload.id;
            const coupIndex=newState.coupons.findIndex(c=>c.id===coupId);
            if(coupIndex>=0)
                newState.coupons[coupIndex]=action.payload;
            break;
        case CompanyActionTypes.DeleteCoupon:
            const id=action.payload; // payload is number
            const index=newState.coupons.findIndex(c=>c.id===id);
            if (index>=0)
                    newState.coupons.splice(index,1);
            break;
        case CompanyActionTypes.CompanyDetails:
            newState.company = action.payload;
            break;
    }
    return newState;
}
export const companyStore = createStore(companyReducer);