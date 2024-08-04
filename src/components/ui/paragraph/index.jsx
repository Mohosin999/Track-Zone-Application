import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Paragraph component renders a styled paragraph.
 * @param {node} children - The content to be displayed inside the paragraph.
 */
const Paragraph = ({ children }) => {
  return <StyledDescription>{children}</StyledDescription>;
};

// Define prop types for the Paragraph component
Paragraph.propTypes = {
  children: PropTypes.node.isRequired, // Content to be displayed, required
};

// Styled component for the paragraph
const StyledDescription = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  line-height: 23px;
  white-space: pre-wrap;

  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 25px;
  }
`;

export default Paragraph;
