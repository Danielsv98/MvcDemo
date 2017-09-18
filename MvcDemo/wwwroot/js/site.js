$(document).ready(function () {
		$('[data-toggle="tooltip"]').tooltip();
});

$("form").submit(function (event) {

	var recaptcha = $("#g-recaptcha-response").val();
	if (recaptcha === "") {
		event.preventDefault();
		alert("Please check the recaptcha");
	}
});

var mvcDemo = {

};

mvcDemo.showError = function () {
		$("#errorMessage").show();
		$("html, body").animate({ scrollTop: 0 }, "fast");
}