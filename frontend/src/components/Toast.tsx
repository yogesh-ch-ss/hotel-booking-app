import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    // useEffect starts working from the moment this component is rendered, and changes only when there is a change in the dependency
    // call onClose after 5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    // cleanup function - returned by resetting the timer
    return () => {
      clearTimeout(timer);
    };

    // this effect (useEffect) will run only when there is a change on onClose function
  }, [onClose]);

  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md"
      : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md";

  return (
    <div className={styles}>
      <div className="flex, justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
