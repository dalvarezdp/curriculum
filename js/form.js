var form = $("#form-contact");
var inputConocido = $('input[name="opciones_conocerse"]');
var inputNombre = $("#nombre")[0];
var inputEmail = $("#email")[0];
var inputNum = $("#num_contacto");
var inputMensaje = $("#mensaje");
var palabras = 0;


var inputOtros = $('<input>', {
  id: 'inputOtros',
  type: 'text',
  name: 'inputOtros',
  placeholder: 'Otros'
});

var textContador = $('<p>', {
  id: 'contador',
  name: 'contador',
});

inputOtros.prop('required',true);

for (var i = 0; i < inputConocido.length; i++) {
	$(inputConocido[i]).click(function(event){
		if ($(this)[0].value == 'yes') {
			$(this).parent().append(inputOtros);
		} else {
			if($("#inputOtros").length) {
				$(this).parent().children("#inputOtros").remove();
			}
		}
	});
}


$(inputMensaje).keyup(function(){
     palabras = $(this).val().split(/\b[\s,\.\-:;]*/).length;

     textContador.text('Has escrito en total '+ palabras +' palabras')
     $(this).parent().append(textContador);
});


form.submit( function(event){
  var contador = 0;

	if(inputNombre.checkValidity() == false) {
		alert("El nombre es obligatorio.");
		inputNombre.focus();
		event.preventDefault();
		return false;
	}

  if(inputEmail.checkValidity() == false) {
		alert("Escribe un email correcto.");
		inputEmail.focus();
		event.preventDefault();
		return false;
	}

  for (var i = 0; i < inputConocido.length; i++) {

    if(inputConocido[i].checkValidity() == false ){
      contador = contador + 1;
    };
  }

  if(contador == inputConocido.length){
    alert("Selecciona como me has conocido.");
    event.preventDefault();
    return false;
  } else if ($("#inputOtros").length){
    if ($("#inputOtros")[0].checkValidity() == false) {
      alert("El campo otros no puede estar vacío.");
  		$("#inputOtros").focus();
  		event.preventDefault();
  		return false;
    }
  }

  if(inputNum.val().length != 9) {
		alert("Introduce un número de 9 dígitos.");
		inputNum.focus();
		event.preventDefault();
		return false;
	}

  if($(inputMensaje)[0].checkValidity() == false) {
		alert("El mensaje no puede ir vacío.");
		inputMensaje.focus();
		event.preventDefault();
		return false;
    console.log(palabras);
  }else if (palabras > 150) {
    alert("El mensaje no puede tener mas de 150 palabras.");
		inputMensaje.focus();
		event.preventDefault();
		return false;
  }


  event.preventDefault();

});
