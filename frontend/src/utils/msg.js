import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Function to show success toast
export const successMSG = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 3000,        // closes after 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

// Optional: error toast
export const errorMSG = (msg) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
