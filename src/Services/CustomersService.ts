import axios from "axios";
import { addCustomer, adminStore, deleteCustomer, fetchCustomers, updateCustomer } from "../Store/AdminState";
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
    public async getCustomer(id: number){
        const response = (await axios.get<Customer>('http://localhost:8080/admin/customer/'+id)).data
        return response;
    }
    public async addCustomer(customer:Customer){
        const response = (await axios.post<Customer>('http://localhost:8080/admin/customer',customer)).data;
        adminStore.dispatch(addCustomer(response));
        return response;
    }
    public async updateCustomer(customer:Customer){
        const response = (await axios.put<Customer>('http://localhost:8080/admin/customer',customer)).data;
        adminStore.dispatch(updateCustomer(response));
        return response;
    }
    public async deleteCustomer(id: number){
        const response = (await axios.delete('http://localhost:8080/admin/customer/'+ id)).data;
        adminStore.dispatch(deleteCustomer(id));
        return response;
    }


}
export default CustomersService;