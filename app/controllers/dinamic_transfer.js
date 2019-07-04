
var http = require('http.js');
var alerted = require('alert');
var database = require('database_js');
var vector = $.args;


function texto(vect)
{
	var texto = "";
	vect.forEach(function(element){
		texto += element + " ";		
	});
	$.you.text = texto;
}

texto(vector);
 	
http.gets("users",texto2);


function texto2(data)
{	
	$.scrollView.remove($.loading);
	
	for(var chave in data.data) { 
		var dados = [];
		console.log(chave + "->" + data.data[chave]);
	
		var view = Ti.UI.createView({
			id : chave,
			borderRadius:10,
		 	layout : 'composite',
		   backgroundColor:"#ffffff",
		   width: 300,
		   height: 200,
		   top: "3%",
		});
		
		var labels = Ti.UI.createLabel({
			id : chave,
			right:"60%",
			color: "black",
			font: {
				fontSize: 18,
				fontFamily: 'Helvetica Neue'
			},
		});		
			
		var imagem = Ti.UI.createImageView({
				id : chave,
				width: Ti.UI.SIZE,
			    height: Ti.UI.SIZE,
			    left:"70%",
		});
		
		var button = Ti.UI.createButton({
				id : chave,
				array :[],
				backgroundColor: "#0047b3",
				touchFeedback : true,
				viewShadowColor :"black",
				viewShadowRadius : 5,
				width: 50,
			    height: 40,
				title: "SAVE",
				top:"40%",
				color:"#fff",
				borderRadius: "5",	
		});
		
		var label_texto = ""; 	
		for(var valor in data.data[chave])
		{
			console.log(valor + "->" + data.data[chave][valor]);
			 if(data.data[chave].avatar == data.data[chave][valor])
			  {
				imagem.image = data.data[chave][valor];
			  }
		 	 else{
				 label_texto += valor +" - " + data.data[chave][valor] +"\n" ;
				 dados.push(data.data[chave][valor]);
		 	  }
		}		
			button.array = dados;
			labels.text = label_texto;
			view.add(labels);
			view.add(button);
			view.add(imagem);
			
			Ti.API.info("-----------"+button.array+"----------------");
			
			button.addEventListener("click",function(e){
				Ti.API.info(e.source.id);
				var send_data = e.source.array;
				Ti.API.info(send_data);
				save_profile(send_data);
				});
			$.scrollView.add(view);	
		}
}

function save_profile(dados_escolhidos){
	
	var name = dados_escolhidos[1];
	var country = dados_escolhidos[2];

	//Funciona 
		
	Ti.App.Properties.setString("name",name);
	Ti.App.Properties.setString("country",country);
	
	var getName = Ti.App.Properties.getString("name");
	var getCountry = Ti.App.Properties.getString("country");
	
	var query = 'SELECT DISTINCT name , country FROM user WHERE name= "'+getName+'"';
	var boll = database.database_check(query);
	
	Ti.API.info(boll);
	var vect=[];
	
	if(boll == false)
	{
		vect.push(getName,getCountry);
		Ti.API.info(vect);
		var query = 'INSERT INTO user (name,country) VALUES (?,?)';
		var nada = database.database_call_algorithm(query,vect);
		
		alerted.note("Sucesso");
		vect = null;
	}
	else
	{
		alerted.note("Ja existe este utilizador");
	}

}

function goBack()
{	
	$.windows.remove($.back);
	$.windows.remove($.scrollView);
	$.windows.close();
}