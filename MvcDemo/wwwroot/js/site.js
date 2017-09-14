$(document).ready(function () {
		$('[data-toggle="tooltip"]').tooltip();
});

$('#gh-repos-modal').on('keypress', function (e) {
	return e.which !== 13;
});