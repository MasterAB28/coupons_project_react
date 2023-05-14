import axios from "axios";
import { AddCompany, addCustomer, adminStore, deleteCompany, deleteCustomer, fetchCompanies, fetchCustomers, updateCompany, updateCustomer } from "../Store/AdminState";
import Company from "../Models/Company";
import Customer from "../Models/Customer";

class AdminService{
    public async getAllCompanies(){
        if(adminStore.getState().companies.length == 0){
            const response = await axios.get<Company[]>('http://localhost:8080/admin/companies');
            adminStore.dispatch(fetchCompanies(response.data));
            return response.data;
        }
        return adminStore.getState().companies;
    }
    public async getCompany(id: number){
        const response = await (await axios.get<Company>('http://localhost:8080/admin/company/'+id)).data;
        return response;
    }
    
    public async addCompany(company:Company){
        const response = (await axios.post<Company>('http://localhost:8080/admin/company',company)).data;
        adminStore.dispatch(AddCompany(response));
        return response;
    }
    public async updateCompany(company:Company){
        const response = (await axios.put<Company>('http://localhost:8080/admin/company',company)).data;
        adminStore.dispatch(updateCompany(response));
        return response;
    }
    public async deleteCompany(id: number){
        const response = (await axios.delete('http://localhost:8080/admin/company/'+ id)).data;
        adminStore.dispatch(deleteCompany(id));
        return response;
    }
    public async getAllCustomers(){
        if(adminStore.getState().customers.length == 0){
            const response = await axios.get<Customer[]>('http://localhost:8080/admin/customers');
            adminStore.dispatch(fetchCustomers(response.data));
            return response.data;
        }
        return adminStore.getState().customers;
    }
    public async getCustomer(id: number){
        const response = await axios.get<Customer>('http://localhost:8080/admin/customer/'+id);
        return response.data;
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
export default AdminService;