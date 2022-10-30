import ReactDOM from "react-dom";

import styles from "./notification.module.css";

interface INotificationProps {
  title: string;
  message: string;
  status: string;
}

function Notification(props: INotificationProps) {
  const { title, message, status } = props;

  let statusClasses = "";

  if (status === "success") {
    statusClasses = styles.success;
  }

  if (status === "error") {
    statusClasses = styles.error;
  }

  const cssClasses = `${styles.notification} ${statusClasses}`;

  return ReactDOM.createPortal((
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  ), document.getElementById("notifications") as HTMLElement);
 
}

export default Notification;
