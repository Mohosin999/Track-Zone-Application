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
  font-size: 17px;
  line-height: 25px;
  white-space: pre-wrap;
`;

export default Paragraph;
