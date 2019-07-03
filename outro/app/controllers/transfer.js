
var http = require('http.js');
var vector = $.args;


function texto(vect)
{
	var texto = "";
	for(var t = 0; t< vect.length;t++){
		texto += vect[t] + " ";
	}
	$.you.text = texto;
}


function goBack()
{	
	$.transfer.remove($.you);
	$.transfer.remove($.views);
	$.transfer.remove($.two);
	$.transfer.remove($.imagem);
	$.transfer.close();
}

texto(vector);


$.two.text = "Loading.."; 	
http.gets("users/3",texto2);
var array = [];

function texto2(data)
{	
	var texto = ""; 
	
	//FUNCIONA APENAS PARA OBJETOS 2 MANEIRAS
	
	/*Object.getOwnPropertyNames(data.data).forEach(function(val) {
	  		console.log(val + ' -> ' + data.data[val]);
	 }); 
	 */
	
	for(var chave in data.data) { 
		
		
		console.log(chave + "->" + data.data[chave]); 
		 if(data.data.avatar == data.data[chave])
		 {
			$.imagem.image = data.data.avatar;
		}
		 else{
		 array.push(data.data[chave] );
		 texto += chave +" - " + data.data[chave] +"\n" ;
		 }
		}

	$.two.text = texto;
			
	var button = Ti.UI.createButton({
		backgroundColor: "#000080",
		title: "SAVE",
		top:"2%",
		color:"#fff",
		borderRadius: "5",	
	});
	
	$.views.add(button);
	
	button.addEventListener('click',save_profile);


}

function save_profile(){
	
	var name = array[1];
	var country = array[2];

	
	Ti.App.Properties.setString("name",name);
	Ti.App.Properties.setString("country",country);
	
	var getName = Ti.App.Properties.getString("name");
	var getCountry = Ti.App.Properties.getString("country");

	var database = require('database_js');
	
	var query = 'SELECT DISTINCT name , country FROM user WHERE name= "'+getName+'"';
	var boll = database.database_check(query);

	var alerted = require('alert');
	
	Ti.API.info(boll);
	var vect=[];
	
	if(boll == false)
	{
		var query = 'INSERT INTO user (name,country) VALUES (?,?)';
		vect[0] = getName ;
		vect[1] = getCountry;
		Ti.API.info(vect);
		var nada = database.database_call_algorithm(query,vect);
		
		alerted.show("Sucesso");
		vect = null;
		goBack();
	}
	else
	{
		alerted.show("Ja existe este utilizador");
		goBack();
	}

}


var camera = Ti.UI.createButton({
    title: 'Camera',
    left:"20%",
});

var cancel = Ti.UI.createButton({
    title: 'Cancel',
    right: "20%"
});

$.toolbar.add(camera);
$.toolbar.add(cancel);





