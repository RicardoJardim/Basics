


// Instantiate the map
var MapModule = require('ti.map');


/*
 * Instancia a BD
 */

var database = require('database_js');
var alerted = require('alert');
database.install();


function doClick(e)
{
	alert("Ola");
}


function saveall()
{
	var name = $.name.value;
	var country = $.country.value;

	var vect = [];
	console.log(name);
	if (name && country){

		var query = 'INSERT INTO user (name,country) VALUES';
		vect[0] = '"' + name + '"';
		vect[1] = '"'+country+'"';
		var nada = database.database_call_insert_algorithm(query,vect);
	var text = "Success";
	alerted.note(text);
	$.name.value = "";
	$.country.value = "";
	vect = null;
	}
	else {
		var text = "É obrigatorio preencher todos os campos!";
		alerted.note(text);

	}

}


function show()
{
	var query = "SELECT name, country FROM user";
	var rs = database.database_call(query);
	var vect = [];

	while(rs.isValidRow())
	{
		var y = "NOME: " + rs.field(0) + ", PAIS: " + rs.field(1) +"\n";
		vect.push(y);
		rs.next();
	}
	var texto = vect.toString();
	alerted.show(texto);
	
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


cancel.addEventListener('click',function(e){
	
	var next_win = Alloy.createController('cont').getView();
	next_win.open();
	next_win = null;
});



function openNext() {
	var args =["Welcome","to","http","request","example"];
	var next_win = Alloy.createController('transfer',args).getView();
	next_win.open();
	next_win = null;
		
}


function httpcd() {
	var args =["http","request","dinamic","example"];
	var next_win = Alloy.createController('dinamic_transfer',args).getView();
	next_win.open();
	next_win = null;
		
}

function mapas()
{
	var next = Alloy.createController('map').getView();
	next.open();
	next = null;
}


function tabela()
{
	var tabe = Alloy.createController('tab').getView();
	tabe.open();
	tabe=null;
}

function tabela_view()
{
	var tabela = Alloy.createController('tab_view').getView();
	tabela.open();
	tabela=null;
}

$.index.open();
