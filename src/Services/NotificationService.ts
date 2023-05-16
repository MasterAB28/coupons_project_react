import { wait } from '@testing-library/user-event/dist/utils';
import { ToastContainer, toast } from 'react-toastify';
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
            wait(3000)
                if (err.response.status == 401){
                    localStorage.removeItem('token');
                    window.location.href = '/login';
            }} else {                                          
            toast.error(err.message);
        }        
        
    }

}
const notificationService = new NotificationService();
export default notificationService;