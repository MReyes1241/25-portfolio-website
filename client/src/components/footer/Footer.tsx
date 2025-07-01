import { useState, useEffect } from 'react';
import { Mail, Github, Linkedin, ArrowUp, MapPin, Braces } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const footerElement = document.getElementById('footer');
    if (footerElement) {
      observer.observe(footerElement);
    }

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (footerElement) observer.unobserve(footerElement);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { 
      name: 'Email', 
      href: 'mailto:Manuelreyes1241@outlook.com', 
      icon: Mail,
      className: styles.emailLink 
    },
    { 
      name: 'GitHub', 
      href: 'https://github.com/MReyes1241', 
      icon: Github,
      className: styles.githubLink 
    },
    { 
      name: 'LinkedIn', 
      href: 'https://www.linkedin.com/in/manuel-reyes-jr-swe/', 
      icon: Linkedin,
      className: styles.linkedinLink 
    }
  ];

  const quickLinks = [
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Resume', href: '/resume' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <footer id="footer" className={styles.footer}>
      {/* Animated background elements */}
      <div className={styles.backgroundEffects}>
        <div className={`${styles.floatingOrb} ${styles.orb1}`}></div>
        <div className={`${styles.floatingOrb} ${styles.orb2}`}></div>
        <div className={`${styles.floatingOrb} ${styles.orb3}`}></div>
      </div>
      
      <div 
        className={styles.progressBar}
        style={{ width: `${scrollProgress * 100}%` }}
      ></div>
      
      <div className={styles.container}>
        <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
          
          <div className={styles.mainContent}>
            
            <div className={styles.brandSection}>
              <h3 className={styles.brandTitle}>
                Manuel Reyes Jr.
              </h3>
              <p className={styles.brandDescription}>
                Computer Science graduate from Hunter College with hands-on experience in full-stack development. Passionate about creating efficient, scalable solutions and always eager to tackle new challenges.
              </p>
              <div className={styles.brandTagline}>
                <MapPin className={styles.locationIcon} size={16} />
                <span>Based in New York, ready for remote opportunities</span>
              </div>
            </div>
            
            {/* Quick links */}
            <div className={styles.quickLinksSection}>
              <h4 className={styles.sectionTitle}>Quick Links</h4>
              <ul className={styles.quickLinksList}>
                {quickLinks.map((link, index) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className={styles.quickLink}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className={styles.connectSection}>
              <h4 className={styles.sectionTitle}>Let's Connect</h4>
              <p className={styles.connectDescription}>
                Open to software engineering opportunities and exciting collaborations!
              </p>
              <div className={styles.socialLinks}>
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className={`${styles.socialLink} ${social.className}`}
                      aria-label={social.name}
                      title={social.name}
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <IconComponent size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className={styles.divider}>
            <div className={styles.dividerLine}></div>
            <div className={styles.dividerIcon}>
              <Braces className={styles.codeIcon} size={20} />
            </div>
          </div>
          
          <div className={styles.bottomSection}>
            <div className={styles.copyright}>
              <span>&copy; {currentYear} Manuel Reyes Jr.</span>
            </div>
            
            <button
              onClick={scrollToTop}
              className={styles.backToTop}
              aria-label="Back to top"
            >
              <ArrowUp className={styles.arrowIcon} size={16} />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className={styles.particles}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;