import { addCoupon, companyDetails, companyStore, deleteCoupon, fetchCoupons, updateCoupon } from "../Store/CompanyState";
import Coupon from "../Models/Coupon";
import axios from "axios";
import Company from "../Models/Company";

class CompanyService{
    public async getAllCompanyCoupons(){
        if(companyStore.getState().coupons.length == 0){
            const respone = (await axios.get<Coupon[]>("http://localhost:8080/company/coupon")).data;
            companyStore.dispatch(fetchCoupons(respone));
            return respone;
        }
        return companyStore.getState().coupons;
    }
    public async addCoupon(coupon:Coupon){
        const respone = (await axios.post<Coupon>("http://localhost:8080/company/coupon",coupon)).data;
        companyStore.dispatch(addCoupon(respone));
        return respone;
    }
    public async updateCoupon(coupon:Coupon){
        const respone = (await axios.put<Coupon>("http://localhost:8080/company/coupon",coupon)).data;
        companyStore.dispatch(updateCoupon(respone));
        return respone;
    }
    public async deleteCoupon(id:number){
        const respone = (await axios.delete<Coupon>("http://localhost:8080/company/coupon"+id)).data;
        companyStore.dispatch(deleteCoupon(id));
        return respone;
    }
    public async compnayDetails(){
        if(companyStore.getState().company === undefined){
            const respone = (await axios.get<Company>("http://localhost:8080/company/details")).data;
            companyStore.dispatch(companyDetails(respone))
            return respone;
        }
        return companyStore.getState().company;
    }
}
export default CompanyService;