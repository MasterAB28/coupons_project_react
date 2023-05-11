import { createStore } from "redux";
import Coupon from "../Models/Coupon";

// 1. the state - array of Coupons
export class CompanyState{
    public coupons: Coupon[]=[];
}
// 2. a list of Action Types
export enum CompanyActionTypes{
    FetchCoupons, AddCoupon, DeleteCoupon,UpdateCoupon,CompanyDetails
}
// 3. wrapper for Action and Value
export interface CouponsAction{
    type:CompanyActionTypes,
    payload:any
}
// 4. helper functions to create above interface instances
export function FetchCoupons(coupons:Coupon[]){
    return{type:CompanyActionTypes.FetchCoupons,payload:coupons}
}
export function AddCoupon(coupon:Coupon){
    return{type:CompanyActionTypes.AddCoupon,payload:coupon}
}
export function UpdateCoupon(coupon:Coupon){
    return{type:CompanyActionTypes.UpdateCoupon,payload:coupon}
}
export function DeleteCoupon(id:number){
    return {type:CompanyActionTypes.DeleteCoupon,payload:id}
}

// 5. Reducer - the logic for each Action
function couponReducer(currentState=new CompanyState(),action:CouponsAction){
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
            const coupIndex=newState.coupons.findIndex(c=>c.id==coupId);
            if(coupIndex>=0)
                newState.coupons[coupIndex]=action.payload;
            break;
        case CompanyActionTypes.DeleteCoupon:
            const id=action.payload; // payload is number
            const index=newState.coupons.findIndex(c=>c.id==id);
            if (index>=0)
                    newState.coupons.splice(index,1);
            break;
        
    }
    return newState;
}
export const couponsStore = createStore(couponReducer);