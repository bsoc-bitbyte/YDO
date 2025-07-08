import { toast } from 'react-toastify';
import ToastContent from './ToastContent';

const useCustomToast = () => {
  const showToast = (type, message) => {
    toast(<ToastContent type={type} message={message} />, {
      toastClassName: ({type}) => `toast-shell ${type}-toast`,
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      closeButton: false,
});


  };

  return { showToast };
};

export default useCustomToast;
