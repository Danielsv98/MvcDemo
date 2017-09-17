$(function () {
	// Constants
	var soQuestionsWidgetId = 1;
	var soUsersWidgetId = 2;
	var ghRepositoriesWidgetId = 3;
	var countriesFilterWidgetId = 4;

	// Variables
	var questionsSettings;
	var questionsViewModel;
	var usersSettings;
	var usersViewModel;
	var repositoriesSettings;
	var repositoriesViewModel;
	var countriesSettings;
	var countriesViewModel;

	// Initializations
	setupWidgets();
	getWidgetSettings(soQuestionsWidgetId, loadStackOverflowQuestions);
	getWidgetSettings(soUsersWidgetId, loadStackOverflowUsers);
	getWidgetSettings(ghRepositoriesWidgetId, loadGithubRepositories);
	getWidgetSettings(countriesFilterWidgetId, loadCountries);
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

		// Users widget
		usersViewModel = new WidgetViewModel();
		var widget2 = $('#so_users')[0];
		ko.applyBindings(usersViewModel, widget2);

		// Countries widget
		repositoriesViewModel = new WidgetViewModel();
		var widget3 = $('#gh_repos')[0];
		ko.applyBindings(repositoriesViewModel, widget3);

		// Countries widget
		countriesViewModel = new WidgetViewModel();
		var widget4 = $('#countries_filter')[0];
		ko.applyBindings(countriesViewModel, widget4);


	}

	function setupModals() {
		// Open modals
		$('#so-questions-modal').on('show.bs.modal', setupQuestionsModal);
		$('#so-users-modal').on('show.bs.modal', setupUsersModal);
		$('#gh-repos-modal').on('show.bs.modal', setupRepositoriesModal);
		$('#countries-filter-modal').on('show.bs.modal', setupCountriesModal);


		// Save buttons
		$('#so-questions-modal').find('.btn-primary').click(saveStackOverflowQuestionsSettings);
		$('#so-users-modal').find('.btn-primary').click(saveStackOverflowUsersSettings);
		$('#gh-repos-modal').find('.btn-primary').click(saveGihubRepositoriesSettings);
		$('#countries-filter-modal').find('.btn-primary').click(saveCountriesSettings);

	}

	// Stack Overflow Questions Widget
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

	// Stack Overflow Users Widget
	function setupUsersModal() {
		var modal = $(this);
		if (usersSettings != null) {
			for (var i = 0; i < usersSettings.length; i++) {
				var setting = usersSettings[i];
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

	function loadStackOverflowUsers(settings) {

		usersViewModel.loading(true);

		usersSettings = settings;
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
				if (data != null && data.items != null) {
					$.each(data.items, function (index, item) {
						if (item.age === undefined) {
							item.age = '--';
						}
					});
					usersViewModel.items(data.items);
				}

				usersViewModel.loading(false);
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

	// Github Repositories Widget
	function setupRepositoriesModal() {
		var modal = $(this);
		if (repositoriesSettings != null) {
			for (var i = 0; i < repositoriesSettings.length; i++) {
				var setting = repositoriesSettings[i];
				switch (setting.settingName) {
					case 'reposName':
						modal.find('#reposName').val(setting.settingValue);
						break;
				}
			}
		}
	}

	function loadGithubRepositories(settings) {

		repositoriesViewModel.loading(true);

		repositoriesSettings = settings;

		var url = gitHubApi + "users/";

		if (settings != null && settings.length > 0) {
			url += settings[0].settingValue;
		}
		else {
			url += "Danielsv98";
		}

		url += "/repos";
		
		$.ajax({
			url: url,
			type: "GET",
			dataType: "json",
			cache: false,
			success: function (items) {
				if (items != null) {
					repositoriesViewModel.items(items);
				}
				repositoriesViewModel.loading(false);
			},
			error: mvcDemo.showError
		});
	}

	function saveGihubRepositoriesSettings(e) {
		e.preventDefault();

		var modal = $('#gh-repos-modal');

		var reposName = modal.find('#reposName').val();

		var settings = [
			{
				"settingName": "reposName",
				"settingValue": reposName
			}
		];

		saveWidgetSettings(ghRepositoriesWidgetId, settings, function () {
			loadGithubRepositories(settings);
		});
	}

	// Countries Filter Widget
	function setupCountriesModal() {
		var modal = $(this);
		if (countriesSettings != null) {
			for (var i = 0; i < countriesSettings.length; i++) {
				var setting = countriesSettings[i];
				switch (setting.settingName) {
					case 'region':
						modal.find('#selRegion').val(setting.settingValue);
						break;
				}
			}
		}
	}

	function loadCountries(settings) {

		countriesViewModel.loading(true);

		countriesSettings = settings;
		var url = countriesApi + "regionalbloc/";

		if (settings != null && settings.length > 0) {
			url += settings[0].settingValue;
		}
		else {
			url += "eu";
		}

		$.ajax({
			url: url,
			type: "GET",
			dataType: "json",
			cache: false,
			success: function (data) {
				if (data != null) {
					countriesViewModel.items(data);
				}

				countriesViewModel.loading(false);
			},
			error: function () {
				$("#errorMessage").show();
			}
		});
	}

	function saveCountriesSettings(e) {
		e.preventDefault();

		var modal = $('#countries-filter-modal');

		var region = modal.find('#selRegion').val();

		var settings = [
			{
				"settingName": "region",
				"settingValue": region
			}
		];

		saveWidgetSettings(countriesFilterWidgetId, settings, function () {
			loadCountries(settings);
		});
	}

	// Web API Settings
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