import PropTypes from "prop-types";
import styled from "styled-components";

const Title = ({ children }) => {
  return <StyledTitle>{children}</StyledTitle>;
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

const StyledTitle = styled.h4`
  color: #f2f2f2;
  margin: 0;
  font-size: 20px;
  margin-bottom: 16px;
`;

export default Title;
