import { wait } from '@testing-library/user-event/dist/utils';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class NotificationService{
    
    public success(msg:string){
        toast.success(msg)
    }

    public error(err:any){
        if(typeof err == "string"){                           
            toast.error(err);
            } else if(err.response?.data){ 
            toast.error(err.response.data);
                if (err.response.status === 401){
                    localStorage.removeItem('token');
                    wait(2000).then(()=>{window.location.href = '/login'}).catch(err=>toast.error(err))
            }
        } else {                                          
            toast.error(err.message);
        }        
        
    }

}
const notificationService = new NotificationService();
export default notificationService;