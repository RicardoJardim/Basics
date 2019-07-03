// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var name = Ti.App.Properties.getString("name");
var country = Ti.App.Properties.getString("country");
var alerted = require('alert');

var database = require('database_js');
args.push(name,country);

function texto(vect)
{
	var texto = "";
	vect.forEach(function(element){
		texto += element +"\n";
	});
	$.coord.text = texto;
}

$.report.addEventListener('open',function(){
	if(args && args.length )
	{
		texto(args);
	}
	else{
		
		alerted.note("Go to back please");
	}

});

function salvar(){
	var country = $.nome.value;
	
	if (country){
		var query = 'UPDATE user SET country = "'+country +'" WHERE name = "'+ name +'" ';
		var nada = database.database_call(query);
		Ti.App.Properties.setString("country",country);
		alerted.note("Sucesso");
		$.nome.value = "";
	}
	else {
		alerted.note("É obrigatorio preencher o campo!");

	}
	
}


