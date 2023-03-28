import { keyframes } from 'styled-components';
const pixelToRem = (size) => `${size / 16}rem`;
const fontSizes = {
  btnPrimary: pixelToRem(60),
  subtitle: pixelToRem(30),
  paragraph: pixelToRem(18),
};
const colors = {
  primary: '#101322',
  white: '#FFFFFF',
};
const sizes = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};
const devices = {
  mobileS: `(min-width: ${sizes.mobileS}) and (max-width: ${sizes.mobileM})`,
  mobileM: `(min-width: ${sizes.mobileM}) and (max-width: ${sizes.mobileL})`,
  mobileL: `(min-width: ${sizes.mobileL}) and (max-width: ${sizes.tablet})`,
  tablet: `(min-width: ${sizes.tablet}) and (max-width: ${sizes.laptop})`,
  laptop: `(min-width: ${sizes.laptop}) and (max-width: ${sizes.laptopL})`,
  laptopL: `(min-width: ${sizes.laptopL}) and (max-width: ${sizes.desktop})`,
  desktop: `(min-width: ${sizes.desktop})`,
};
const upwards = keyframes`
  0% { 
    opacity: 0;
    transform: translateY(100%);
  }
  100% { 
    opacity: 1;
    transform: translateY(0%);
  }
`;
const common = {
  displayFlex: `
    display: flex;
    `,
  flexCenter: `
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  flexCenterColumn: `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};
const theme = {
  fontSizes,
  colors,
  sizes,
  devices,
  upwards,
  common,
};
export default theme;
