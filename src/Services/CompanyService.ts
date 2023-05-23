import { addCoupon, companyDetails, companyStore, deleteCoupon, fetchCoupons, updateCoupon } from "../Store/CompanyState";
import Coupon from "../Models/Coupon";
import axios from "axios";
import Company from "../Models/Company";

class CompanyService{
    public async getAllCompanyCoupons(){
        if(companyStore.getState().coupons.length == 0){
            const response = (await axios.get<Coupon[]>("http://localhost:8080/company/coupon")).data;
            companyStore.dispatch(fetchCoupons(response));
            return response;
        }
        return companyStore.getState().coupons;
    }
    public async addCoupon(coupon:Coupon){
        const response = (await axios.post<Coupon>("http://localhost:8080/company/coupon",coupon)).data;
        companyStore.dispatch(addCoupon(response));
        return response;
    }
    public async updateCoupon(coupon:Coupon){
        const response = (await axios.put<Coupon>("http://localhost:8080/company/coupon",coupon)).data;
        companyStore.dispatch(updateCoupon(response));
        return response;
    }
    public async deleteCoupon(id:number){
        const response = (await axios.delete<Coupon>("http://localhost:8080/company/coupon/"+id)).data;
        companyStore.dispatch(deleteCoupon(id));
        return response;
    }
    public async getCoupon(id:number){

    }
    public async companyDetails(){
        if(companyStore.getState().company === undefined){
            const response = (await axios.get<Company>("http://localhost:8080/company/details")).data;
            companyStore.dispatch(companyDetails(response))
            return response;
        }
        return companyStore.getState().company;
    }
}
export default CompanyService;