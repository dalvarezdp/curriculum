/*
Usando javascript
*/
var navbarItems = $('.navbar-item');

function borrarClaseActiva() {
	$('.navbar-item.active').removeClass('active');
};

function cambiarCSSNavbar() {
  var previous;

  var posicion = $(window).scrollTop();
  var quienSoy = Math.floor($('.quien-soy').offset().top);
  var estudios = Math.floor($('.estudios').offset().top);
  var experiencia = Math.floor($('.experiencia').offset().top);
  var sobreMi = Math.floor($('.sobre-mi').offset().top);
  var contacto = Math.floor($('.contacto').offset().top);


  if (posicion < quienSoy) {
    if(!previous) {
			previous = 1;
		} else if(previous == 1) {
			return false;
		}

    borrarClaseActiva();

    $('a[href$="portada"]').parent().addClass('active');

  }
  else if (posicion >= quienSoy && posicion < estudios ) {
    if(!previous) {
			previous = 2;
		} else if(previous == 2) {
			return false;
		}

    borrarClaseActiva();

    $('a[href$="quien-soy"]').parent().addClass('active');

  } else if (posicion >= estudios && posicion < experiencia ) {
    if(!previous) {
			previous = 3;
		} else if(previous == 3) {
			return false;
		}

    borrarClaseActiva();

    $('a[href$="estudios"]').parent().addClass('active');

  } else if (posicion >= experiencia && posicion < sobreMi ) {
    if(!previous) {
			previous = 4;
		} else if(previous == 4) {
			return false;
		}

    borrarClaseActiva();

    $('a[href$="experiencia"]').parent().addClass('active');

  } else if (posicion >= sobreMi && posicion < contacto ) {
    if(!previous) {
			previous = 5;
		} else if(previous == 5) {
			return false;
		}

    borrarClaseActiva();

    $('a[href$="sobre-mi"]').parent().addClass('active');

  } else if (posicion >= contacto ) {
    if(!previous) {
			previous = 6;
		} else if(previous == 6) {
			return false;
		}

    borrarClaseActiva();

    $('a[href$="contacto"]').parent().addClass('active');

  };
};

$('.navbar-link').click(function(e){
    e.preventDefault();

    borrarClaseActiva();
    $(this).parent().addClass('active');

    var enlace = $(this).attr('href');

    $('html,body').stop().animate({
      scrollTop: $(enlace).offset().top
    }, 1000);

});


$(window).scroll(cambiarCSSNavbar);
