
var querystring = require("querystring"), 
	fs = require("fs");

var posts = new Array();
//posts[posts.length] = "post1 text";
var json = JSON.stringify(posts);
	
var map = {
	"/" : "/main.html", 
	"/main.html" : "/main.html",
	"/start" : "/main.html", 
	"/events/hostage.html" : "/events/hostage.html",
	"/events/nuclearPower.html" : "/events/nuclearPower.html", 
	"/events/scotland.html" : "/events/scotland.html", 
	"/events/3dPrintedGun.html" : "/events/3dPrintedGun.html",
	"/events/event.html" : "/events/event.html",
	"/events/event" : "/events/event.html", 
	"/profiles/al.html" : "/profiles/al.html"
}

function get(k) {return map[k];}

var extMap = {
	"html" : "text/html", 
	"css" : "text/css", 
	"img" : "img/png", 
	"jpg" : "img/jpg",
	"js": "application/js"
}

function getExtType(k) {return extMap[k];}

function start(response, postData, pathname) {
	console.log("Request handler 'start' was called. " + pathname);
	
	fs.readFile("." + get(pathname), function(error, file) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} 
	else {
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(file); //change body back to file for fs functionallity
			response.end();
		}
	});
}

function upload(response, postData, pathname) {	
	console.log("Request handler 'upload' was called.");
	console.log(pathname);
	
	//response.writeHead(200, {"Content-Type": "text/plain"});
	//response.write("You've sent the text: "+ 
	//querystring.parse(postData).text);
	
	response.writeHead(200, {"Content-Type": "text/html"});
	var body = '<html>'+
	'<body>'+
	'<h3>Thank you for posting to the Rob Ford Saga blog.</h3>'+
	'<a href="/events/event.html">Return to page.</a>'+
	'</body>'+
	'</html>';
	response.write(body);
	
	posts[posts.length] = Date() + ": " + querystring.parse(postData).text;
	json = JSON.stringify(posts);
	
	fs.writeFile("./posts.json", json, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
});

fs.readFile("./main.html", function(error, file) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} 
	else {
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(file); //change body back to file for fs functionallity
			response.end();
		}
	}); 
	
	response.end();
}

function show(response) {
	console.log("Request handler 'show' was called.");
	response.writeHead(200, {"Content-Type": "image/png"});
	fs.createReadStream("/tmp/test.png").pipe(response);	
}

/* 
serves css, js, images, or other required files that a 
page requests. the pathname is the name of the file we 
need to serve. 
*/
function fileHandler(response, postData, pathname) {
	console.log("fileHandler called for" + pathname);
	var ext = pathname.split('.').pop();
	
	fs.readFile("." + pathname, function(error, file) {

	if(error) {
		response.writeHead(500, {"Content-Type": "text/plain"});
		response.write(error + "\n");
		response.end();
		} 
		//need to assign a var to "text/css and then a CASE statement
		//to get functionality for images and other js files.
	else {
		response.writeHead(200, {"Content-Type": getExtType(ext)});
		response.write(file);
		response.end();
		}
	});
}

function getStoreArray(key) {
	var contentArray = localStorage.getItem(key);
	if (contentArray == null || contentArray == "") {
		contentArray = new Array();	
	} else {
		contentArray = JSON.parse(contentArray);	
	}
	return contentArray;
}

function save(item) {
	var contentArray = getStoreArray("postList");
	contentArray.push(item);
	localStorage.setItem("postList", JSON.stringify(contentArray));
}


exports.start = start;
exports.upload = upload;
exports.fileHandler = fileHandler;
exports.show = show;