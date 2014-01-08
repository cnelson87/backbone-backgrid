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
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvY2hyaXNuL1NpdGVzL0dpdEh1Yi9jbmVsc29uODcvYmFja2JvbmUtYmFja2dyaWQvc3JjL3NjcmlwdHMvaW5pdGlhbGl6ZS5qcyIsIi9Vc2Vycy9jaHJpc24vU2l0ZXMvR2l0SHViL2NuZWxzb244Ny9iYWNrYm9uZS1iYWNrZ3JpZC9zcmMvc2NyaXB0cy9BcHBsaWNhdGlvbi5qcyIsIi9Vc2Vycy9jaHJpc24vU2l0ZXMvR2l0SHViL2NuZWxzb244Ny9iYWNrYm9uZS1iYWNrZ3JpZC9zcmMvc2NyaXB0cy91dGlsaXRpZXMvR2V0QWpheENvbnRlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiXG52YXIgYXBwbGljYXRpb24gPSByZXF1aXJlKCcuL0FwcGxpY2F0aW9uJyk7XG5cbiQoZnVuY3Rpb24oKSB7XG5cdGFwcGxpY2F0aW9uLmluaXRpYWxpemUoKTtcbn0pO1xuIiwiXG52YXIgZ2V0QWpheENvbnRlbnQgPSByZXF1aXJlKCcuL3V0aWxpdGllcy9HZXRBamF4Q29udGVudCcpO1xuXG52YXIgQXBwbGljYXRpb24gPSB7XG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblxuXHRcdCQud2hlbihnZXRBamF4Q29udGVudCgnL2RhdGEvdGVycml0b3JpZXMuanNvbicpKS5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0XHRzZWxmLmJ1aWxkVGFibGUocmVzcG9uc2UpO1xuXHRcdH0pLmZhaWwoZnVuY3Rpb24oZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUubG9nKGVycm9yKTtcblx0XHR9KTtcblxuXHR9LFxuXG5cdGJ1aWxkVGFibGU6IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHQvL2NvbnNvbGUubG9nKCdBcHBsaWNhdGlvbjppbml0aWFsaXplJyk7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdHZhciAkZG9jdW1lbnQgPSAkKGRvY3VtZW50KTtcblx0XHR2YXIgJGJvZHkgPSAkKCdib2R5Jyk7XG5cblx0XHR2YXIgJGVsVGFyZ2V0ID0gJCgnI2RhdGEtdGFyZ2V0Jyk7XG5cblx0XHR2YXIgVGVycml0b3J5ID0gQmFja2JvbmUuTW9kZWwuZXh0ZW5kKHt9KTtcblxuXHRcdHZhciBUZXJyaXRvcmllcyA9IEJhY2tib25lLlBhZ2VhYmxlQ29sbGVjdGlvbi5leHRlbmQoe1xuXHRcdFx0bW9kZWw6IFRlcnJpdG9yeSxcblx0XHRcdHVybDogJy9kYXRhL3RlcnJpdG9yaWVzLmpzb24nLFxuXHRcdFx0c3RhdGU6IHtcblx0XHRcdFx0cGFnZVNpemU6IDIwXG5cdFx0XHR9LFxuXHRcdFx0bW9kZTogJ2NsaWVudCdcblx0XHR9KTtcblxuXHRcdHZhciB0ZXJyaXRvcmllcyA9IG5ldyBUZXJyaXRvcmllcygpO1xuXHRcdHRlcnJpdG9yaWVzLmFkZChkYXRhKTtcblxuXHRcdHZhciBjb2x1bW5zID0gW1xuLypcblx0XHRcdHtcblx0XHRcdFx0bmFtZTogXCJpZFwiLCAvLyBUaGUga2V5IG9mIHRoZSBtb2RlbCBhdHRyaWJ1dGVcblx0XHRcdFx0bGFiZWw6IFwiSURcIiwgLy8gVGhlIG5hbWUgdG8gZGlzcGxheSBpbiB0aGUgaGVhZGVyXG5cdFx0XHRcdGVkaXRhYmxlOiBmYWxzZSwgLy8gQnkgZGVmYXVsdCBldmVyeSBjZWxsIGluIGEgY29sdW1uIGlzIGVkaXRhYmxlLCBidXQgKklEKiBzaG91bGRuJ3QgYmVcblx0XHRcdFx0Ly8gRGVmaW5lcyBhIGNlbGwgdHlwZSwgYW5kIElEIGlzIGRpc3BsYXllZCBhcyBhbiBpbnRlZ2VyIHdpdGhvdXQgdGhlICcsJyBzZXBhcmF0aW5nIDEwMDBzLlxuXHRcdFx0XHQvLyBjZWxsOiBCYWNrZ3JpZC5JbnRlZ2VyQ2VsbC5leHRlbmQoe1xuXHRcdFx0XHQvLyBvcmRlclNlcGFyYXRvcjogJydcblx0XHRcdFx0Ly8gfSlcblx0XHRcdFx0Y2VsbDogXCJpbnRlZ2VyXCIgLy8gQW4gaW50ZWdlciBjZWxsIGlzIGEgbnVtYmVyIGNlbGwgdGhhdCBkaXNwbGF5cyBodW1hbml6ZWQgaW50ZWdlcnNcblx0XHRcdH0sXG4qL1xuXHRcdFx0e1xuXG5cdFx0XHRcdG5hbWU6IFwibmFtZVwiLFxuXHRcdFx0XHR1cmw6IFwidXJsXCIsXG5cdFx0XHRcdGxhYmVsOiBcIk5hbWVcIixcblx0XHRcdFx0ZWRpdGFibGU6IGZhbHNlLFxuXHRcdFx0XHRjZWxsOiBcImxpbmtcIlxuXHRcdFx0fSwge1xuXHRcdFx0XHRuYW1lOiBcInBvcHVsYXRpb25cIixcblx0XHRcdFx0bGFiZWw6IFwiUG9wdWxhdGlvblwiLFxuXHRcdFx0XHRlZGl0YWJsZTogZmFsc2UsXG5cdFx0XHRcdGNlbGw6IFwiaW50ZWdlclwiIC8vIEFuIGludGVnZXIgY2VsbCBpcyBhIG51bWJlciBjZWxsIHRoYXQgZGlzcGxheXMgaHVtYW5pemVkIGludGVnZXJzXG5cdFx0XHR9LCB7XG5cdFx0XHRcdG5hbWU6IFwicGVyY2VudGFnZVwiLFxuXHRcdFx0XHRsYWJlbDogXCIlIG9mIFdvcmxkIFBvcHVsYXRpb25cIixcblx0XHRcdFx0ZWRpdGFibGU6IGZhbHNlLFxuXHRcdFx0XHRjZWxsOiBcIm51bWJlclwiIC8vIEEgY2VsbCB0eXBlIGZvciBmbG9hdGluZyBwb2ludCB2YWx1ZSwgZGVmYXVsdHMgdG8gaGF2ZSBhIHByZWNpc2lvbiAyIGRlY2ltYWwgbnVtYmVyc1xuXHRcdFx0fSxcbi8qXG5cdFx0XHR7XG5cdFx0XHRcdG5hbWU6IFwiZGF0ZVwiLFxuXHRcdFx0XHRsYWJlbDogXCJEYXRlXCIsXG5cdFx0XHRcdGVkaXRhYmxlOiBmYWxzZSxcblx0XHRcdFx0Y2VsbDogXCJkYXRlXCIsXG5cdFx0XHR9LFxuKi9cblx0XHRcdHtcblx0XHRcdFx0bmFtZTogXCJkYXRlXCIsXG5cdFx0XHRcdGxhYmVsOiBcIlllYXJcIixcblx0XHRcdFx0ZWRpdGFibGU6IGZhbHNlLFxuXHRcdFx0XHRjZWxsOiBCYWNrZ3JpZC5FeHRlbnNpb24uTW9tZW50Q2VsbC5leHRlbmQoe1xuXHRcdFx0XHRcdGNsYXNzTmFtZTogXCJkYXRlLWNlbGxcIixcblx0XHRcdFx0XHRkaXNwbGF5Rm9ybWF0OiBcIllZWVlcIlxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdF07XG5cblx0XHQvLyBJbml0aWFsaXplIGEgbmV3IEdyaWQgaW5zdGFuY2Vcblx0XHR2YXIgZ3JpZCA9IG5ldyBCYWNrZ3JpZC5HcmlkKHtcblx0XHRcdGNvbHVtbnM6IGNvbHVtbnMsXG5cdFx0XHRjb2xsZWN0aW9uOiB0ZXJyaXRvcmllc1xuXHRcdH0pO1xuXG5cdFx0Ly8gUmVuZGVyIHRoZSBncmlkIGFuZCBhdHRhY2ggdGhlIHJvb3QgdG8geW91ciBIVE1MIGRvY3VtZW50XG5cdFx0JGVsVGFyZ2V0LmFwcGVuZChncmlkLnJlbmRlcigpLiRlbCk7XG5cblx0XHQvLyBJbml0aWFsaXplIHRoZSBwYWdpbmF0b3Jcblx0XHR2YXIgcGFnaW5hdG9yID0gbmV3IEJhY2tncmlkLkV4dGVuc2lvbi5QYWdpbmF0b3Ioe1xuXHRcdFx0Y29sbGVjdGlvbjogdGVycml0b3JpZXNcblx0XHR9KTtcblxuXHRcdC8vIFJlbmRlciB0aGUgcGFnaW5hdG9yXG5cdFx0JGVsVGFyZ2V0LmFwcGVuZChwYWdpbmF0b3IucmVuZGVyKCkuJGVsKTtcblxuXHRcdC8vIEluaXRpYWxpemUgYSBjbGllbnQtc2lkZSBmaWx0ZXIgdG8gZmlsdGVyIG9uIHRoZSBjbGllbnRcblx0XHQvLyBtb2RlIHBhZ2VhYmxlIGNvbGxlY3Rpb24ncyBjYWNoZS5cblx0XHR2YXIgZmlsdGVyID0gbmV3IEJhY2tncmlkLkV4dGVuc2lvbi5DbGllbnRTaWRlRmlsdGVyKHtcblx0XHRcdHRhZ05hbWU6IFwiZmllbGRzZXRcIixcblx0XHRcdHBsYWNlaG9sZGVyOiBcIktleXdvcmQgU2VhcmNoXCIsXG5cdFx0XHRjb2xsZWN0aW9uOiB0ZXJyaXRvcmllcy5mdWxsQ29sbGVjdGlvbixcblx0XHRcdGZpZWxkczogWyduYW1lJ11cblx0XHR9KTtcblxuXHRcdCRlbFRhcmdldC5wcmVwZW5kKGZpbHRlci5yZW5kZXIoKS4kZWwpO1xuXG5cdFx0Ly8gRmV0Y2ggc29tZSBjb3VudHJpZXMgZnJvbSB0aGUgdXJsXG5cdFx0Ly90ZXJyaXRvcmllcy5mZXRjaCh7cmVzZXQ6IHRydWV9KTtcblxuXHR9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwbGljYXRpb247XG4iLCJcbi8qKlxuKlx0cmV0dXJucyBhbiBBamF4IEdFVCByZXF1ZXN0IHVzaW5nIGRlZmVycmVkLCB1cmwgaXMgcmVxdWlyZWQsIGRhdGFUeXBlIGlzIG9wdGlvbmFsXG4qKi9cbnZhciBHZXRBamF4Q29udGVudCA9IGZ1bmN0aW9uKHVybCwgZGF0YVR5cGUpIHtcblx0cmV0dXJuICQuYWpheCh7XG5cdFx0dHlwZTogJ0dFVCcsXG5cdFx0dXJsOiB1cmwsXG5cdFx0ZGF0YVR5cGU6IGRhdGFUeXBlIHx8ICdqc29uJ1xuXHR9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gR2V0QWpheENvbnRlbnQ7XG4iXX0=
;