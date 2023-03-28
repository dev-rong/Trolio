import styled from 'styled-components';
import theme from './theme';
const { devices, sizes, upwards } = theme;
// Portfolio Styles
export const SearchContainer = styled.div`
  width: 100%;
  padding-block: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
export const Container = styled.div`
  width: 100%;
  display: grid;
  place-content: center;
  @media ${devices.desktop} {
    grid-template-columns: repeat(7, 13rem);
  }
  @media ${devices.laptopL} {
    grid-template-columns: repeat(6, 13rem);
  }
  @media ${devices.laptop} {
    grid-template-columns: repeat(5, 13rem);
  }
  @media (min-width: 1025px) and (max-width: 1200px) {
    grid-template-columns: repeat(4, 13rem);
  }
  @media ${devices.tablet} {
    grid-template-columns: repeat(3, 13rem);
  }
  @media ${devices.mobileL} {
    grid-template-columns: repeat(2, 13rem);
  }
  @media ${devices.mobileM} {
    grid-template-columns: repeat(1, 13rem);
  }
`;
export const Image = styled.div`
  position: relative;
  cursor: move;
  cursor: pointer;
  background-size: cover;
  background-position: center 100%;
  background-repeat: no-repeat;
  width: 13rem;
  height: 20rem;
  border-radius: 10px;
  animation: ${upwards} 0.6s ease-in;
  &.bgImage {
    background-image: url('${(props) => props.src}');
  }
  &::before,
  &::after {
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 700;
    white-space: pre;
    position: absolute;
    width: 100%;
    max-width: 13rem;
    height: 60px;
    padding: 0px 10px;
    border-radius: 0 0 10px 10px;
    color: ${theme.colors.white};
    font-size: 1.2rem;
    text-align: left;
    background: rgb(0, 0, 0);
  }
  &::before {
    content: 'view';
    left: 0px;
    top: 0px;
    background: -moz-linear-gradient(
      180deg,
      rgba(0, 0, 0, 1) 10%,
      rgba(255, 255, 255, 0) 40%
    );
    background: -webkit-linear-gradient(
      180deg,
      rgba(0, 0, 0, 1) 10%,
      rgba(255, 255, 255, 0) 40%
    );
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 1) 10%,
      rgba(255, 255, 255, 0) 40%
    );
  }
  &::after {
    content: ${(props) =>
      `"${props.title} \\00000a ${props.workForm}•${props.jobType}"`};
    left: 0px;
    bottom: 0px;
    background: -moz-linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 30%,
      rgba(255, 255, 255, 0) 100%
    );
    background: -webkit-linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 30%,
      rgba(255, 255, 255, 0) 100%
    );
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 30%,
      rgba(255, 255, 255, 0) 100%
    );
  }
`;
export const CloseBtn = styled.button.attrs({
  'aria-label': 'delete search words',
})`
  appearance: none;
  border-color: transparent;
  width: 1.5rem;
  height: 1.5rem;
  background-color: transparent;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3e%3cpath fill='none' d='M0 0h24v24H0z'/%3e%3cpath d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z' fill='%238c979a'/%3e%3c/svg%3e");
  background-size: 100% 100%;
  background-position: 50%;
  background-repeat: no-repeat;
`;

// Filters  Styles
export const FiltersContainer = styled.div`
  width: 100%;
  min-height: 169px;
  transform: translateY(0);
  margin-bottom: 1.5rem;
  color: ${theme.colors.white};
  @media (max-width: ${sizes.tablet}) {
    font-size: 0.75rem;
  }
`;
export const GridContainer = styled.ul`
  display: grid;
  justify-content: space-around;
  padding-bottom: 1rem;
  gap: 1.5rem;
  max-width: 90%;
  margin: 0 auto;
  &:nth-child(1) {
    grid-area: jobType;
  }
  &:nth-child(2) {
    grid-area: workForm;
  }
  &:nth-child(3) {
    grid-area: workType;
  }
  &:nth-child(4) {
    grid-area: platform;
  }
  grid-template-areas: 'jobType workForm workType platform';
  grid-template-columns: 1fr 1fr 1fr 1fr;
  @media (max-width: 508px) {
    grid-template-areas:
      'jobType workForm'
      'workType platform';
    grid-template-columns: 2fr 2fr;
  }
`;
export const FilterContainer = styled.li`
  list-style: none;
  text-align: left;
  margin-top: 1rem;
  & h3 {
    border-bottom: 2px solid rgb(255 255 255 / 15%);
  }
`;
