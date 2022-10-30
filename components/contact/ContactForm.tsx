import React, { useEffect, useReducer, useState } from "react";
import styles from "./ContactForm.module.css";
import axios from "axios";
import Notification from "../ui/notification";
import { TNotification } from "../../types/contactForm";

const ContactForm = () => {
  const initialContactForm = {
    name: "",
    email: "",
    message: "",
  };

  const [contactFormValues, setContactFormValues] = useReducer(
    (curVals: any, newVals: any) => ({ ...curVals, ...newVals }),
    initialContactForm
  );

  const [requestStatus, setRequestStatus] = useState("");
  const [requestError, setRequestError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setRequestStatus("pending");

    await axios
      .post("/api/contact", contactFormValues)
      .then((res) => {
        console.log(res);
        setRequestStatus("success");
      })
      .catch((err) => {
        setRequestError(err.message);
        setRequestStatus("error");
      });

    setContactFormValues(initialContactForm);
  };

  let notification: TNotification | undefined;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: requestError || "Something went wrong",
    };
  }

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  return (
    <>
      <section className={styles.contact}>
        <h1>How can I help you?</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.controls}>
            <div className={styles.control}>
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                required
                value={contactFormValues.email}
                onChange={(e) =>
                  setContactFormValues({ email: e.target.value })
                }
              />
            </div>
            <div className={styles.control}>
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                required
                value={contactFormValues.name}
                onChange={(e) => setContactFormValues({ name: e.target.value })}
              />
            </div>
          </div>
          <div className={styles.control}>
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              rows={5}
              required
              value={contactFormValues.message}
              onChange={(e) =>
                setContactFormValues({ message: e.target.value })
              }
            />
          </div>

          <div className={styles.actions}>
            <button>Send Message</button>
          </div>
        </form>
        {notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}
      </section>
    </>
  );
};

export default ContactForm;
