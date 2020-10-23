$(function() {
  AOS.init({
    easing: 'ease-out-back',
    duration: 1000
  });
});

 $(window).on('load', function() {
  AOS.refresh();
});


$(window).scroll(function() {
  var scroll = $(window).scrollTop();
  if (scroll < 150) {
    $('.fixed-top').css('background', '#fff');
  }

   else {
    $('.fixed-top').css('background', '#d3dbff');
  }
});

window.onscroll = function() {myFunction()};
function myFunction() {
 var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
 var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
 var scrolled = (winScroll / height) * 100;
 document.getElementById("myBar").style.width = scrolled + "%";
}



let addToCart = document.querySelectorAll('.add_to_cart');
let cartCounter = $("#cartCounter");

function updateCart(mechEquipment){
      axios.post("/update-cart",mechEquipment).then(res =>{
        new Noty({
            type:"success",
            timeout:500,
            text: "Item added to cart Successfully",
            progressBar:false,
            layout:'bottomRight'
        }).show();

          cartCounter.html(res.data.totalQty)
    }).catch(err => {
        new Noty({
            type:"error",
            timeout:1000,
            text: 'Something went wrong',
            progressBar:false,
            layout:"center"
        }).show()
    })

  }


addToCart.forEach(btn => {

    btn.addEventListener("click", event => {
        // console.log( event );
        let mechEquipment = JSON.parse(btn.dataset.mech)
                  console.log(mechEquipment);
                 updateCart(mechEquipment)

    });

 });
