
// var Gallery = require('./classes/Gallery');
// var HeroTabs = require('./classes/HeroTabs');
// var ShowMore = require('./classes/ShowMore');




var Application = {
	initialize: function() {
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

		var columns = [
			{
				name: "id", // The key of the model attribute
				label: "ID", // The name to display in the header
				editable: false, // By default every cell in a column is editable, but *ID* shouldn't be
				// Defines a cell type, and ID is displayed as an integer without the ',' separating 1000s.
				cell: Backgrid.IntegerCell.extend({
					orderSeparator: ''
				})
			}, {
				name: "name",
				label: "Name",
				// The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
				cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
			}, {
				name: "pop",
				label: "Population",
				cell: "integer" // An integer cell is a number cell that displays humanized integers
			}, {
				name: "percentage",
				label: "% of World Population",
				cell: "number" // A cell type for floating point value, defaults to have a precision 2 decimal numbers
			}, {
				name: "date",
				label: "Date",
				cell: "date",
			}, {
				name: "url",
				label: "URL",
				cell: "uri" // Renders the value in an HTML anchor element
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



		// Fetch some countries from the url
		territories.fetch({reset: true});





	}

}

module.exports = Application;
