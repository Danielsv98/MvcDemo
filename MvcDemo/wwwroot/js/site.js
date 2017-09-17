$(document).ready(function () {
		$('[data-toggle="tooltip"]').tooltip();
});

var mvcDemo = {

};

mvcDemo.showError = function () {
		$("#errorMessage").show();
		$("html, body").animate({ scrollTop: 0 }, "fast");
}