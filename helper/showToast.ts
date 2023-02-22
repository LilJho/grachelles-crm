import { toast } from "react-toastify";

const showToast = (message: string) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 900,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export default showToast;
