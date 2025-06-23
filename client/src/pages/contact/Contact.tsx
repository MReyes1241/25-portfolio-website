import React, { useState } from "react";
import styles from "./Contact.module.css";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  details?: string[];
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
    
    // Clear status when user modifies form
    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
      setStatusMessage("");
    }
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];
    
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.push("Name must be at least 2 characters long");
    }
    
    if (!formData.email.trim()) {
      errors.push("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push("Please enter a valid email address");
    }
    
    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errors.push("Subject must be at least 3 characters long");
    }
    
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.push("Message must be at least 10 characters long");
    }
    
    if (formData.name.length > 100) {
      errors.push("Name must be less than 100 characters");
    }
    
    if (formData.subject.length > 200) {
      errors.push("Subject must be less than 200 characters");
    }
    
    if (formData.message.length > 2000) {
      errors.push("Message must be less than 2000 characters");
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setStatusMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus("success");
        setStatusMessage(data.message || "Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        
        setTimeout(() => {
          setSubmitStatus("idle");
          setStatusMessage("");
        }, 5000);
      } else {
        setSubmitStatus("error");
        
        if (Array.isArray(data.details) && data.details.length > 0) {
          setValidationErrors(data.details);
          setStatusMessage("Please fix the validation errors below.");
        } else {
          setValidationErrors([]); // Ensure it's reset
          setStatusMessage(data.error || "Failed to send message. Please try again.");
        }

      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus("error");
      setStatusMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Get In Touch</h1>
        <p className={styles.subtitle}>
          I'd love to hear from you. Send me a message and I'll respond as soon
          as possible.
        </p>
      </div>

      <div className={styles.main}>
        <div className={styles.formSection}>
          <h2 className={styles.formTitle}>Send me a message</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                required
                maxLength={100}
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
                maxLength={200}
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
                maxLength={2000}
              />
              <div style={{ 
                fontSize: '0.8rem', 
                color: 'rgba(255, 255, 255, 0.5)', 
                textAlign: 'right', 
                marginTop: '0.25rem' 
              }}>
                {formData.message.length}/2000
              </div>
            </div>

            {validationErrors.length > 0 && (
              <div className={styles.errorMsg}>
                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {submitStatus === "success" && (
              <div className={styles.successMsg}>
                ✓ {statusMessage}
              </div>
            )}

            {submitStatus === "error" && !validationErrors.length && (
              <div className={styles.errorMsg}>
                ✗ {statusMessage}
              </div>
            )}
          </form>
        </div>

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
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/MReyes1241" 
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://www.instagram.com/born_reyes?igsh=MXVtY3V3emJ0dm9pMQ=="
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
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