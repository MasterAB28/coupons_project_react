import {
    customerDetails,
    customerStore,
    deletePurchaseCoupon,
    fetchCoupons,
    getCustomerCoupons,
    purchaseCoupon
} from "../Store/CustomerState";
import axios from "axios";
import Coupon from "../Models/Coupon";
import {companyStore} from "../Store/CompanyState";
import Company from "../Models/Company";
import Customer from "../Models/Customer";

class CustomerService{
    public async getAllCoupons(){
            const response = (await axios.get<Coupon[]>("http://localhost:8080/customer/coupons")).data;
            customerStore.dispatch(fetchCoupons(response))
            return response;
    }
    public async getCustomerCoupons(){
            const response = (await axios.get<Coupon[]>("http://localhost:8080/customer/coupon")).data;
            customerStore.dispatch(getCustomerCoupons(response));
            return response;
    }
    public async purchaseCoupon(coupon:Coupon){
        const response = (await axios.post<Coupon>("http://localhost:8080/customer/coupon",coupon)).data;
        customerStore.dispatch(purchaseCoupon(coupon))
        return response;
    }
    public async deletePurchaseCoupon(coupon:Coupon){
        const response = (await axios.delete<Coupon>("http://localhost:8080/customer/coupon", {data: coupon})).data;
        customerStore.dispatch(deletePurchaseCoupon(coupon.id))
        return response;
    }
    public async getCustomerDetails(){
            const response = (await axios.get<Customer>("http://localhost:8080/customer/details")).data;
            customerStore.dispatch(customerDetails(response))
            return response;

    }
}
export default CustomerService;