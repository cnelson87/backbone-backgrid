
var getAjaxContent = require('./utils/GetAjaxContent');

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
/*
			{
				name: "id", // The key of the model attribute
				label: "ID", // The name to display in the header
				editable: false, // By default every cell in a column is editable, but *ID* shouldn't be
				// Defines a cell type, and ID is displayed as an integer without the ',' separating 1000s.
				// cell: Backgrid.IntegerCell.extend({
				// orderSeparator: ''
				// })
				cell: "integer" // An integer cell is a number cell that displays humanized integers
			},
*/
			{

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
			},
/*
			{
				name: "date",
				label: "Date",
				editable: false,
				cell: "date",
			},
*/
			{
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

};

module.exports = Application;
