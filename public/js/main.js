
// animation on scroll
$(function() {
  AOS.init({
    easing: 'ease-out-back',
    duration: 1000
  });
});

 $(window).on('load', function() {
  AOS.refresh();
});
 // navbar color change
//  $(window).scroll(function() {
//    var scroll = $(window).scrollTop();
//    if (scroll < 150) {
//      $('.fixed-top').css('background', '#fff');
//    }
//     else {
//      $('.fixed-top').css('background', '#d3dbff');
//    }
//  });


//to make the loader stop after loading page completely 
$(document).ready(function() {
  
  setTimeout(function() {
    $('#ctn-preloader').addClass('loaded');

    // $('body').removeClass('no-scroll-y');

    if ($('#ctn-preloader').hasClass('loaded')) {

      $('#preloader').delay(1000).queue(function() {
        $(this).remove();
      });
    }
  }, 3000);
  
});








 window.onscroll = function() {myFunction()};
function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}


function parallax (element,distance,speed){
const item = document.querySelector(element);
item.style.transform=`translateY(${distance*speed}px)`;
}

window.addEventListener('scroll',function(){
  parallax(".hatom",window.scrollY,0.3)
  parallax(".hflask",window.scrollY,0.2)
})

let addToCart = document.querySelectorAll(".add_To_Cart")





addToCart.forEach(btn => {

  btn.addEventListener("click", event => {
     
      let chemical = JSON.parse(btn.dataset.x)
   let val = chemical.name

      chemical.required = document.getElementById(val).value
                console.log(chemical);
               updateCart(chemical)

  });

});