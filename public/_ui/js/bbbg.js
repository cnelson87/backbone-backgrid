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

},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvY2hyaXNuL1NpdGVzL0dpdEh1Yi9jbmVsc29uODcvYmFja2JvbmUtYmFja2dyaWQvc3JjL3NjcmlwdHMvaW5pdGlhbGl6ZS5qcyIsIi9Vc2Vycy9jaHJpc24vU2l0ZXMvR2l0SHViL2NuZWxzb244Ny9iYWNrYm9uZS1iYWNrZ3JpZC9zcmMvc2NyaXB0cy9BcHBsaWNhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiXG52YXIgYXBwbGljYXRpb24gPSByZXF1aXJlKCcuL0FwcGxpY2F0aW9uJyk7XG5cbiQoZnVuY3Rpb24oKSB7XG5cdGFwcGxpY2F0aW9uLmluaXRpYWxpemUoKTtcbn0pO1xuIiwiXG4vLyB2YXIgR2FsbGVyeSA9IHJlcXVpcmUoJy4vY2xhc3Nlcy9HYWxsZXJ5Jyk7XG4vLyB2YXIgSGVyb1RhYnMgPSByZXF1aXJlKCcuL2NsYXNzZXMvSGVyb1RhYnMnKTtcbi8vIHZhciBTaG93TW9yZSA9IHJlcXVpcmUoJy4vY2xhc3Nlcy9TaG93TW9yZScpO1xuXG5cblxuXG52YXIgQXBwbGljYXRpb24gPSB7XG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xuXHRcdC8vY29uc29sZS5sb2coJ0FwcGxpY2F0aW9uOmluaXRpYWxpemUnKTtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0dmFyICRkb2N1bWVudCA9ICQoZG9jdW1lbnQpO1xuXHRcdHZhciAkYm9keSA9ICQoJ2JvZHknKTtcblxuXHRcdHZhciAkZWxUYXJnZXQgPSAkKCcjZGF0YS10YXJnZXQnKTtcblxuXHRcdHZhciBUZXJyaXRvcnkgPSBCYWNrYm9uZS5Nb2RlbC5leHRlbmQoe30pO1xuXG5cdFx0dmFyIFRlcnJpdG9yaWVzID0gQmFja2JvbmUuUGFnZWFibGVDb2xsZWN0aW9uLmV4dGVuZCh7XG5cdFx0XHRtb2RlbDogVGVycml0b3J5LFxuXHRcdFx0dXJsOiAnL2RhdGEvdGVycml0b3JpZXMuanNvbicsXG5cdFx0XHRzdGF0ZToge1xuXHRcdFx0XHRwYWdlU2l6ZTogMjBcblx0XHRcdH0sXG5cdFx0XHRtb2RlOiAnY2xpZW50J1xuXHRcdH0pO1xuXG5cdFx0dmFyIHRlcnJpdG9yaWVzID0gbmV3IFRlcnJpdG9yaWVzKCk7XG5cblx0XHR2YXIgY29sdW1ucyA9IFtcblx0XHRcdHtcblx0XHRcdFx0bmFtZTogXCJpZFwiLCAvLyBUaGUga2V5IG9mIHRoZSBtb2RlbCBhdHRyaWJ1dGVcblx0XHRcdFx0bGFiZWw6IFwiSURcIiwgLy8gVGhlIG5hbWUgdG8gZGlzcGxheSBpbiB0aGUgaGVhZGVyXG5cdFx0XHRcdGVkaXRhYmxlOiBmYWxzZSwgLy8gQnkgZGVmYXVsdCBldmVyeSBjZWxsIGluIGEgY29sdW1uIGlzIGVkaXRhYmxlLCBidXQgKklEKiBzaG91bGRuJ3QgYmVcblx0XHRcdFx0Ly8gRGVmaW5lcyBhIGNlbGwgdHlwZSwgYW5kIElEIGlzIGRpc3BsYXllZCBhcyBhbiBpbnRlZ2VyIHdpdGhvdXQgdGhlICcsJyBzZXBhcmF0aW5nIDEwMDBzLlxuXHRcdFx0XHRjZWxsOiBCYWNrZ3JpZC5JbnRlZ2VyQ2VsbC5leHRlbmQoe1xuXHRcdFx0XHRcdG9yZGVyU2VwYXJhdG9yOiAnJ1xuXHRcdFx0XHR9KVxuXHRcdFx0fSwge1xuXHRcdFx0XHRuYW1lOiBcIm5hbWVcIixcblx0XHRcdFx0bGFiZWw6IFwiTmFtZVwiLFxuXHRcdFx0XHQvLyBUaGUgY2VsbCB0eXBlIGNhbiBiZSBhIHJlZmVyZW5jZSBvZiBhIEJhY2tncmlkLkNlbGwgc3ViY2xhc3MsIGFueSBCYWNrZ3JpZC5DZWxsIHN1YmNsYXNzIGluc3RhbmNlcyBsaWtlICppZCogYWJvdmUsIG9yIGEgc3RyaW5nXG5cdFx0XHRcdGNlbGw6IFwic3RyaW5nXCIgLy8gVGhpcyBpcyBjb252ZXJ0ZWQgdG8gXCJTdHJpbmdDZWxsXCIgYW5kIGEgY29ycmVzcG9uZGluZyBjbGFzcyBpbiB0aGUgQmFja2dyaWQgcGFja2FnZSBuYW1lc3BhY2UgaXMgbG9va2VkIHVwXG5cdFx0XHR9LCB7XG5cdFx0XHRcdG5hbWU6IFwicG9wXCIsXG5cdFx0XHRcdGxhYmVsOiBcIlBvcHVsYXRpb25cIixcblx0XHRcdFx0Y2VsbDogXCJpbnRlZ2VyXCIgLy8gQW4gaW50ZWdlciBjZWxsIGlzIGEgbnVtYmVyIGNlbGwgdGhhdCBkaXNwbGF5cyBodW1hbml6ZWQgaW50ZWdlcnNcblx0XHRcdH0sIHtcblx0XHRcdFx0bmFtZTogXCJwZXJjZW50YWdlXCIsXG5cdFx0XHRcdGxhYmVsOiBcIiUgb2YgV29ybGQgUG9wdWxhdGlvblwiLFxuXHRcdFx0XHRjZWxsOiBcIm51bWJlclwiIC8vIEEgY2VsbCB0eXBlIGZvciBmbG9hdGluZyBwb2ludCB2YWx1ZSwgZGVmYXVsdHMgdG8gaGF2ZSBhIHByZWNpc2lvbiAyIGRlY2ltYWwgbnVtYmVyc1xuXHRcdFx0fSwge1xuXHRcdFx0XHRuYW1lOiBcImRhdGVcIixcblx0XHRcdFx0bGFiZWw6IFwiRGF0ZVwiLFxuXHRcdFx0XHRjZWxsOiBcImRhdGVcIixcblx0XHRcdH0sIHtcblx0XHRcdFx0bmFtZTogXCJ1cmxcIixcblx0XHRcdFx0bGFiZWw6IFwiVVJMXCIsXG5cdFx0XHRcdGNlbGw6IFwidXJpXCIgLy8gUmVuZGVycyB0aGUgdmFsdWUgaW4gYW4gSFRNTCBhbmNob3IgZWxlbWVudFxuXHRcdFx0fVxuXHRcdF07XG5cblxuXHRcdC8vIEluaXRpYWxpemUgYSBuZXcgR3JpZCBpbnN0YW5jZVxuXHRcdHZhciBncmlkID0gbmV3IEJhY2tncmlkLkdyaWQoe1xuXHRcdFx0Y29sdW1uczogY29sdW1ucyxcblx0XHRcdGNvbGxlY3Rpb246IHRlcnJpdG9yaWVzXG5cdFx0fSk7XG5cblx0XHQvLyBSZW5kZXIgdGhlIGdyaWQgYW5kIGF0dGFjaCB0aGUgcm9vdCB0byB5b3VyIEhUTUwgZG9jdW1lbnRcblx0XHQkZWxUYXJnZXQuYXBwZW5kKGdyaWQucmVuZGVyKCkuJGVsKTtcblxuXHRcdC8vIEluaXRpYWxpemUgdGhlIHBhZ2luYXRvclxuXHRcdHZhciBwYWdpbmF0b3IgPSBuZXcgQmFja2dyaWQuRXh0ZW5zaW9uLlBhZ2luYXRvcih7XG5cdFx0XHRjb2xsZWN0aW9uOiB0ZXJyaXRvcmllc1xuXHRcdH0pO1xuXG5cdFx0Ly8gUmVuZGVyIHRoZSBwYWdpbmF0b3Jcblx0XHQkZWxUYXJnZXQuYXBwZW5kKHBhZ2luYXRvci5yZW5kZXIoKS4kZWwpO1xuXG5cblxuXHRcdC8vIEZldGNoIHNvbWUgY291bnRyaWVzIGZyb20gdGhlIHVybFxuXHRcdHRlcnJpdG9yaWVzLmZldGNoKHtyZXNldDogdHJ1ZX0pO1xuXG5cblxuXG5cblx0fVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwbGljYXRpb247XG4iXX0=
;