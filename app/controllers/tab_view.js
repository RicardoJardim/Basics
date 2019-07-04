// var args = $.args 			or:
//var args = $.args.vect;

var database = require('database_js');
var alerted = require('alert');

function inicializa()
{

var query = "SELECT id, name, country FROM user";
var rs = database.database_call(query);

var data = [];
var cont = 0;

  while(rs.isValidRow())
  {
  	var z = rs.field(0);
  	var x = rs.field(1);
  	var y = rs.field(2);
  	if(cont == 0)
  	{
  	   data.push(Ti.UI.createTableViewRow({title: x + " - " + y ,header:"Users name", valor: x, id: z, hasCheck : false}));	
  	}
  	else
  	{	
  		data.push(Ti.UI.createTableViewRow({title: x + " - " + y, valor: x , id : z, hasCheck : false})); 	
  	}
  	Ti.API.info(z + " - " + x + " - " + y);
  	
  	rs.next();
  	cont++;
  	
  }

  $.tab_id.data = data;

}

	var label = "";
	var row_id = 0;
	var verify_id = 0;
	var selected_data = [];
	
	
$.tab_id.addEventListener("click", function(e){
	row_id = e.row.id;
		if (e.row.hasCheck == false){
			e.row.hasCheck = true;
			label = e.row.valor;
			selected_data.push(row_id);
			Ti.API.info(label);
		} 
		else{
			e.row.hasCheck = false;
			verify = false;
			selected_data.splice(selected_data.indexOf(row_id),1);
			label = "";
		}		
	Ti.API.info(selected_data);
});

function savethis()
{
	
	var nome = $.names.value;
	
	
	if(selected_data && selected_data.length && nome)
	{	
	//Its possible to make update more than one 
		//FUNCIONA APENAS PARA ARRAYS
		selected_data.forEach(function(element)
          {
			var query = 'UPDATE user SET country = "'+nome +'" WHERE id = "'+element +'" ';
			var nada = database.database_call(query);
		});
		
		alerted.note("SUCESSO");
		$.tab_id.data = [];
		$.names.value = "";
		label = "";
		inicializa();
		vect = null;
	}
	else
	{
		alerted.note("Pick a name first!");
	}
}

function voltar(){
	$.window.remove($.tab_id);
	$.window.remove($.save);
	$.window.remove($.buts);
	$.window.close();
}

inicializa();