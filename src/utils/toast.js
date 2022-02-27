import toast from "react-hot-toast";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

const notify = (message, type = "success") => {
  const typeMapping = {
    success: {
      callback: toast.success,
      icon: <AiFillCheckCircle color="#00B152" size={20} className="py-0 my-0"/>,
      colors: ["#00E46A", "#00B152"],
    },
    error: {
      callback: toast.error,
      icon: <AiFillCloseCircle color="rgb(249, 68, 9)" size={20} className="py-0 my-0"/>,
      colors: ["#F94400", "#c73500"],
    },
  };

  typeMapping[type].callback(
      <p>{message}</p>,
    {
      duration: 3000,
      position: "bottom-right",
      className: `toast-container toast-${type}`,
      icon: typeMapping[type].icon,
    }
  );
};

export default notify;