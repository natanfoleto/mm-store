import { toast } from 'react-toastify'

export default function toastify(type, message) {
  const styleInfo = {
    background: '#003464'
  }

  const styleWarn = {
    color: '#333',
    background: '#FFF951'
  }

  switch (type) {
    case 'default':
      toast(message, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true
      });
      break;

    case 'info':
      toast.info(message, {
        style: styleInfo,
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      break;

    case 'warn':
      toast.warn(message, {
        style: styleWarn,
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      break;

    case 'success':
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true
      });
      break;

    case 'error':
      toast.dark(message, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true
      });
      break;

    default:
      break;
  }
}