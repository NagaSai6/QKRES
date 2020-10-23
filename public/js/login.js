
// navbar color change
$(window).scroll(function() {
  var scroll = $(window).scrollTop();
  if (scroll < 150) {
    $('.fixed-top').css('background', '#fff');
  } else {
    $('.fixed-top').css('background', '#d3dbff');
  }
});
