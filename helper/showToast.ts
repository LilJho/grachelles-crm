import { toast } from "react-toastify";

const toastSuccess = (message: string) => {
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

const toastError = (message: string) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 1200,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export { toastSuccess, toastError };
