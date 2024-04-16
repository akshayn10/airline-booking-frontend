import styles from "./contact.module.css";
import ContactForm from "./contactForm/contactForm";
const Contact = ({email}) => {
  return (
    <div className={styles.contact__container}>
      <h1>Contact Details</h1>
      <div className={styles.contactForm__container}>

      <ContactForm email={email} />
      </div>
    </div>
  );
};
export default Contact;
