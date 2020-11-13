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


let removeFromCart = document.querySelectorAll(".remove-from-cart")
let deleteFromCart = document.querySelectorAll(".delete-from-cart")
let addToCart = document.querySelectorAll('.add_to_cart');
let cartCounter = $("#cartCounter");

function updateCart(Equipment){
      axios.post("/update-cart",Equipment).then(res =>{
        // console.log(res);
        new Noty({
            type:"success",
            timeout:500,
            text: "Item added to cart Successfully",
            progressBar:false
          
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


  function DeleteCart(Equipment){
    axios.post("/delete_item",Equipment).then(res=>{
      console.log(res);
 if(res.data.message==="this item not added to cart to delete"){
  new Noty({
    type:"error",
    timeout:500,
    text: "Only items present in cart can be deleted",
    progressBar:false,
    layout:"center"
}).show();

 }else{
  cartCounter.html(res.data.totalQty)
  new Noty({
    type:"Success",
    timeout:500,
    text: "Item deleted Successfully",
    progressBar:false,
    layout:"bottomLeft"
}).show();

  
 }
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
        let Equipment = JSON.parse(btn.dataset.x)
                  console.log(Equipment);
                 updateCart(Equipment)

    });

 });

 removeFromCart.forEach(btn => {

  btn.addEventListener("click", event => {
      // console.log( event );
      let Equipment = JSON.parse(btn.dataset.y)
                console.log(Equipment);
               DeleteCart(Equipment)

  });

});






 


 const alertMsg = document.querySelector('#success')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}
