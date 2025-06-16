import React, { useState } from "react";
import styles from "./Contact.module.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <h1 className={styles.title}>Get In Touch</h1>
        <p className={styles.subtitle}>
          I'd love to hear from you. Send me a message and I'll respond as soon
          as possible.
        </p>
      </div>

      {/* Main Content */}
      <div className={styles.main}>
        {/* Contact Form */}
        <div className={styles.formSection}>
          <h2 className={styles.formTitle}>Send me a message</h2>
          <div className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className={styles.textarea}
                rows={6}
                required
              />
            </div>

            <button
              type="button"
              className={styles.submitBtn}
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {submitStatus === "success" && (
              <div className={styles.successMsg}>
                ✓ Message sent successfully! I'll get back to you soon.
              </div>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className={styles.infoSection}>
          <h2 className={styles.infoTitle}>Let's Connect</h2>

          <div className={styles.contactCard}>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>✉</div>
              <div>
                <strong>Email</strong>
                <p>manuelreyes1241@outlook.com</p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>⚡</div>
              <div>
                <strong>Response Time</strong>
                <p>Usually within 24 hours</p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>💼</div>
              <div>
                <strong>Availability</strong>
                <p>Open to new opportunities</p>
              </div>
            </div>
          </div>

          <div className={styles.socialLinks}>
            <h3>Find me online</h3>
            <div className={styles.links}>
              <a
                href="https://linkedin.com/in/manuel-reyes-jr-swe"
                className={styles.link}
              >
                LinkedIn
              </a>
              <a href="https://github.com/MReyes1241" className={styles.link}>
                GitHub
              </a>
              <a
                href="https://www.instagram.com/born_reyes?igsh=MXVtY3V3emJ0dm9pMQ=="
                className={styles.link}
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
