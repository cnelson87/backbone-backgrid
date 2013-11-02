;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){

var application = require('./Application');

$(function() {
	application.initialize();
});

},{"./Application":2}],2:[function(require,module,exports){

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
				// cell: Backgrid.IntegerCell.extend({
				// 	orderSeparator: ''
				// })
				cell: "integer" // An integer cell is a number cell that displays humanized integers
			}, {
				name: "name",
				label: "Name",
				editable: false,
				// The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
				cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
			}, {
				name: "pop",
				label: "Population",
				editable: false,
				cell: "integer" // An integer cell is a number cell that displays humanized integers
			}, {
				name: "percentage",
				label: "% of World Population",
				editable: false,
				cell: "number" // A cell type for floating point value, defaults to have a precision 2 decimal numbers
			}, {
				name: "date",
				label: "Date",
				editable: false,
				cell: "date",
			}, {
				name: "url",
				label: "URL",
				editable: false,
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
		territories.fetch({reset: true});


	}

}

module.exports = Application;

},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvY2hyaXNuL1NpdGVzL0dpdEh1Yi9jbmVsc29uODcvYmFja2JvbmUtYmFja2dyaWQvc3JjL3NjcmlwdHMvaW5pdGlhbGl6ZS5qcyIsIi9Vc2Vycy9jaHJpc24vU2l0ZXMvR2l0SHViL2NuZWxzb244Ny9iYWNrYm9uZS1iYWNrZ3JpZC9zcmMvc2NyaXB0cy9BcHBsaWNhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiXG52YXIgYXBwbGljYXRpb24gPSByZXF1aXJlKCcuL0FwcGxpY2F0aW9uJyk7XG5cbiQoZnVuY3Rpb24oKSB7XG5cdGFwcGxpY2F0aW9uLmluaXRpYWxpemUoKTtcbn0pO1xuIiwiXG4vLyB2YXIgR2FsbGVyeSA9IHJlcXVpcmUoJy4vY2xhc3Nlcy9HYWxsZXJ5Jyk7XG4vLyB2YXIgSGVyb1RhYnMgPSByZXF1aXJlKCcuL2NsYXNzZXMvSGVyb1RhYnMnKTtcbi8vIHZhciBTaG93TW9yZSA9IHJlcXVpcmUoJy4vY2xhc3Nlcy9TaG93TW9yZScpO1xuXG5cblxuXG52YXIgQXBwbGljYXRpb24gPSB7XG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xuXHRcdC8vY29uc29sZS5sb2coJ0FwcGxpY2F0aW9uOmluaXRpYWxpemUnKTtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0dmFyICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuXHRcdHZhciAkYm9keSA9ICQoJ2JvZHknKTtcblxuXHRcdHZhciAkZWxUYXJnZXQgPSAkKCcjZGF0YS10YXJnZXQnKTtcblxuXHRcdHZhciBUZXJyaXRvcnkgPSBCYWNrYm9uZS5Nb2RlbC5leHRlbmQoe30pO1xuXG5cdFx0dmFyIFRlcnJpdG9yaWVzID0gQmFja2JvbmUuUGFnZWFibGVDb2xsZWN0aW9uLmV4dGVuZCh7XG5cdFx0XHRtb2RlbDogVGVycml0b3J5LFxuXHRcdFx0dXJsOiAnL2RhdGEvdGVycml0b3JpZXMuanNvbicsXG5cdFx0XHRzdGF0ZToge1xuXHRcdFx0XHRwYWdlU2l6ZTogMjBcblx0XHRcdH0sXG5cdFx0XHRtb2RlOiAnY2xpZW50J1xuXHRcdH0pO1xuXG5cdFx0dmFyIHRlcnJpdG9yaWVzID0gbmV3IFRlcnJpdG9yaWVzKCk7XG5cblx0XHR2YXIgY29sdW1ucyA9IFtcblx0XHRcdHtcblx0XHRcdFx0bmFtZTogXCJpZFwiLCAvLyBUaGUga2V5IG9mIHRoZSBtb2RlbCBhdHRyaWJ1dGVcblx0XHRcdFx0bGFiZWw6IFwiSURcIiwgLy8gVGhlIG5hbWUgdG8gZGlzcGxheSBpbiB0aGUgaGVhZGVyXG5cdFx0XHRcdGVkaXRhYmxlOiBmYWxzZSwgLy8gQnkgZGVmYXVsdCBldmVyeSBjZWxsIGluIGEgY29sdW1uIGlzIGVkaXRhYmxlLCBidXQgKklEKiBzaG91bGRuJ3QgYmVcblx0XHRcdFx0Ly8gRGVmaW5lcyBhIGNlbGwgdHlwZSwgYW5kIElEIGlzIGRpc3BsYXllZCBhcyBhbiBpbnRlZ2VyIHdpdGhvdXQgdGhlICcsJyBzZXBhcmF0aW5nIDEwMDBzLlxuXHRcdFx0XHQvLyBjZWxsOiBCYWNrZ3JpZC5JbnRlZ2VyQ2VsbC5leHRlbmQoe1xuXHRcdFx0XHQvLyBcdG9yZGVyU2VwYXJhdG9yOiAnJ1xuXHRcdFx0XHQvLyB9KVxuXHRcdFx0XHRjZWxsOiBcImludGVnZXJcIiAvLyBBbiBpbnRlZ2VyIGNlbGwgaXMgYSBudW1iZXIgY2VsbCB0aGF0IGRpc3BsYXlzIGh1bWFuaXplZCBpbnRlZ2Vyc1xuXHRcdFx0fSwge1xuXHRcdFx0XHRuYW1lOiBcIm5hbWVcIixcblx0XHRcdFx0bGFiZWw6IFwiTmFtZVwiLFxuXHRcdFx0XHRlZGl0YWJsZTogZmFsc2UsXG5cdFx0XHRcdC8vIFRoZSBjZWxsIHR5cGUgY2FuIGJlIGEgcmVmZXJlbmNlIG9mIGEgQmFja2dyaWQuQ2VsbCBzdWJjbGFzcywgYW55IEJhY2tncmlkLkNlbGwgc3ViY2xhc3MgaW5zdGFuY2VzIGxpa2UgKmlkKiBhYm92ZSwgb3IgYSBzdHJpbmdcblx0XHRcdFx0Y2VsbDogXCJzdHJpbmdcIiAvLyBUaGlzIGlzIGNvbnZlcnRlZCB0byBcIlN0cmluZ0NlbGxcIiBhbmQgYSBjb3JyZXNwb25kaW5nIGNsYXNzIGluIHRoZSBCYWNrZ3JpZCBwYWNrYWdlIG5hbWVzcGFjZSBpcyBsb29rZWQgdXBcblx0XHRcdH0sIHtcblx0XHRcdFx0bmFtZTogXCJwb3BcIixcblx0XHRcdFx0bGFiZWw6IFwiUG9wdWxhdGlvblwiLFxuXHRcdFx0XHRlZGl0YWJsZTogZmFsc2UsXG5cdFx0XHRcdGNlbGw6IFwiaW50ZWdlclwiIC8vIEFuIGludGVnZXIgY2VsbCBpcyBhIG51bWJlciBjZWxsIHRoYXQgZGlzcGxheXMgaHVtYW5pemVkIGludGVnZXJzXG5cdFx0XHR9LCB7XG5cdFx0XHRcdG5hbWU6IFwicGVyY2VudGFnZVwiLFxuXHRcdFx0XHRsYWJlbDogXCIlIG9mIFdvcmxkIFBvcHVsYXRpb25cIixcblx0XHRcdFx0ZWRpdGFibGU6IGZhbHNlLFxuXHRcdFx0XHRjZWxsOiBcIm51bWJlclwiIC8vIEEgY2VsbCB0eXBlIGZvciBmbG9hdGluZyBwb2ludCB2YWx1ZSwgZGVmYXVsdHMgdG8gaGF2ZSBhIHByZWNpc2lvbiAyIGRlY2ltYWwgbnVtYmVyc1xuXHRcdFx0fSwge1xuXHRcdFx0XHRuYW1lOiBcImRhdGVcIixcblx0XHRcdFx0bGFiZWw6IFwiRGF0ZVwiLFxuXHRcdFx0XHRlZGl0YWJsZTogZmFsc2UsXG5cdFx0XHRcdGNlbGw6IFwiZGF0ZVwiLFxuXHRcdFx0fSwge1xuXHRcdFx0XHRuYW1lOiBcInVybFwiLFxuXHRcdFx0XHRsYWJlbDogXCJVUkxcIixcblx0XHRcdFx0ZWRpdGFibGU6IGZhbHNlLFxuXHRcdFx0XHRjZWxsOiBcInVyaVwiIC8vIFJlbmRlcnMgdGhlIHZhbHVlIGluIGFuIEhUTUwgYW5jaG9yIGVsZW1lbnRcblx0XHRcdH1cblx0XHRdO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBhIG5ldyBHcmlkIGluc3RhbmNlXG5cdFx0dmFyIGdyaWQgPSBuZXcgQmFja2dyaWQuR3JpZCh7XG5cdFx0XHRjb2x1bW5zOiBjb2x1bW5zLFxuXHRcdFx0Y29sbGVjdGlvbjogdGVycml0b3JpZXNcblx0XHR9KTtcblxuXHRcdC8vIFJlbmRlciB0aGUgZ3JpZCBhbmQgYXR0YWNoIHRoZSByb290IHRvIHlvdXIgSFRNTCBkb2N1bWVudFxuXHRcdCRlbFRhcmdldC5hcHBlbmQoZ3JpZC5yZW5kZXIoKS4kZWwpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSB0aGUgcGFnaW5hdG9yXG5cdFx0dmFyIHBhZ2luYXRvciA9IG5ldyBCYWNrZ3JpZC5FeHRlbnNpb24uUGFnaW5hdG9yKHtcblx0XHRcdGNvbGxlY3Rpb246IHRlcnJpdG9yaWVzXG5cdFx0fSk7XG5cblx0XHQvLyBSZW5kZXIgdGhlIHBhZ2luYXRvclxuXHRcdCRlbFRhcmdldC5hcHBlbmQocGFnaW5hdG9yLnJlbmRlcigpLiRlbCk7XG5cblxuXHRcdC8vIEluaXRpYWxpemUgYSBjbGllbnQtc2lkZSBmaWx0ZXIgdG8gZmlsdGVyIG9uIHRoZSBjbGllbnRcblx0XHQvLyBtb2RlIHBhZ2VhYmxlIGNvbGxlY3Rpb24ncyBjYWNoZS5cblx0XHR2YXIgZmlsdGVyID0gbmV3IEJhY2tncmlkLkV4dGVuc2lvbi5DbGllbnRTaWRlRmlsdGVyKHtcblx0XHRcdHRhZ05hbWU6IFwiZmllbGRzZXRcIixcblx0XHRcdHBsYWNlaG9sZGVyOiBcIktleXdvcmQgU2VhcmNoXCIsXG5cdFx0XHRjb2xsZWN0aW9uOiB0ZXJyaXRvcmllcy5mdWxsQ29sbGVjdGlvbixcblx0XHRcdGZpZWxkczogWyduYW1lJ11cblx0XHR9KTtcblxuXHRcdCRlbFRhcmdldC5wcmVwZW5kKGZpbHRlci5yZW5kZXIoKS4kZWwpO1xuXG5cdFx0Ly8gRmV0Y2ggc29tZSBjb3VudHJpZXMgZnJvbSB0aGUgdXJsXG5cdFx0dGVycml0b3JpZXMuZmV0Y2goe3Jlc2V0OiB0cnVlfSk7XG5cblxuXHR9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBcHBsaWNhdGlvbjtcbiJdfQ==
;