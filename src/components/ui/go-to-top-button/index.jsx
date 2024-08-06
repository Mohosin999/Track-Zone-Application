import { useState, useEffect } from "react";
import styled from "styled-components";

/**
 * GoToTopButton component renders a button that becomes visible when
 * the user scrolls down the page and allows the user to scroll back to the top.
 */
const GoToTopButton = () => {
  const [visible, setVisible] = useState(false);

  /**
   * Toggles the visibility of the button based on scroll position.
   */
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  /**
   * Smoothly scrolls the window to the top of the page.
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Adds and cleans up the scroll event listener to toggle button visibility
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <Button
      onClick={scrollToTop}
      style={{ display: visible ? "inline" : "none" }}
    >
      ↑
    </Button>
  );
};

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  right: 8px;
  padding: 8px 12px;
  font-size: 14px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1000;
  transition: opacity 0.3s, visibility 0.3s;

  &:hover {
    background-color: #00bfff;
  }

  @media (min-width: 768px) {
    bottom: 30px;
    right: 20px;
    padding: 10px 15px;
    font-size: 18px;
  }
`;

export default GoToTopButton;
