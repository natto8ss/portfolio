// JavaScript Document
var root;
var dir = document.getElementsByTagName('script');
var i = dir.length;
		
while (i--) {
	var match = dir[i].src.match(/(^|.*\/)import\.js$/);
	if (match) {
		root = match[1]		
		break;
	}
}
		
document.write('<script src="'+ root +'copy.js"></script>'); 
document.write('<script src="'+ root +'scroll.js"></script>'); 
document.write('<script src="'+ root +'rollover.js?type=ov"></script>'); 
document.write('<script src="'+ root +'analytics.js"></script>')
document.write('<script src="'+ root +'switch.js"></script>')