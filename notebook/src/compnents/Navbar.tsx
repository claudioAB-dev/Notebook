import React from "react";
import "../styles/Navbar.css";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleNavMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
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
      {/* Línea modificada aquí */}
      <div
        id="navbarMenuContent"
        className={`navbar-menu ${isOpen ? "is-open" : ""}`}
      >
        <div className="space-x-4">
          <a href="#" className="navbar-menu-item">
            Home
          </a>
          <a href="#" className="navbar-menu-item">
            Notebooks
          </a>
          <a href="#" className="navbar-menu-item">
            Books
          </a>
          <a href="#" className="navbar-menu-item">
            To read list
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
