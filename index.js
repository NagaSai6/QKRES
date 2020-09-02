// animation on scroll
 AOS.init({
   easing: 'ease-out-back',
   duration: 1000
 });
 // navbar color change
 $(window).scroll(function() {
   var scroll = $(window).scrollTop();
   if (scroll < 150) {
     $('.fixed-top').css('background', '#fff');
   } else {
     $('.fixed-top').css('background', '#cffffe');
   }
 });


//  const options = {
//   bottom: '64px', // default: '32px'
//   right: 'unset', // default: '32px'
//   left: '32px', // default: 'unset'
//   time: '0.5s', // default: '0.3s'
//   mixColor: '#fff', // default: '#fff'
//   backgroundColor: '#fff',  // default: '#fff'
//   buttonColorDark: '#100f2c',  // default: '#100f2c'
//   buttonColorLight: '#fff', // default: '#fff'
//   saveInCookies: false, // default: true,
//   label: $('button i'), // default: ''
//   autoMatchOsTheme: true // default: true
// }
//
// function addDarkmodeWidget() {
//     new Darkmode(options).showWidget();
//   }
//   window.addEventListener('load', addDarkmodeWidget);
