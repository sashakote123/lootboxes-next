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


// Для каждого начертания создаем отдельную константу
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

// Экспортируем объект с шрифтами
export const SFProDisplay = {
    regular: sfProDisplayRegular,
    semibold: sfProDisplaySemiBold,
    bold: sfProDisplayBold,
    // Добавьте другие начертания по аналогии
};

export default SFProDisplay;