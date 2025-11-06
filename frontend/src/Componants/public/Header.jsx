import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Dropdown, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import "../css/Header.css";

// Logos for each language and theme
import logoEnLight from "../../assets/Logo_en_light.png";
import logoEnDark from "../../assets/Logo_en_dark.png";
import logoFrLight from "../../assets/Logo_fr_light.png";
import logoFrDark from "../../assets/Logo_fr_dark.png";
import logoArLight from "../../assets/Logo_ar_light.png";
import logoArDark from "../../assets/Logo_ar_dark.png";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
  const savedMode = localStorage.getItem("darkMode");
  const savedLang = localStorage.getItem("language");

  if (savedMode) {
    setDarkMode(savedMode === "true");
    if (savedMode === "true") document.body.classList.add("dark-mode");
  }

  if (savedLang) {
    setLanguage(savedLang);
  }
}, []);


  // ✅ Logo selector based on language + dark mode
  const getLogo = () => {
    if (language === "en") {
      return darkMode ? logoEnDark : logoEnLight;
    } else if (language === "fr") {
      return darkMode ? logoFrDark : logoFrLight;
    } else if (language === "ar") {
      return darkMode ? logoArDark : logoArLight;
    } else {
      return darkMode ? logoEnDark : logoEnLight; // fallback
    }
  };

  // ✅ Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Dark mode toggle
const toggleDarkMode = () => {
  const newMode = !darkMode;
  setDarkMode(newMode);
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", newMode);
};


  // ✅ Language change
 const handleLanguageChange = (lang) => {
  setLanguage(lang);
  localStorage.setItem("language", lang);
};


  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Navbar
        expand="lg"
        fixed="top"
        variant={darkMode ? "dark" : "light"}
        className={`py-3 ${
          scrolled
            ? darkMode
              ? "bg-dark shadow-sm"
              : "bg-light shadow-sm"
            : "bg-transparent"
        }`}
      >
        <Container>
          {/* 🧩 Brand Logo */}
          <Navbar.Brand href="#">
            <img
              src={getLogo()}
              alt="Company Logo"
              width="150"
              height="100"
              className="d-inline-block align-top me-2"
              style={{ transition: "opacity 0.4s ease, transform 0.4s ease" }}
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto align-items-center gap-3">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#services">Services</Nav.Link>
              <Nav.Link href="#team">Team</Nav.Link>

              <Button className="btn-custom" href="#contact">
                Contact Us
              </Button>

              {/* 🌍 Language Dropdown */}
              <Dropdown className="ms-3">
                <Dropdown.Toggle
                  variant={darkMode ? "secondary" : "outline-secondary"}
                  id="language-dropdown"
                  className="lang-dropdown"
                >
                  {language.toUpperCase()}
                </Dropdown.Toggle>
                <Dropdown.Menu align="end">
                  <Dropdown.Item onClick={() => handleLanguageChange("en")}>
                    English
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleLanguageChange("fr")}>
                    Français
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleLanguageChange("ar")}>
                    العربية
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {/* 🌙 Dark/Light Mode Toggle */}
              <Form.Check
                type="switch"
                id="darkModeSwitch"
                label={darkMode ? "🌙" : "☀️"}
                className="ms-3"
                onChange={toggleDarkMode}
                checked={darkMode}
              />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
}

export default Header;
