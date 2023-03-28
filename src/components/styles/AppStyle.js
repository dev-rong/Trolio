import styled from 'styled-components';
import theme from './theme';
const { colors, sizes, common } = theme;
export const Navigation = styled.nav`
  transform: ${(props) =>
    props.showNav ? 'translateX(0px)' : 'translateX(-96px)'};
  transition: transform 500ms ease-in-out;
  width: 96px;
  min-height: 100vh;
  padding-top: 80px;
  background-color: ${theme.colors.white};
  ${common.displayFlex};
  flex-direction: column;
  align-items: center;
  top: 0;
  position: fixed;
  z-index: 1000;
  & h2 {
    font-size: 1rem;
    color: ${colors.primary};
  }
`;
export const ToggleNav = styled.button.attrs({ 'aria-label': 'toggle menu' })`
  transform: ${(props) =>
    props.showNav ? 'translateX(0px)' : 'translateX(-96px)'};
  background-image: ${(props) =>
    props.showNav
      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0H24V24H0z'/%3E%3Cpath d='M21 18v2H3v-2h18zM6.95 3.55v9.9L2 8.5l4.95-4.95zM21 11v2h-9v-2h9zm0-7v2h-9V4h9z' fill='rgba(16,19,34,1)'/%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0H24V24H0z'/%3E%3Cpath d='M21 18v2H3v-2h18zM17.05 3.55L22 8.5l-4.95 4.95v-9.9zM12 11v2H3v-2h9zm0-7v2H3V4h9z' fill='rgba(16,19,34,1)'/%3E%3C/svg%3E")`};
  transition: transform 500ms ease-in-out;
  position: fixed;
  z-index: 1000;
  top: 86px;
  left: 96px;
  background-color: #efefef;
  width: 24px;
  height: 36px;
  border-radius: 0px 4px 4px 0;
  background-repeat: no-repeat;
  background-position: center;
`;
export const Container = styled.div`
  @media (max-width: ${sizes.tablet}) {
    width: 100%;
  }
  width: ${(props) => (props.showNav ? 'calc(100% - 96px)' : '100%')};
  position: absolute;
  right: 0;
  min-height: 100vh;
  padding-bottom: 5rem;
  background-color: ${colors.primary};
`;
export const Header = styled.header`
  background-color: ${theme.colors.primary};
  width: 100%;
  height: 80px;
  ${common.displayFlex};
  justify-content: flex-start;
  align-items: center;
  & a {
    position: 'absolute';
    z-index: 1000;
  }
  & div {
    display: 'flex';
    justify-content: 'center';
    align-items: 'center';
  }
`;
export const Main = styled.main`
  width: 100%;
  max-width: 1300px;
  min-height: 100vh;
  margin: 0 auto 0;
`;
export const IconContainer = styled.ul`
  margin-block: 1.5rem;
  padding-inline: 0;
  a {
    position: relative;
    z-index: 1;
    display: inline-grid;
    place-items: center;
  }
  a::after {
    position: absolute;
    content: '';
    width: 4rem;
    height: 4rem;
    z-index: -1;
    opacity: 0;
    border-radius: 50%;
    transition: opacity 400ms linear, transform 400ms ease-in-out;
  }
  a:hover::after,
  a:active::after {
    opacity: 1;
    transform: scale(1.5);
  }
`;
