import styles from "./contact.module.css";
import ContactForm from "./contactForm/contactForm";
const Contact = () => {
  return (
    <div className={styles.contact__container}>
      <h1>Contact Details</h1>
      <div className={styles.contactForm__container}>

      <ContactForm/>
      </div>
    </div>
  );
};
export default Contact;
