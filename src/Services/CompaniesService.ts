import axios from "axios";
import { AddCompany, adminStore, deleteCompany, fetchCompanies, updateCompany } from "../Store/AdminState";
import Company from "../Models/Company";

class CompaniesServices{
    public async getAllCustomers(){
        if(adminStore.getState().customers.length == 0){
            const response = await axios.get<Company[]>('http://localhost:8080/admin/companies');
            adminStore.dispatch(fetchCompanies(response.data));
            return response.data;
        }
        return adminStore.getState().customers;
    }
    public async getCustomer(id: number){
        const response = (await axios.get<Company>('http://localhost:8080/admin/company/'+id)).data
        return response;
    }
    public async addCustomer(company:Company){
        const response = (await axios.post<Company>('http://localhost:8080/admin/company',company)).data;
        adminStore.dispatch(AddCompany(response));
        return response;
    }
    public async updateCustomer(company:Company){
        const response = (await axios.put<Company>('http://localhost:8080/admin/company',company)).data;
        adminStore.dispatch(updateCompany(response));
        return response;
    }
    public async deleteCustomer(id: number){
        const response = (await axios.delete('http://localhost:8080/admin/company/'+ id)).data;
        adminStore.dispatch(deleteCompany(id));
        return response;
    }


}
export default CompaniesServices;