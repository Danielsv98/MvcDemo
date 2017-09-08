$(function () {
	// Constants
	var soQuestionsWidgetId = 1;

	// Initializations
	getWidgetSettings(soQuestionsWidgetId, loadStackOverflowQuestions);
	getWidgetSettings(2, loadStackOverflowUsers);
	getWidgetSettings(3, loadGithubRepositories);
	setupModals();

	// View Models
	function WidgetViewModel() {
		this.items = [];
	}

	// Private Methods
	function setupModals() {
		$('#so-questions-modal').find('.btn-primary').click(saveStackOverflowQuestionsSettings);
	}

	function loadStackOverflowQuestions(settings) {

		var url = "https://api.stackexchange.com/2.2/questions?page=1&pagesize=5&site=stackoverflow";

		if (settings != null) {
			for (var i = 0; i < settings.length; i++)
				url += "&" + settings[i].settingName + "=" + settings[i].settingValue;
		}

		$.ajax({
			url: url,
			type: "GET",
			dataType: "json",
			cache: false,
			success: function (data) {
				var widgetViewModel = new WidgetViewModel();
				if (data != null && data.items != null) {
					widgetViewModel.items = data.items;
				}

				var widget = $('#so_questions')[0];
				ko.cleanNode(widget);
				ko.applyBindings(widgetViewModel, widget);
			},
			error: function () {
				alert('Error');
			}
		});
	}

	function saveStackOverflowQuestionsSettings(e) {
		e.preventDefault();

		var modal = $('#so-questions-modal');

		var category = modal.find('#selCategory').val();
		var order = modal.find('input[name=order]:checked').val();

		var settings = [
			{
				"settingName": "sort",
				"settingValue": category
			},
			{
				"settingName": "order",
				"settingValue": order
			}
		];

		saveWidgetSettings(soQuestionsWidgetId, settings, function () {
			loadStackOverflowQuestions(settings);
		});
	}

	function loadStackOverflowUsers(settings) {
		$.ajax({
			url: "https://api.stackexchange.com/2.2/users?page=1&pagesize=5&order=desc&sort=reputation&site=stackoverflow",
			type: "GET",
			dataType: "json",
			cache: false,
			success: function (data) {
				var widgetViewModel = new WidgetViewModel();
				if (data != null && data.items != null) {
					$.each(data.items, function (index, item) {
						if (item.age === undefined) {
							item.age = '--';
						}
					});

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

	function loadGithubRepositories(settings) {
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

	function getWidgetSettings(widgetId, callback) {
		$.ajax({
			url: "http://localhost:59634/api/widget/" + widgetId + "/settings",
			type: "GET",
			dataType: "json",
			cache: false,
			success: function (settings) {
				callback(settings);
			},
			error: function () {
				alert('Error');
			}
		});
	}

	function saveWidgetSettings(widgetId, settings, callback) {

		$.ajax({
			url: 'http://localhost:59634/api/widget/' + widgetId + '/settings',
			type: "PUT",
			contentType: 'application/json',
			data: JSON.stringify(settings),
			success: function (data) {
				callback();
			},
			error: function () {
				alert('Error');
			}
		});
	}
});