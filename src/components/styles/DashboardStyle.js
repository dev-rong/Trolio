import styled from 'styled-components';
import theme from './theme';
const { sizes, upwards } = theme;

export const DashboardContainer = styled.div`
  @media (min-width: ${sizes.tablet}) {
    margin: -4rem auto 0;
  }
`;
export const Grid = styled.div`
  display: grid;
  justify-content: center;
  margin: 1rem auto 0;
  max-width: 1200px;
  @media (max-width: ${sizes.mobileS}) {
    width: 100%;
  }
  &:nth-child(1) {
    grid-area: pie1;
  }
  &:nth-child(2) {
    grid-area: doughnut;
  }
  &:nth-child(3) {
    grid-area: pie2;
    &:nth-child(4) {
      grid-area: index1;
    }
    &:nth-child(5) {
      grid-area: index2;
    }
    &:nth-child(6) {
      grid-area: total;
    }
  }
  @media (min-width: ${sizes.mobileS}) and (max-width: ${sizes.tablet}) {
    justify-items: center;
  }
  @media (min-width: ${sizes.tablet}) and (max-width: ${sizes.laptop}) {
    grid-template-areas:
      'pie1 doughnut'
      'pie2 index1'
      'index2 total';
  }
  @media (min-width: ${sizes.laptop}) {
    grid-template-areas:
      'pie1 doughnut pie2'
      'index1 index2 total';
  }
`;
export const GridImage = styled.div`
  position: relative;
  max-width: 24.75rem;
  max-height: 29rem;
  min-width: 15.375rem;
  min-height: 25rem;
  animation: ${upwards} 0.6s ease-in;
  flex-grow: 1;
  background-color: ${theme.colors.white};
  border: 1px solid black;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    padding-block: 0.3rem;
    font-size: 1.5rem;
  }
`;
export const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: -3rem;
  z-index: 999;
  & h3,
  span {
    color: ${theme.colors.white};
  }
`;
export const DateWrapper = styled.div`
  background-color: rgb(99 99 99 / 80%);
  padding: 0.5rem;
  border-radius: 8px;
  width: 90%;
  max-width: 25rem;
  & select {
    width: 55%;
  }
  & .compare-btn {
    width: 35%;
  }
  & div {
    position: relative;
    padding-block: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:first-child {
      & button {
        width: 3rem;
      }
      color: ${theme.colors.white};
      font-weight: 900;
    }
    span:first-of-type {
      margin-right: 1rem;
      font-weight: 900;
    }
    input:first-of-type {
      margin-inline: 0.5rem;
    }
    input:last-of-type {
      margin-left: 0.5rem;
    }
  }
`;
