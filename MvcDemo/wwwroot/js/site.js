$(function () {
	// Initializations
	loadStackOverflowQuestions();
	loadStackOverflowUsers();
	loadGithubRepositories();

	// View Models
	function WidgetViewModel() {
		this.items = [];
	}

	// Private Methods
	function loadStackOverflowQuestions() {
		$.ajax({
			url: "https://api.stackexchange.com/2.2/questions?page=1&pagesize=5&order=desc&sort=hot&site=stackoverflow",
			type: "GET",
			dataType: "json",
			cache: false,
			success: function (data) {
				var widgetViewModel = new WidgetViewModel();
				if (data != null && data.items != null) {
					widgetViewModel.items = data.items;
				}

				var widget = $('#so_questions');
				ko.applyBindings(widgetViewModel, widget[0]);
			},
			error: function () {
				alert('Error');
			}
		});
	}

	function loadStackOverflowUsers() {
		$.ajax({
			url: "https://api.stackexchange.com/2.2/users?page=1&pagesize=5&order=desc&sort=reputation&site=stackoverflow",
			type: "GET",
			dataType: "json",
			cache: false,
			success: function (data) {
				var widgetViewModel = new WidgetViewModel();
				if (data != null && data.items != null) {
					widgetViewModel.items = data.items;
				}

				var widget = $('#so_users');
				ko.applyBindings(widgetViewModel, widget[0]);
			},
			error: function () {
				alert('Error');
			}
		});
	}

	function loadGithubRepositories() {
		$.ajax({
			url: "https://api.github.com/users/Danielsv98/repos",
			type: "GET",
			dataType: "json",
			cache: false,
			success: function (items) {
				var widgetViewModel = new WidgetViewModel();
				if (items != null) {
					widgetViewModel.items = items;
				}

				var widget = $('#gh_repos');
				ko.applyBindings(widgetViewModel, widget[0]);
			},
			error: function () {
				alert('Error');
			}
		});
	}


});