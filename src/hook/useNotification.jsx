import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// to make notifacction to any componente
const notify = (msg, type) => {
    if (type === "warning") {
      toast.warn(msg);
    } else if (type === "success") {
      toast.success(msg);
    } else {
      toast.error(msg);
    }
  };

 export default notify; 