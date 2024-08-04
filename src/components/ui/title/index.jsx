import PropTypes from "prop-types";
import styled from "styled-components";

const Title = ({ children }) => {
  return <StyledTitle>{children}</StyledTitle>;
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

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
