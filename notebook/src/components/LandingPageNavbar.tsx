import React from "react";
import "../styles/Navbar.css";
import "../styles/NavbarSwitch.scss";
import { useTheme } from "../context/ThemeContext";

const LandingPageNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleNavMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="navbar">
        <div>
          <div className="navbar-brand">
            <a href="/">Notebook</a>
          </div>

          <button
            className="navbar-toggle"
            onClick={handleNavMenuToggle}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
            aria-controls="navbarMenuContent"
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>

          <div
            id="navbarMenuContent"
            className={`navbar-menu ${isOpen ? "is-open" : ""}`}
          >
            <div className="space-x-4">
              <a href="/login" className="navbar-menu-item">
                Login
              </a>
              <a href="/register" className="navbar-menu-item">
                Singup
              </a>
              <a href="/about" className="navbar-menu-item">
                About
              </a>
              <a href="" className="navbar-menu-item">
                Donate
              </a>
              <input
                type="checkbox"
                id="switch"
                className="switch-input"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />
              <label htmlFor="switch" className="switch-label"></label>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default LandingPageNavbar;
