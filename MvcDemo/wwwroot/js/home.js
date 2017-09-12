$(function () {
	// Constants
	var soQuestionsWidgetId = 1;
	var soUsersWidgetId = 2;

	// Variables
	var questionsSettings;
	var questionsViewModel;

	// Initializations
	setupWidgets();
	getWidgetSettings(soQuestionsWidgetId, loadStackOverflowQuestions);
	getWidgetSettings(soUsersWidgetId, loadStackOverflowUsers);
	getWidgetSettings(3, loadGithubRepositories);
	setupModals();

	// View Models
	function WidgetViewModel() {
		this.loading = ko.observable(true);
		this.items = ko.observableArray();
	}

	// Private Methods
	function setupWidgets()
	{
		// Questions widget
		questionsViewModel = new WidgetViewModel();
		var widget = $('#so_questions')[0];
		ko.applyBindings(questionsViewModel, widget);
	}

	function setupModals() {
		// Open modals
		$('#so-questions-modal').on('show.bs.modal', setupQuestionsModal);

		// Save buttons
		$('#so-questions-modal').find('.btn-primary').click(saveStackOverflowQuestionsSettings);
		$('#so-users-modal').find('.btn-primary').click(saveStackOverflowUsersSettings);
	}

	// Setup Settings Modal
	function setupQuestionsModal() {
		var modal = $(this);
		if (questionsSettings != null) {
			for (var i = 0; i < questionsSettings.length; i++) {
				var setting = questionsSettings[i];
				switch (setting.settingName) {
					case 'sort':
						modal.find('#selCategory').val(setting.settingValue);
						break;

					case 'order':
						modal.find('input[name=order]').filter('[value="' + setting.settingValue + '"]').attr('checked', true);
						break;
				}
			}
		}
	}

	function loadStackOverflowQuestions(settings) {

		questionsViewModel.loading(true);

		questionsSettings = settings;
		var url = stackOverflowApi + "questions?page=1&pagesize=5&site=stackoverflow";

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
				if (data != null && data.items != null) {
					questionsViewModel.items(data.items);
				}

				questionsViewModel.loading(false);
			},
			error: function () {
				$("#errorMessage").show();
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

		var url = stackOverflowApi + "users?page=1&pagesize=5&site=stackoverflow";

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
					$.each(data.items, function (index, item) {
						if (item.age === undefined) {
							item.age = '--';
						}
					});
					widgetViewModel.items = data.items;
				}
				var widget = $('#so_users')[0];
				ko.cleanNode(widget);
				ko.applyBindings(widgetViewModel, widget);
			},
			error: function () {
				$("#errorMessage").show();
			}
		});
	}

	function saveStackOverflowUsersSettings(e) {
		e.preventDefault();

		var modal = $('#so-users-modal');

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

		saveWidgetSettings(soUsersWidgetId, settings, function () {
			loadStackOverflowUsers(settings);
		});
	}

	function loadGithubRepositories(settings) {
		$.ajax({
			url: gitHubApi + "users/Danielsv98/repos",
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
				$("#errorMessage").show();
			}
		});
	}

	function getWidgetSettings(widgetId, callback) {
		$.ajax({
			url:  demoApi + "api/widget/" + widgetId + "/settings",
			type: "GET",
			dataType: "json",
			cache: false,
			success: function (settings) {
				callback(settings);
			},
			error: function () {
				$("#errorMessage").show();
			}
		});
	}

	function saveWidgetSettings(widgetId, settings, callback) {

		$.ajax({
			url: demoApi + 'api/widget/' + widgetId + '/settings',
			type: "PUT",
			contentType: 'application/json',
			data: JSON.stringify(settings),
			success: function (data) {
				callback();
			},
			error: function () {
				$("#errorMessage").show();
			}
		});
	}
});