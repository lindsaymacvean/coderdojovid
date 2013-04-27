
<html>

<head>
<script src="js/jquery.1.7.2.js"></script>
</head>

<body>
	<div id="splash">
		<p id="errorMessage">Loading...</p>
	</div>
	
	<div id="videoDiv">
		<video id="video" autoplay="autoplay"></video>
	</div>
	
<script type="text/javascript">
var video = document.getElementById('video');

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


</script>
</body>

</html>