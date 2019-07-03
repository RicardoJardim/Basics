var MapModule = require('ti.map');

var rc = MapModule.isGooglePlayServicesAvailable();
switch (rc) {
    case MapModule.SUCCESS:
        Ti.API.info('Google Play services is installed.');
        break;
    case MapModule.SERVICE_MISSING:
        alert('Google Play services is missing. Please install Google Play services from the Google Play store.');
        break;
    case MapModule.SERVICE_VERSION_UPDATE_REQUIRED:
        alert('Google Play services is out of date. Please update Google Play services.');
        break;
    case MapModule.SERVICE_DISABLED:
        alert('Google Play services is disabled. Please enable Google Play services.');
        break;
    case MapModule.SERVICE_INVALID:
        alert('Google Play services cannot be authenticated. Reinstall Google Play services.');
        break;
    default:
        alert('Unknown error.');
}

/*
  
var bridge = MapModule.createAnnotation({
    latitude: -33.852222,
    longitude: 151.210556,
    centerOffset: { x: 80, y: 25 },
    pincolor: MapModule.ANNOTATION_PURPLE, 
    title: 'Sydney Harbour Bridge',
    subtitle: 'Port Jackson',
    // For eventing, use the Map View's click event
    // and monitor the clicksource property for 'leftButton'.
    leftButton: Ti.UI.createButton({ title: 'Detail' })
});
  */

$.map.addEventListener('open', function() {
    if (Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE)) {
        getLocation();
     } else {
        Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, function(e) {
            if (e.success) {
                getLocation();
            } else {
                alert('Could not obtain location permissions');
            }
        });
    }
});  

var mapview = MapModule.createView({
    mapType: MapModule.NORMAL_TYPE,
    userLocation: true,
    //annotations: []
});

var button = Ti.UI.createButton({
	backgroundColor: "#000080",
	title: "Back",
	layout: "vertical",
	bottom:"20%",
	color:"#fff",
	borderRadius: "5",
	
	
});

var button2 = Ti.UI.createButton({
	backgroundColor: "#000080",
	title: "Change our country",
	layout: "vertical",
	bottom:"10%",
	color:"#fff",
	borderRadius: "5",
	
});


Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;

function getLocation() {
   
    
    Ti.Geolocation.getCurrentPosition(function(e) {
        if (e.error) {
            Ti.API.error('Error: ' + e.error);
        } else {
        	
            // obtain the coords
	        Alloy.Globals.lat = e.coords.latitude;
	        Alloy.Globals.lon = e.coords.longitude;
	        
	        //debug
	        console.log(Alloy.Globals.lat);
			console.log(Alloy.Globals.lon);
	        
	        // set region on map
	        mapview.setLocation({
	        		latitude: Alloy.Globals.lat,
	        		longitude: Alloy.Globals.lon,
	        		latitudeDelta: 0.1,
	        		longitudeDelta:0.1,
	        		animate : true
	        });
	        
        }
    });
}

var args =[];

button.addEventListener('click', goBack);

button2.addEventListener('click',function(){
	
	args.push(Alloy.Globals.lat,Alloy.Globals.lon);
	Ti.API.info(args);
	var next = Alloy.createController('report',args).getView();
	next.open();
	next = null;
	goBack();
	
});

$.map.add(mapview);
$.map.add(button2);
$.map.add(button);

function goBack()
{
	$.map.remove(mapview);
	$.map.remove(button);
	$.map.remove(button2);
	$.map.close();
}

