;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){

var application = require('./Application');

$(function() {
	application.initialize();
});

},{"./Application":2}],2:[function(require,module,exports){

var getAjaxContent = require('./utilities/GetAjaxContent');

var Application = {
	initialize: function() {
		var self = this;

		$.when(getAjaxContent('/data/territories.json')).done(function(response) {
			self.buildTable(response);
		}).fail(function(error) {
			console.log(error);
		});

	},

	buildTable: function(data) {
		//console.log('Application:initialize');
		var self = this;
		var $document = $(document);
		var $body = $('body');

		var $elTarget = $('#data-target');

		var Territory = Backbone.Model.extend({});

		var Territories = Backbone.PageableCollection.extend({
			model: Territory,
			url: '/data/territories.json',
			state: {
				pageSize: 20
			},
			mode: 'client'
		});

		var territories = new Territories();
		territories.add(data);

		var columns = [
			{
			// 	name: "id", // The key of the model attribute
			// 	label: "ID", // The name to display in the header
			// 	editable: false, // By default every cell in a column is editable, but *ID* shouldn't be
			// 	// Defines a cell type, and ID is displayed as an integer without the ',' separating 1000s.
			// 	// cell: Backgrid.IntegerCell.extend({
			// 	// 	orderSeparator: ''
			// 	// })
			// 	cell: "integer" // An integer cell is a number cell that displays humanized integers
			// }, {
				name: "name",
				url: "url",
				label: "Name",
				editable: false,
				cell: "link"
			}, {
				name: "population",
				label: "Population",
				editable: false,
				cell: "integer" // An integer cell is a number cell that displays humanized integers
			}, {
				name: "percentage",
				label: "% of World Population",
				editable: false,
				cell: "number" // A cell type for floating point value, defaults to have a precision 2 decimal numbers
			// }, {
			// 	name: "date",
			// 	label: "Date",
			// 	editable: false,
			// 	cell: "date",
			}, {
				name: "date",
				label: "Year",
				editable: false,
				cell: Backgrid.Extension.MomentCell.extend({
					className: "date-cell",
					displayFormat: "YYYY"
				})
			}
		];

		// Initialize a new Grid instance
		var grid = new Backgrid.Grid({
			columns: columns,
			collection: territories
		});

		// Render the grid and attach the root to your HTML document
		$elTarget.append(grid.render().$el);

		// Initialize the paginator
		var paginator = new Backgrid.Extension.Paginator({
			collection: territories
		});

		// Render the paginator
		$elTarget.append(paginator.render().$el);

		// Initialize a client-side filter to filter on the client
		// mode pageable collection's cache.
		var filter = new Backgrid.Extension.ClientSideFilter({
			tagName: "fieldset",
			placeholder: "Keyword Search",
			collection: territories.fullCollection,
			fields: ['name']
		});

		$elTarget.prepend(filter.render().$el);

		// Fetch some countries from the url
		//territories.fetch({reset: true});

	}

}

module.exports = Application;

},{"./utilities/GetAjaxContent":3}],3:[function(require,module,exports){

/**
*	returns an Ajax GET request using deferred, url is required, dataType is optional
**/
var GetAjaxContent = function(url, dataType) {
	return $.ajax({
		type: 'GET',
		url: url,
		dataType: dataType || 'json'
	});
};

module.exports = GetAjaxContent;

},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvY2hyaXNuL1NpdGVzL0dpdEh1Yi9jbmVsc29uODcvYmFja2JvbmUtYmFja2dyaWQvc3JjL3NjcmlwdHMvaW5pdGlhbGl6ZS5qcyIsIi9Vc2Vycy9jaHJpc24vU2l0ZXMvR2l0SHViL2NuZWxzb244Ny9iYWNrYm9uZS1iYWNrZ3JpZC9zcmMvc2NyaXB0cy9BcHBsaWNhdGlvbi5qcyIsIi9Vc2Vycy9jaHJpc24vU2l0ZXMvR2l0SHViL2NuZWxzb244Ny9iYWNrYm9uZS1iYWNrZ3JpZC9zcmMvc2NyaXB0cy91dGlsaXRpZXMvR2V0QWpheENvbnRlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJcbnZhciBhcHBsaWNhdGlvbiA9IHJlcXVpcmUoJy4vQXBwbGljYXRpb24nKTtcblxuJChmdW5jdGlvbigpIHtcblx0YXBwbGljYXRpb24uaW5pdGlhbGl6ZSgpO1xufSk7XG4iLCJcbnZhciBnZXRBamF4Q29udGVudCA9IHJlcXVpcmUoJy4vdXRpbGl0aWVzL0dldEFqYXhDb250ZW50Jyk7XG5cbnZhciBBcHBsaWNhdGlvbiA9IHtcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0JC53aGVuKGdldEFqYXhDb250ZW50KCcvZGF0YS90ZXJyaXRvcmllcy5qc29uJykpLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0XHRcdHNlbGYuYnVpbGRUYWJsZShyZXNwb25zZSk7XG5cdFx0fSkuZmFpbChmdW5jdGlvbihlcnJvcikge1xuXHRcdFx0Y29uc29sZS5sb2coZXJyb3IpO1xuXHRcdH0pO1xuXG5cdH0sXG5cblx0YnVpbGRUYWJsZTogZnVuY3Rpb24oZGF0YSkge1xuXHRcdC8vY29uc29sZS5sb2coJ0FwcGxpY2F0aW9uOmluaXRpYWxpemUnKTtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0dmFyICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuXHRcdHZhciAkYm9keSA9ICQoJ2JvZHknKTtcblxuXHRcdHZhciAkZWxUYXJnZXQgPSAkKCcjZGF0YS10YXJnZXQnKTtcblxuXHRcdHZhciBUZXJyaXRvcnkgPSBCYWNrYm9uZS5Nb2RlbC5leHRlbmQoe30pO1xuXG5cdFx0dmFyIFRlcnJpdG9yaWVzID0gQmFja2JvbmUuUGFnZWFibGVDb2xsZWN0aW9uLmV4dGVuZCh7XG5cdFx0XHRtb2RlbDogVGVycml0b3J5LFxuXHRcdFx0dXJsOiAnL2RhdGEvdGVycml0b3JpZXMuanNvbicsXG5cdFx0XHRzdGF0ZToge1xuXHRcdFx0XHRwYWdlU2l6ZTogMjBcblx0XHRcdH0sXG5cdFx0XHRtb2RlOiAnY2xpZW50J1xuXHRcdH0pO1xuXG5cdFx0dmFyIHRlcnJpdG9yaWVzID0gbmV3IFRlcnJpdG9yaWVzKCk7XG5cdFx0dGVycml0b3JpZXMuYWRkKGRhdGEpO1xuXG5cdFx0dmFyIGNvbHVtbnMgPSBbXG5cdFx0XHR7XG5cdFx0XHQvLyBcdG5hbWU6IFwiaWRcIiwgLy8gVGhlIGtleSBvZiB0aGUgbW9kZWwgYXR0cmlidXRlXG5cdFx0XHQvLyBcdGxhYmVsOiBcIklEXCIsIC8vIFRoZSBuYW1lIHRvIGRpc3BsYXkgaW4gdGhlIGhlYWRlclxuXHRcdFx0Ly8gXHRlZGl0YWJsZTogZmFsc2UsIC8vIEJ5IGRlZmF1bHQgZXZlcnkgY2VsbCBpbiBhIGNvbHVtbiBpcyBlZGl0YWJsZSwgYnV0ICpJRCogc2hvdWxkbid0IGJlXG5cdFx0XHQvLyBcdC8vIERlZmluZXMgYSBjZWxsIHR5cGUsIGFuZCBJRCBpcyBkaXNwbGF5ZWQgYXMgYW4gaW50ZWdlciB3aXRob3V0IHRoZSAnLCcgc2VwYXJhdGluZyAxMDAwcy5cblx0XHRcdC8vIFx0Ly8gY2VsbDogQmFja2dyaWQuSW50ZWdlckNlbGwuZXh0ZW5kKHtcblx0XHRcdC8vIFx0Ly8gXHRvcmRlclNlcGFyYXRvcjogJydcblx0XHRcdC8vIFx0Ly8gfSlcblx0XHRcdC8vIFx0Y2VsbDogXCJpbnRlZ2VyXCIgLy8gQW4gaW50ZWdlciBjZWxsIGlzIGEgbnVtYmVyIGNlbGwgdGhhdCBkaXNwbGF5cyBodW1hbml6ZWQgaW50ZWdlcnNcblx0XHRcdC8vIH0sIHtcblx0XHRcdFx0bmFtZTogXCJuYW1lXCIsXG5cdFx0XHRcdHVybDogXCJ1cmxcIixcblx0XHRcdFx0bGFiZWw6IFwiTmFtZVwiLFxuXHRcdFx0XHRlZGl0YWJsZTogZmFsc2UsXG5cdFx0XHRcdGNlbGw6IFwibGlua1wiXG5cdFx0XHR9LCB7XG5cdFx0XHRcdG5hbWU6IFwicG9wdWxhdGlvblwiLFxuXHRcdFx0XHRsYWJlbDogXCJQb3B1bGF0aW9uXCIsXG5cdFx0XHRcdGVkaXRhYmxlOiBmYWxzZSxcblx0XHRcdFx0Y2VsbDogXCJpbnRlZ2VyXCIgLy8gQW4gaW50ZWdlciBjZWxsIGlzIGEgbnVtYmVyIGNlbGwgdGhhdCBkaXNwbGF5cyBodW1hbml6ZWQgaW50ZWdlcnNcblx0XHRcdH0sIHtcblx0XHRcdFx0bmFtZTogXCJwZXJjZW50YWdlXCIsXG5cdFx0XHRcdGxhYmVsOiBcIiUgb2YgV29ybGQgUG9wdWxhdGlvblwiLFxuXHRcdFx0XHRlZGl0YWJsZTogZmFsc2UsXG5cdFx0XHRcdGNlbGw6IFwibnVtYmVyXCIgLy8gQSBjZWxsIHR5cGUgZm9yIGZsb2F0aW5nIHBvaW50IHZhbHVlLCBkZWZhdWx0cyB0byBoYXZlIGEgcHJlY2lzaW9uIDIgZGVjaW1hbCBudW1iZXJzXG5cdFx0XHQvLyB9LCB7XG5cdFx0XHQvLyBcdG5hbWU6IFwiZGF0ZVwiLFxuXHRcdFx0Ly8gXHRsYWJlbDogXCJEYXRlXCIsXG5cdFx0XHQvLyBcdGVkaXRhYmxlOiBmYWxzZSxcblx0XHRcdC8vIFx0Y2VsbDogXCJkYXRlXCIsXG5cdFx0XHR9LCB7XG5cdFx0XHRcdG5hbWU6IFwiZGF0ZVwiLFxuXHRcdFx0XHRsYWJlbDogXCJZZWFyXCIsXG5cdFx0XHRcdGVkaXRhYmxlOiBmYWxzZSxcblx0XHRcdFx0Y2VsbDogQmFja2dyaWQuRXh0ZW5zaW9uLk1vbWVudENlbGwuZXh0ZW5kKHtcblx0XHRcdFx0XHRjbGFzc05hbWU6IFwiZGF0ZS1jZWxsXCIsXG5cdFx0XHRcdFx0ZGlzcGxheUZvcm1hdDogXCJZWVlZXCJcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHRdO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBhIG5ldyBHcmlkIGluc3RhbmNlXG5cdFx0dmFyIGdyaWQgPSBuZXcgQmFja2dyaWQuR3JpZCh7XG5cdFx0XHRjb2x1bW5zOiBjb2x1bW5zLFxuXHRcdFx0Y29sbGVjdGlvbjogdGVycml0b3JpZXNcblx0XHR9KTtcblxuXHRcdC8vIFJlbmRlciB0aGUgZ3JpZCBhbmQgYXR0YWNoIHRoZSByb290IHRvIHlvdXIgSFRNTCBkb2N1bWVudFxuXHRcdCRlbFRhcmdldC5hcHBlbmQoZ3JpZC5yZW5kZXIoKS4kZWwpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSB0aGUgcGFnaW5hdG9yXG5cdFx0dmFyIHBhZ2luYXRvciA9IG5ldyBCYWNrZ3JpZC5FeHRlbnNpb24uUGFnaW5hdG9yKHtcblx0XHRcdGNvbGxlY3Rpb246IHRlcnJpdG9yaWVzXG5cdFx0fSk7XG5cblx0XHQvLyBSZW5kZXIgdGhlIHBhZ2luYXRvclxuXHRcdCRlbFRhcmdldC5hcHBlbmQocGFnaW5hdG9yLnJlbmRlcigpLiRlbCk7XG5cblx0XHQvLyBJbml0aWFsaXplIGEgY2xpZW50LXNpZGUgZmlsdGVyIHRvIGZpbHRlciBvbiB0aGUgY2xpZW50XG5cdFx0Ly8gbW9kZSBwYWdlYWJsZSBjb2xsZWN0aW9uJ3MgY2FjaGUuXG5cdFx0dmFyIGZpbHRlciA9IG5ldyBCYWNrZ3JpZC5FeHRlbnNpb24uQ2xpZW50U2lkZUZpbHRlcih7XG5cdFx0XHR0YWdOYW1lOiBcImZpZWxkc2V0XCIsXG5cdFx0XHRwbGFjZWhvbGRlcjogXCJLZXl3b3JkIFNlYXJjaFwiLFxuXHRcdFx0Y29sbGVjdGlvbjogdGVycml0b3JpZXMuZnVsbENvbGxlY3Rpb24sXG5cdFx0XHRmaWVsZHM6IFsnbmFtZSddXG5cdFx0fSk7XG5cblx0XHQkZWxUYXJnZXQucHJlcGVuZChmaWx0ZXIucmVuZGVyKCkuJGVsKTtcblxuXHRcdC8vIEZldGNoIHNvbWUgY291bnRyaWVzIGZyb20gdGhlIHVybFxuXHRcdC8vdGVycml0b3JpZXMuZmV0Y2goe3Jlc2V0OiB0cnVlfSk7XG5cblx0fVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwbGljYXRpb247XG4iLCJcbi8qKlxuKlx0cmV0dXJucyBhbiBBamF4IEdFVCByZXF1ZXN0IHVzaW5nIGRlZmVycmVkLCB1cmwgaXMgcmVxdWlyZWQsIGRhdGFUeXBlIGlzIG9wdGlvbmFsXG4qKi9cbnZhciBHZXRBamF4Q29udGVudCA9IGZ1bmN0aW9uKHVybCwgZGF0YVR5cGUpIHtcblx0cmV0dXJuICQuYWpheCh7XG5cdFx0dHlwZTogJ0dFVCcsXG5cdFx0dXJsOiB1cmwsXG5cdFx0ZGF0YVR5cGU6IGRhdGFUeXBlIHx8ICdqc29uJ1xuXHR9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gR2V0QWpheENvbnRlbnQ7XG4iXX0=
;