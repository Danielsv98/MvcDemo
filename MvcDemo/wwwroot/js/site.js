$(document).ready(function () {
		$('[data-toggle="tooltip"]').tooltip();
});

$("form").submit(function (event) {

	var recaptcha = $("#g-recaptcha-response").val();
	if (recaptcha === "") {
		event.preventDefault();
		error: mvcDemo.showError('Please check the reCAPTCHA before continue');
	}
});

var mvcDemo = {

};

mvcDemo.showError = function (message) {
	var errorMessage = $("#errorMessage");
	if (message != null)
		errorMessage.find('#errorBody').html(message);

	errorMessage.show();
	$("html, body").animate({ scrollTop: 0 }, "fast");
}