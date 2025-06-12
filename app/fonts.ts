import localFont from 'next/font/local'

// const SFProDisplay = {
//   regular: {
//     font: localFont({
//       src: './../sources/fonts/SF-Pro-Display-Regular.otf',
//       weight: '400',
//       style: 'normal',
//       display: 'swap',
//     }),
//   },
//   bold: {
//     font: localFont({
//       src: './../sources/fonts/SF-Pro-Display-Bold.otf',
//       weight: '700',
//       style: 'normal',
//       display: 'swap',
//     }),
//   },
//   // Добавьте другие начертания по аналогии
// };


const sfProDisplayRegular = localFont({
      src: './../sources/fonts/SF-Pro-Display-Regular.otf',
  weight: '400',
  style: 'normal',
  display: 'swap',
});

const sfProDisplaySemiBold = localFont({
      src: './../sources/fonts/SF-Pro-Display-Semibold.otf',
  weight: '400',
  style: 'normal',
  display: 'swap',
});

const sfProDisplayBold = localFont({
    src: './../sources/fonts/SF-Pro-Display-Bold.otf',
    weight: '700',
    style: 'normal',
    display: 'swap',
});

export const SFProDisplay = {
    regular: sfProDisplayRegular,
    semibold: sfProDisplaySemiBold,
    bold: sfProDisplayBold,
};

export default SFProDisplay;