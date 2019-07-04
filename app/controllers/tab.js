var contador = 1;
var database = require('database_js');
var alerted = require('alert');


function inicializa(){

var query = "SELECT name, country FROM user";
var rs = database.database_call(query);
var vect = [];
var vetor = [];

while(rs.isValidRow())
{
	var y = "NOME: " + rs.field(0) + " PAIS: " + rs.field(1) + "\n";
	Ti.API.info(y);
	vect.push(y);

	var x = rs.field(0);
	vetor.push(x);
	rs.next();
}


// preencher os dados no Picker
	var data = [];

	if (contador == 1)
	{

	for(var d = 0; d<=vetor.length;d++)
	{
		for (var i = 0; i < vect.length; i++) {
 	 	data[i] =Ti.UI.createPickerRow({title: vetor[i]});
		}
	}
	//adiciona
		$.picker.add(data);
		texto(vect);
		contador++;
	}
	else
	{
		texto(vect);
	}

}

$.picker.selectionIndicator = true;

// mudar o estado interno
var label = "";
$.picker.addEventListener("change", function(e){
	label = e.row.title;
	Ti.API.info(label);
});

/*
 * Mostrar o texto
 */
function texto(vect)
{

	var texto = "";
	for(var t = 0; t< vect.length;t++){
		texto += vect[t];

	}
	$.area.text = texto;

}

function saveit()
{	
	var vect = [];
	if(label)
	{
		var query ='DELETE FROM user WHERE name =?';
		vect.push(label);
		var nada = database.database_call_algorithm(query,vect);
		alerted.note("Sucesso");
		label = "";
		inicializa();
		vect = null;
	}
	else
	{
		alerted.note("Pick a name first!");
	}
}

inicializa();

function goBack()
{
	$.win.remove($.area);
	$.win.remove($.escolha);
	$.win.remove($.picker);
	$.win.remove($.save);
	$.win.remove($.back);
	$.win.close();
}




