
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
var name = $("#customerName").val();
var email=$("#email").val();
var depart=$("#department").val();
var insti = $("#insti").val();
var require=$("#requi").val();


$(".next").on("click",function(){

    //    $("#info").html("All feilds are required").css("color:red")
    if(animating) return false;
    animating = true;
    
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();
    
    //activate next step on progressbar using the index of next_fs
    $("#qkres-progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    
    //show the next fieldset
    next_fs.show(); 
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50)+"%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
            next_fs.css({'left': left, 'opacity': opacity});
        }, 
        duration: 800, 
        complete: function(){
            current_fs.hide();
            animating = false;
        }, 
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});

$(".previous").on("click",function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#qkres-progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

// $(".submit").on("click",function(){
// 	return false;
// })
$("#customerName,#email,#department,#insti,#phone, textarea").on("keyup", function(){
    if($("#customerName").val() != "" && $("#email").val() != "" && $("#phone").val() != ""){
        if($("#department").val() != "" && $("#insti").val() != "" && $("textarea").val() != ""){
            $("#firstB").css("background","#27AE60");
            $("#firstB").removeAttr("disabled"); 
        }else{
            $("#firstB").attr("disabled", "disabled");
            $("#firstB").css("background","#e6e6e6");
        }     
    } else {
        $("#firstB").attr("disabled", "disabled");
        $("#firstB").css("background","#e6e6e6");
    }
});
  $('#fileUpload').on("change",
            function(){
                if ($("#fileUpload").val()) {
                    // const file = $('#fileUpload').files[0];
                    // getSignedRequest(file);
                    $('#submitForm').removeAttr('disabled'); 
                    $("#submitForm").css("background","#27AE60");
                }else{
                    $("#submitForm").attr("disabled", "disabled");
                    $("#submitForm").css("background","#e6e6e6");
                    $("#submitForm").val("Upload")
                    return alert('No file selected.');
                } });

                $("#uploadedFileUrl").on("keyup",function(){
                  if($("#uploadedFileUrl").val() != ""){
                    $("#submitForm").css("display","none")
                    $("#secondB").removeAttr("disabled"); 
                    $("#secondB").css("display",''); 

                  }
                })

                function uploadFile(file, signedRequest, url){
                    const xhr = new XMLHttpRequest();
                    xhr.open('PUT', signedRequest);
                    xhr.onreadystatechange = () => {
                      if(xhr.readyState === 4){
                        if(xhr.status === 200){
                        //   document.getElementById('preview').src = url;
                          $('#uploadedFileUrl').val(url);
                          
                          $("#submitForm").css("display","none")
                          $("#secondB").removeAttr("disabled"); 
                          $("#secondB").css({"display":'','background':'#27AE60'}); 
                          
                          alert("Your file is uploaded")
                        }
                        else{
                          alert('Could not upload file.');
                          $("#submitForm").val("Upload")
                        }
                      }
                    };
                    xhr.send(file);
                  }


                function getSignedRequest(file){
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', `/sign-s3?file-name=${encodeURIComponent(file.name)}&file-type=${encodeURIComponent(file.type)}`);
                    xhr.onreadystatechange = () => {
                      if(xhr.readyState === 4){
                        if(xhr.status === 200){
                          const response = JSON.parse(xhr.responseText);
                          uploadFile(file, response.signedRequest, response.url);
                        }
                        else{
                          alert('Could not get signed URL.');
                        }
                      }
                    };
                    xhr.send();
                  }






                (() => {
                    document.getElementById("submitForm").onclick = () => {
                      
                        if(document.getElementById("uploadedFileUrl").value == ""){
                          
                          document.getElementById("submitForm").value = "Uploading.."
                        } 
                     
                      const files = document.getElementById('fileUpload').files;
                      const file = files[0];
                      if(file == null){
                        return alert('No file selected.');
                      }
                      getSignedRequest(file);
                    };
                  })();