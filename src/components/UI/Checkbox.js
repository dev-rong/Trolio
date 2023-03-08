import React from 'react';
import styled from 'styled-components';
const StyledInput = styled.input`
  appearance: none;
  border-color: transparent;
  width: 1.5rem;
  height: 1.5rem;
  background-image: ${(props) =>
    props.checked
      ? `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3e%3cpath fill='none' d='M0 0h24v24H0z'/%3e%3cpath d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z' fill='rgba(239%2c239%2c239%2c1)'/%3e%3c/svg%3e")`
      : 'none'};
  background-size: 100% 100%;
  background-position: 50%;
  background-repeat: no-repeat;
`;
const StyledP = styled.p`
  margin-right: 0.25rem;
  &:hover {
    font-weight: 600;
  }
  font-weight: ${(props) => (props.checked ? 600 : 400)};
`;
const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
`;
const Checkbox = (props) => {
  return (
    <StyledLabel htmlFor={props.text}>
      <StyledP checked={props.checked}>{props.text}</StyledP>
      <StyledInput
        type="checkbox"
        id={props.text}
        checked={props.checked}
        name={props.name}
        onChange={props.onChange}
      />
    </StyledLabel>
  );
};
export default Checkbox;
