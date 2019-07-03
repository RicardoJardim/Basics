// ====
// POST

	exports.post = function(url, data, callback) {

		// setup
			var postURL = Ti.App.Properties.getString("serverUrl") + url;
				console.log("---------------------------");
				console.log("-- POST - START");
				console.log("-- POST - URL: " + postURL);

		// list data
			for (var child in data) {
				if (data.hasOwnProperty(child)) {
					console.log("-- POST - DATA: " + data[child]);
				}
			}

		// online
			if (Titanium.Network.online) {
				var xhr = Ti.Network.createHTTPClient({
					onload : function() {
						
						// debug
							console.log("-- POST - " + url + " - START");
							console.log("-- POST - " + url + " - STATUS: " + this.status);
							console.log("-- POST - " + url + " - TEXT:   " + this.responseText);
						
						// status ok
							if (this.status == "200") {
								if (checkJSON(this.responseText)) {
									 callback(JSON.parse( this.responseText ));
								}
							}
							console.log("-- POST - " + url + " - END");
					},
					onerror : function(e) {
						alert("erro");
					},
					timeout : 10000
				});
				xhr.open('POST', postURL);
				xhr.send(data);
				
				return response;

		// offline
			} else {
				alert("No internet");
			}
			
	};

// ======
// CHECK JSON 

	function checkJSON(_json) {
		try {
			JSON.parse(_json);
		} catch(e) {
			var alerted = require('alert');
				alerted.show(e);
				alerted = null;
			return false;
		}
		return true;
	}
		
// ===
// GET 

exports.gets = function(url,callback) {
	// setup
		var getURL = Ti.App.Properties.getString("serverUrl") + url;
		console.log("---------------------------");
		console.log("-- GET - START");
		console.log("-- GET - URL: " + getURL);

	// online
		if (Titanium.Network.online) {
			var xhr = Ti.Network.createHTTPClient({
				onload : function() {
					// debug
						console.log("-- GET - " + url + " - START");
						console.log("-- GET - " + url + " - STATUS: " + this.status);
						console.log("-- GET - " + url + " - TEXT:   " + this.responseText);
					// status ok
						if (this.status == "200") {
							if(checkJSON(this.responseText))
							{
								callback(JSON.parse(this.responseText));
							}
							else
							{
								alert("Server failed");
							}
						}
					console.log("-- GET - " + url + " - END");
				},
				
				onerror : function(e) {
					Ti.API.debug(e.error);
					alert("Erro");
					error = e;
				},
				timeout : 10000
			});
			
			xhr.open('GET', getURL);
			xhr.send();

	// offline
		}
		 else {
			alert("No internet");
				
			}
};


