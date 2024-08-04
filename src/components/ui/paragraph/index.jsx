import PropTypes from "prop-types";
import styled from "styled-components";

const Paragraph = ({ children }) => {
  return <StyledDescription>{children}</StyledDescription>;
};

Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
};

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
