$(document).ready(function() {
	var API_URL = 'http://127.0.0.1:8000/api/';
	var tags = [];
	var newtagInput = $('#nuevaTag');
	var tagsContainer = $('#tagsContainer');

	var drawtags = function () {
		tagsContainer.empty();

		if (tags.length == 0) {
			tagsContainer.append('<li class="tag-item">No tienes etiquetas pendientes</li>');
		} else {
			var contentToAdd = '';

			for (var i = 0; i < tags.length; i++) {
				contentToAdd += '<li class="tag-item"><input type="text" class="update-tag-input" value="' + tags[i].name + '" required><button class="deletetag" data-tag-id="' + tags[i].id + '">Borrar</button></li>';
			}

			tagsContainer.append(contentToAdd);
		}
	};

	var createtag = function (name) {
		var success = function(data) {
			newtagInput.val('');
			tags.push(data);
			drawtags();
		};

		var data = {
			'name': name
		};

		$.ajax({
			type: "POST",
			url: API_URL + "tags",
			data: data,
			success: success
		})
		.fail(function (error) {
			console.error("Error creando etiqueta.", error);
		});
	}

	var gettags = function () {
		var success = function(data) {
			tags = data;
			drawtags();
		}

		var error = function(error) {
			console.error("Error cargando etiquetas.", error);
		}

		var complete = function(object, textStatus) {
			if (textStatus == 'error') {
				console.log("Ha habido un error, revisalo.");
			} else {
				console.log("Todo ha ido de forma correcta.")
			}
		}


		$.ajax({
			type: "GET",
			url: API_URL + "tags",
			success: success,
			error: error,
			complete: complete
		});
	}

	var deletetag = function(id) {
		$.ajax({
			type: "DELETE",
			url: API_URL + "tags/" + id
		})
		.done(function(data){
			tags = $.grep(tags, function(item){
				return item.id != id;
			});

			drawtags();
		})
		.fail(function(error) {
			console.error("Error eliminando etiqueta", error);
		})
		.always(function(object, status, error){
			console.log(object, status, error);
		});
	}

	var updatetag = function(id, name) {
		var data = {
			'name': name
		}

		$.ajax({
			type: "PUT",
			url: API_URL + "tags/" + id,
			data: data
		})
		.done(function(data){
			for (var i = 0; i < tags.length; i++){
				if(tags[i].id == id) {
					tags[i].name = name;
				}
			}

			drawtags();
		})
		.fail(function(error) {
			console.error("Error actualizando etiqueta", error);
		})
	}


	$('#sendNewTags').on("click", function(event){
		if (newtagInput.val() != '') {
			event.preventDefault();
			createtag(newtagInput.val());
		}
	});

	$(document).on("click", ".deletetag", function(event){
		var id = $(this).data('tagId');
		deletetag(id);
	});

	$(document).on("blur", ".update-tag-input", function(event){
		var newName = $(this).val();
		var id = $(this).siblings('.deletetag').data("tagId");
		updatetag(id, newName);
	});

	$(document).dblclick(function(event){
		console.log("Has puslado la tecla " + event.which);
	})


	gettags();

});
