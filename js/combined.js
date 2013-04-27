var video = document.getElementById('video');
var canvas = document.getElementById('photo');
var filmroll = document.getElementById('filmroll');
var receivedImage;
var imageFileName;

//This entire section is for the video capture 
navigator.webkitGetUserMedia({video:true}, gotStream, noStream);
	
//for when the stream is grabbed
function gotStream(stream){
	video.src = window.webkitURL.createObjectURL(stream);
	video.onerror = function(){
		stream.stop();
		noStream();
	} 
	$("#errorMessage").hide();
}

// for when the stream fails
function noStream(){
	document.getElementById('errorMessage').textContent="No Camera Available.";
}

//for when the snapshot is taken
function snapshot() {
	var c = canvas.getContext('2d');
	canvas.width= video.clientWidth;
	canvas.height= video.clientHeight;
	canvas.style.width = video.clientWidth;
	canvas.style.height = video.clientHeight;
	
	//to animate the countdown a selfinvoking recursive function
	(function countDown(i){
	setTimeout(function(){
			$('.countdown').remove();
			$('.centerBox').append('<div class="countdown">'+i+'</div>');
			if(i--){countDown(i);}
			else{
			$('.countdown').remove();
			drawSnapShot();}
		}, 1000);})(3);
	
	//for when the countdown is finished draw the snapshot
	function drawSnapShot(){
		c.drawImage(video,0,0,canvas.width,canvas.height);
		$('#videoDiv').toggle();
		$('#app').toggle();
		$('#takePic').unbind('click');
		$('#takePic').remove();
		$('.previous').append('<a href="#" id="tryAgain">Try Again</a>');
		$("#tryAgain").click(function(){
			tryAgain();
		});
		$('.next').append('<a href="#" id="saveIt">Save It</a>');
		$("#saveIt").click(function(){
			saveImg();
		});
	}
}

//take another picture?
function tryAgain() {
	$('#tryAgain').unbind('click');
	$('#tryAgain').remove();
	$('#saveIt').unbind('click');
	$('#saveIt').remove();
	$('.next').append('<a href="#" id="takePic">Take Picture</a>');
	$("#takePic").click(function(){
		snapshot();
	});
	$('#videoDiv').toggle();
	$('#app').toggle();
}

//for when the save button is clicked the image is saved
function saveImg(){
	img = document.createElement("img");
	img.src = canvas.toDataURL("image/png");
	var form = document.getElementById("save");
	sendToServer(img.src);
	img.style.padding = 5;
	img.width= canvas.width /2 ;
	img.height= canvas.height/2 ;
	$('#videoDiv, #splash').remove()
	$('#centerBox').animate({width:'400px', float: 'left', clear: 'right', margin: '0 10px'}, 1000,function(){});	$('#photo').animate({width:'100%',height:'100%'},1000,function(){$('#centerBox').attr('id','leftBox');$('#leftBox').after(callForm());});
	
	//call form data for right hand side
	function callForm() {
		return $.get("form.php",function(){});
	}
	
	$('#saveIt').unbind('click');
	$('#saveIt').remove();
}


//User JQuery's $.ajax or $.post
function sendToServer(img_base64){	
	$.post("save.php", { save: img_base64},
	
	function(d) {
	  imageFileName = d;
	});	
}

//Write Page
$(document).ready(function() {

	$('.next').append('<a href="#" id="takePic">Take Picture</a>');
	
	 //add click listeners
	$("#takePic").click(function(){
		snapshot();
	});


});
