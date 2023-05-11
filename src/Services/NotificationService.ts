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
        } else {                                          
            toast.error(err.message);
        }        
        
    }

}
const notificationService = new NotificationService();
export default notificationService;