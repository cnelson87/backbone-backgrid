(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

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

},{"./utils/GetAjaxContent":3}],2:[function(require,module,exports){

var application = require('./Application');

$(function() {
	application.initialize();
});

},{"./Application":1}],3:[function(require,module,exports){
/**
 *	returns an Ajax GET request using deferred, url is required, dataType is optional
 */

var GetAjaxContent = function(url, dataType) {
	return $.ajax({
		type: 'GET',
		url: url,
		dataType: dataType || 'json'
	});
};

module.exports = GetAjaxContent;

},{}]},{},[2])