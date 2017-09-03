$(function () {
	// Initializations
	loadStackOverflowAnswers();
	loadStackOverflowUsers();

	// Private Methods
	function loadStackOverflowAnswers() {
		$.ajax({
			url: "https://api.stackexchange.com/2.2/questions?page=1&pagesize=5&order=desc&sort=hot&site=stackoverflow",
			type: "GET",
			dataType: "json",
			cache: false,
			success: function (data) {
				console.log(data);
				var table = $('<table></table>');
				table.addClass('table table-striped');
				var header = $('<thead></thead>');
				var headerRow = $('<tr></tr>');
				headerRow.append('<th>Title</th>');
				headerRow.append('<th>Answers</th>');
				header.html(headerRow);
				table.append(header);
				var body = $('<tbody></tbody>');
				table.append(body);
				if (data != null && data.items != null) {
					$.each(data.items, function (index, item) {
						var row = $('<tr></tr>');

						var colTitle = $('<td></td>');
						var link = $('<a></a>');
						link.addClass('ellipse');
						link.html(item.title);
						link.attr('href', item.link);
						link.attr('target', '_blank');
						colTitle.append(link);

						var colAnswers = $('<td></td>');
						colAnswers.append(item.answer_count);

						row.append(colTitle);
						row.append(colAnswers);

						body.append(row);
					});
				}
				$('#so_questions .card-block').html(table);
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
				console.log(data);
				var table = $('<table></table>');
				table.addClass('table table-striped');
				var header = $('<thead></thead>');
				var headerRow = $('<tr></tr>');
				headerRow.append('<th>User Name</th>');
				headerRow.append('<th>Reputation</th>');
				header.html(headerRow);
				table.append(header);
				var body = $('<tbody></tbody>');
				table.append(body);
				if (data != null && data.items != null) {
					$.each(data.items, function (index, item) {
						var row = $('<tr></tr>');

						var colName = $('<td></td>');
						var userlink = $('<a></a>');
						userlink.addClass('ellipse');
						userlink.html(item.display_name);
						userlink.attr('href', item.link);
						userlink.attr('target', '_blank');
						colName.append(userlink);

						var colReputation = $('<td></td>');
						colReputation.append(item.reputation);

						row.append(colName);
						row.append(colReputation);

						body.append(row);
					});
				}
				$('#so_users .card-block').html(table);
			},
			error: function () {
				alert('Error');
			}
		});
	}
});