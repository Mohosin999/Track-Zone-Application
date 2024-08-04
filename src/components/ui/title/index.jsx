import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Title component to display a styled title
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The content to be displayed inside the title
 * @returns {JSX.Element} The rendered title component
 */
const Title = ({ children }) => {
  return <StyledTitle>{children}</StyledTitle>;
};

// Define prop types for the Title component
Title.propTypes = {
  children: PropTypes.node.isRequired,
};

// Styled component for the title
const StyledTitle = styled.h4`
  color: #afeeee;
  margin: 0;
  font-size: 18px;
  text-transform: capitalize;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    font-size: 20px;
    margin-bottom: 14px;
  }
`;

export default Title;
