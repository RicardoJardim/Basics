function call(){
	$.wind.add(view);
	$.wind.remove($.button);
}

var view = Ti.UI.createView({
	backgroundColor: "red",
	top:"20%",
	width: "80%",
	height:"40%",
	borderRadius: "12",
	layout: "composite"
});

var label =  Ti.UI.createLabel({
	text: "Choose GPS or pick a place",
	top: "15%",
	font:{
		 fontSize: 20,
		 fontWeight:"bold"
	}	
});

var pick = Ti.UI.createButton({
    title: 'Pick a place',
    right: "10%",
});

var gps = Ti.UI.createButton({
    title: 'GPS',
    left: "10%",
});

var cancel = Ti.UI.createButton({
    title: 'Cancel',
    right: "10%",
    bottom:"5%"
});

cancel.addEventListener("click",function(){
	$.wind.remove(view);
	$.wind.add($.button);
});
view.add(label);
view.add(pick);
view.add(gps);
view.add(cancel);

function secCall(){
	$.wind.remove(view);
	$.wind.add($.button);
}
