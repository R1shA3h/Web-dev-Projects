var n = prompt("Enter Your Name: ");
var ncap = n.slice(0,1);
var rest = n.slice(1,n.length);
alert("Hello " + ncap.toUpperCase() + rest.toLowerCase());