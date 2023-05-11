import axios from "axios";
import { adminStore, fetchCustomers } from "../Store/AdminState";
import Customer from "../Models/Customer";

class CustomersService{
    public async getAllCustomers(){
        if(adminStore.getState().customers.length == 0){
            const response = await axios.get<Customer[]>('http://localhost:8080/admin/customers');
            adminStore.dispatch(fetchCustomers(response.data));
            return response.data;
        }
        return adminStore.getState().customers;
    }

}
export default CustomersService;