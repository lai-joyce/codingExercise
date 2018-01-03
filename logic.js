var client;
requirejs(['asana'], function(Asana) {

	//entire response object will be stored in taskData
	function runQuery(numTasks) {

		var client = Asana.
		Client.
		create().
		useAccessToken('0/8fe48d455a97e06cfe999bd01e2b6668');

		client.users.me()
		.then(function(user) {
			var userId = user.id;
		    // The user's "default" workspace is the first one in the list, though
		    // any user can have multiple workspaces so you can't always assume this
		    // is the one you want to work with.
		    var workspaceId = user.workspaces[0].id;
		    return client.tasks.findAll({
		    	assignee: userId,
		    	workspace: workspaceId,
		      //completed_since: 'now',
		      opt_fields: 'id,name,assignee_status,completed'
		  });
		})
		.then(function(response) {
		    // There may be more pages of data, we could stream or return a promise
		    // to request those here - for now, let's just return the first page
		    // of items.
		    return response.data;
		})
		.filter(function(task) {
			return task.completed === false;
		})
		.then(function(list) {

			$("#wellSection").empty();

			for (var i=0; i<list.length; i++) {
				
				var listItem = list[i];

				var taskLinkRoot = "https://app.asana.com/0/509447039615083/";
				
				//start dumping to HTML here
				var wellSection = $("<div>");
				wellSection.addClass("well"); //corresponds to Bootstrap well class
				wellSection.attr("id", "asanaItem" + listItem.id);
				$("#wellSection").append(wellSection);

				wellSection.append("<h3>" + listItem.name + "</h3>");
				wellSection.append("<h4>" + listItem.id + "</h4>");
				wellSection.append("<p><a href=" + taskLinkRoot + listItem.id + ">" + "view task" + "</a></p>");
				wellSection.append("<p><button type='button' class='hideButton'>Hide</button></p>");

			}

		});
		
	}

	$("#searchBtn").on("click", function() {
		//alert("test");

		var numResults;

		runQuery(numResults);

		return false;
	});

	$("#wellSection").on("click", ".hideButton", function() {

		// $("#wellSection").remove();

		// $("#" + listItem.id).empty();

		$(this).parent().parent().hide();

	});
});


