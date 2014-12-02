/*********************************************
* event.js
*
* gets the content of a JSON array using Ajax
*
*********************************************/

window.onload = init;

function init() {
	getPosts();
}



/*
uses XMLHttpRequest Level2 - newer versions of
Firefox, Chrome, and Safarai only.
*/
function getPosts() {
	var url = "http://localhost:8888/posts.json";
	var request = new XMLHttpRequest();
	request.open("GET", url);
	request.onload = function() {
		if (request.status == 200) {
			var ul = document.getElementById("posts");
			var posts = JSON.parse(request.responseText);
			for (var i=0; i < posts.length; i++) {
				var li = document.createElement("li");
				li.innerHTML = posts[i];
				ul.insertBefore(li, ul.firstChild);	
			}
		}
	};
	request.send(null);	
	
					
}	

