import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, FolderOpen, FileText, Mail, Book } from "lucide-react";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/about", label: "About", icon: User },
    { path: "/projects", label: "Projects", icon: FolderOpen },
    { path: "/resume", label: "Resume", icon: FileText },
    { path: "/blog", label: "Blog", icon: Book },
    { path: "/contact", label: "Contact", icon: Mail },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo/Brand */}
        <Link to="/" className={styles.navLogo} onClick={closeMenu}>
          <span className={styles.logoText}>Manuel Reyes jr.</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className={styles.navMenu}>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.path} className={styles.navItem}>
                <Link
                  to={item.path}
                  className={`${styles.navLink} ${
                    location.pathname === item.path ? styles.active : ""
                  }`}
                  onClick={closeMenu}
                >
                  <IconComponent className={styles.navIcon} size={18} />
                  <span className={styles.navText}>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Toggle */}
        <div
          className={`${styles.navToggle} ${isMenuOpen ? styles.active : ""}`}
          onClick={toggleMenu}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>

        {/* Mobile Navigation */}
        <ul
          className={`${styles.navMenuMobile} ${isMenuOpen ? styles.active : ""}`}
        >
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.path} className={styles.navItemMobile}>
                <Link
                  to={item.path}
                  className={`${styles.navLinkMobile} ${
                    location.pathname === item.path ? styles.active : ""
                  }`}
                  onClick={closeMenu}
                >
                  <IconComponent className={styles.navIcon} size={20} />
                  <span className={styles.navText}>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className={styles.navOverlay} onClick={closeMenu}></div>
      )}
    </nav>
  );
};

export default Navbar;
