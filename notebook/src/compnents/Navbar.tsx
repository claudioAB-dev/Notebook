import React from "react";
import "../styles/Navbar.css"; // Import Tailwind CSS styles

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
      <div className="navbar-menu">
        <div className="space-x-4">
          <a href="#" className="navbar-menu-item">
            Home
          </a>
          <a href="#" className="navbar-menu-item">
            Notebooks
          </a>
          <a href="#" className="navbar-menu-item">
            books
          </a>
          <a href="#" className="navbar-menu-item">
            To read list
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; // This code defines a simple Navbar component using React and Tailwind CSS.
