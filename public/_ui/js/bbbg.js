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
				// name: "id", // The key of the model attribute
				// label: "ID", // The name to display in the header
				// editable: false, // By default every cell in a column is editable, but *ID* shouldn't be
				// // Defines a cell type, and ID is displayed as an integer without the ',' separating 1000s.
				// // cell: Backgrid.IntegerCell.extend({
				// // 	orderSeparator: ''
				// // })
				// cell: "integer" // An integer cell is a number cell that displays humanized integers
				name: "name",
				url: "url",
				label: "Name",
				editable: false,
				cell: Backgrid.UriCell.extend({
					render: function () {
						this.$el.empty();
						var formattedUrl = this.formatter.fromRaw(this.model.get(this.column.get("url")));
						var formattedName = this.formatter.fromRaw(this.model.get(this.column.get("name")));
						this.$el.append($("<a>", {
							href: formattedUrl,
							title: formattedName,
							target: "_blank"
						}).text(formattedName));
						this.delegateEvents();
						return this;
					}
				})
			}, {
			// 	name: "name",
			// 	label: "Name",
			// 	editable: false,
			// 	// The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
			// 	cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
			// }, {
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
				name: "date",
				label: "Year",
				editable: false,
				cell: Backgrid.Extension.MomentCell.extend({
					className: "date-cell",
					displayFormat: "YYYY"
				})
			// }, {
			// 	name: "name",
			// 	url: "url",
			// 	label: "URL",
			// 	editable: false,
			// 	cell: Backgrid.UriCell.extend({
			// 		render: function () {
			// 			this.$el.empty();
			// 			var formattedUrl = this.formatter.fromRaw(this.model.get(this.column.get("url")));
			// 			var formattedName = this.formatter.fromRaw(this.model.get(this.column.get("name")));
			// 			this.$el.append($("<a>", {
			// 				href: formattedUrl,
			// 				title: formattedName,
			// 				target: "_blank"
			// 			}).text(formattedName));
			// 			this.delegateEvents();
			// 			return this;
			// 		}
			// 	})
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
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvY2hyaXNuL1NpdGVzL0dpdEh1Yi9jbmVsc29uODcvYmFja2JvbmUtYmFja2dyaWQvc3JjL3NjcmlwdHMvaW5pdGlhbGl6ZS5qcyIsIi9Vc2Vycy9jaHJpc24vU2l0ZXMvR2l0SHViL2NuZWxzb244Ny9iYWNrYm9uZS1iYWNrZ3JpZC9zcmMvc2NyaXB0cy9BcHBsaWNhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJcbnZhciBhcHBsaWNhdGlvbiA9IHJlcXVpcmUoJy4vQXBwbGljYXRpb24nKTtcblxuJChmdW5jdGlvbigpIHtcblx0YXBwbGljYXRpb24uaW5pdGlhbGl6ZSgpO1xufSk7XG4iLCJcbi8vIHZhciBHYWxsZXJ5ID0gcmVxdWlyZSgnLi9jbGFzc2VzL0dhbGxlcnknKTtcbi8vIHZhciBIZXJvVGFicyA9IHJlcXVpcmUoJy4vY2xhc3Nlcy9IZXJvVGFicycpO1xuLy8gdmFyIFNob3dNb3JlID0gcmVxdWlyZSgnLi9jbGFzc2VzL1Nob3dNb3JlJyk7XG5cblxuXG5cbnZhciBBcHBsaWNhdGlvbiA9IHtcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24oKSB7XG5cdFx0Ly9jb25zb2xlLmxvZygnQXBwbGljYXRpb246aW5pdGlhbGl6ZScpO1xuXHRcdHZhciBzZWxmID0gdGhpcztcblx0XHR2YXIgJGRvY3VtZW50ID0gJChkb2N1bWVudCk7XG5cdFx0dmFyICRib2R5ID0gJCgnYm9keScpO1xuXG5cdFx0dmFyICRlbFRhcmdldCA9ICQoJyNkYXRhLXRhcmdldCcpO1xuXG5cdFx0dmFyIFRlcnJpdG9yeSA9IEJhY2tib25lLk1vZGVsLmV4dGVuZCh7fSk7XG5cblx0XHR2YXIgVGVycml0b3JpZXMgPSBCYWNrYm9uZS5QYWdlYWJsZUNvbGxlY3Rpb24uZXh0ZW5kKHtcblx0XHRcdG1vZGVsOiBUZXJyaXRvcnksXG5cdFx0XHR1cmw6ICcvZGF0YS90ZXJyaXRvcmllcy5qc29uJyxcblx0XHRcdHN0YXRlOiB7XG5cdFx0XHRcdHBhZ2VTaXplOiAyMFxuXHRcdFx0fSxcblx0XHRcdG1vZGU6ICdjbGllbnQnXG5cdFx0fSk7XG5cblx0XHR2YXIgdGVycml0b3JpZXMgPSBuZXcgVGVycml0b3JpZXMoKTtcblxuXHRcdHZhciBjb2x1bW5zID0gW1xuXHRcdFx0e1xuXHRcdFx0XHQvLyBuYW1lOiBcImlkXCIsIC8vIFRoZSBrZXkgb2YgdGhlIG1vZGVsIGF0dHJpYnV0ZVxuXHRcdFx0XHQvLyBsYWJlbDogXCJJRFwiLCAvLyBUaGUgbmFtZSB0byBkaXNwbGF5IGluIHRoZSBoZWFkZXJcblx0XHRcdFx0Ly8gZWRpdGFibGU6IGZhbHNlLCAvLyBCeSBkZWZhdWx0IGV2ZXJ5IGNlbGwgaW4gYSBjb2x1bW4gaXMgZWRpdGFibGUsIGJ1dCAqSUQqIHNob3VsZG4ndCBiZVxuXHRcdFx0XHQvLyAvLyBEZWZpbmVzIGEgY2VsbCB0eXBlLCBhbmQgSUQgaXMgZGlzcGxheWVkIGFzIGFuIGludGVnZXIgd2l0aG91dCB0aGUgJywnIHNlcGFyYXRpbmcgMTAwMHMuXG5cdFx0XHRcdC8vIC8vIGNlbGw6IEJhY2tncmlkLkludGVnZXJDZWxsLmV4dGVuZCh7XG5cdFx0XHRcdC8vIC8vIFx0b3JkZXJTZXBhcmF0b3I6ICcnXG5cdFx0XHRcdC8vIC8vIH0pXG5cdFx0XHRcdC8vIGNlbGw6IFwiaW50ZWdlclwiIC8vIEFuIGludGVnZXIgY2VsbCBpcyBhIG51bWJlciBjZWxsIHRoYXQgZGlzcGxheXMgaHVtYW5pemVkIGludGVnZXJzXG5cdFx0XHRcdG5hbWU6IFwibmFtZVwiLFxuXHRcdFx0XHR1cmw6IFwidXJsXCIsXG5cdFx0XHRcdGxhYmVsOiBcIk5hbWVcIixcblx0XHRcdFx0ZWRpdGFibGU6IGZhbHNlLFxuXHRcdFx0XHRjZWxsOiBCYWNrZ3JpZC5VcmlDZWxsLmV4dGVuZCh7XG5cdFx0XHRcdFx0cmVuZGVyOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHR0aGlzLiRlbC5lbXB0eSgpO1xuXHRcdFx0XHRcdFx0dmFyIGZvcm1hdHRlZFVybCA9IHRoaXMuZm9ybWF0dGVyLmZyb21SYXcodGhpcy5tb2RlbC5nZXQodGhpcy5jb2x1bW4uZ2V0KFwidXJsXCIpKSk7XG5cdFx0XHRcdFx0XHR2YXIgZm9ybWF0dGVkTmFtZSA9IHRoaXMuZm9ybWF0dGVyLmZyb21SYXcodGhpcy5tb2RlbC5nZXQodGhpcy5jb2x1bW4uZ2V0KFwibmFtZVwiKSkpO1xuXHRcdFx0XHRcdFx0dGhpcy4kZWwuYXBwZW5kKCQoXCI8YT5cIiwge1xuXHRcdFx0XHRcdFx0XHRocmVmOiBmb3JtYXR0ZWRVcmwsXG5cdFx0XHRcdFx0XHRcdHRpdGxlOiBmb3JtYXR0ZWROYW1lLFxuXHRcdFx0XHRcdFx0XHR0YXJnZXQ6IFwiX2JsYW5rXCJcblx0XHRcdFx0XHRcdH0pLnRleHQoZm9ybWF0dGVkTmFtZSkpO1xuXHRcdFx0XHRcdFx0dGhpcy5kZWxlZ2F0ZUV2ZW50cygpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fSwge1xuXHRcdFx0Ly8gXHRuYW1lOiBcIm5hbWVcIixcblx0XHRcdC8vIFx0bGFiZWw6IFwiTmFtZVwiLFxuXHRcdFx0Ly8gXHRlZGl0YWJsZTogZmFsc2UsXG5cdFx0XHQvLyBcdC8vIFRoZSBjZWxsIHR5cGUgY2FuIGJlIGEgcmVmZXJlbmNlIG9mIGEgQmFja2dyaWQuQ2VsbCBzdWJjbGFzcywgYW55IEJhY2tncmlkLkNlbGwgc3ViY2xhc3MgaW5zdGFuY2VzIGxpa2UgKmlkKiBhYm92ZSwgb3IgYSBzdHJpbmdcblx0XHRcdC8vIFx0Y2VsbDogXCJzdHJpbmdcIiAvLyBUaGlzIGlzIGNvbnZlcnRlZCB0byBcIlN0cmluZ0NlbGxcIiBhbmQgYSBjb3JyZXNwb25kaW5nIGNsYXNzIGluIHRoZSBCYWNrZ3JpZCBwYWNrYWdlIG5hbWVzcGFjZSBpcyBsb29rZWQgdXBcblx0XHRcdC8vIH0sIHtcblx0XHRcdFx0bmFtZTogXCJwb3BcIixcblx0XHRcdFx0bGFiZWw6IFwiUG9wdWxhdGlvblwiLFxuXHRcdFx0XHRlZGl0YWJsZTogZmFsc2UsXG5cdFx0XHRcdGNlbGw6IFwiaW50ZWdlclwiIC8vIEFuIGludGVnZXIgY2VsbCBpcyBhIG51bWJlciBjZWxsIHRoYXQgZGlzcGxheXMgaHVtYW5pemVkIGludGVnZXJzXG5cdFx0XHR9LCB7XG5cdFx0XHRcdG5hbWU6IFwicGVyY2VudGFnZVwiLFxuXHRcdFx0XHRsYWJlbDogXCIlIG9mIFdvcmxkIFBvcHVsYXRpb25cIixcblx0XHRcdFx0ZWRpdGFibGU6IGZhbHNlLFxuXHRcdFx0XHRjZWxsOiBcIm51bWJlclwiIC8vIEEgY2VsbCB0eXBlIGZvciBmbG9hdGluZyBwb2ludCB2YWx1ZSwgZGVmYXVsdHMgdG8gaGF2ZSBhIHByZWNpc2lvbiAyIGRlY2ltYWwgbnVtYmVyc1xuXHRcdFx0fSwge1xuXHRcdFx0XHRuYW1lOiBcImRhdGVcIixcblx0XHRcdFx0bGFiZWw6IFwiRGF0ZVwiLFxuXHRcdFx0XHRlZGl0YWJsZTogZmFsc2UsXG5cdFx0XHRcdGNlbGw6IFwiZGF0ZVwiLFxuXHRcdFx0fSwge1xuXHRcdFx0XHRuYW1lOiBcImRhdGVcIixcblx0XHRcdFx0bGFiZWw6IFwiWWVhclwiLFxuXHRcdFx0XHRlZGl0YWJsZTogZmFsc2UsXG5cdFx0XHRcdGNlbGw6IEJhY2tncmlkLkV4dGVuc2lvbi5Nb21lbnRDZWxsLmV4dGVuZCh7XG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiBcImRhdGUtY2VsbFwiLFxuXHRcdFx0XHRcdGRpc3BsYXlGb3JtYXQ6IFwiWVlZWVwiXG5cdFx0XHRcdH0pXG5cdFx0XHQvLyB9LCB7XG5cdFx0XHQvLyBcdG5hbWU6IFwibmFtZVwiLFxuXHRcdFx0Ly8gXHR1cmw6IFwidXJsXCIsXG5cdFx0XHQvLyBcdGxhYmVsOiBcIlVSTFwiLFxuXHRcdFx0Ly8gXHRlZGl0YWJsZTogZmFsc2UsXG5cdFx0XHQvLyBcdGNlbGw6IEJhY2tncmlkLlVyaUNlbGwuZXh0ZW5kKHtcblx0XHRcdC8vIFx0XHRyZW5kZXI6IGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFx0XHRcdHRoaXMuJGVsLmVtcHR5KCk7XG5cdFx0XHQvLyBcdFx0XHR2YXIgZm9ybWF0dGVkVXJsID0gdGhpcy5mb3JtYXR0ZXIuZnJvbVJhdyh0aGlzLm1vZGVsLmdldCh0aGlzLmNvbHVtbi5nZXQoXCJ1cmxcIikpKTtcblx0XHRcdC8vIFx0XHRcdHZhciBmb3JtYXR0ZWROYW1lID0gdGhpcy5mb3JtYXR0ZXIuZnJvbVJhdyh0aGlzLm1vZGVsLmdldCh0aGlzLmNvbHVtbi5nZXQoXCJuYW1lXCIpKSk7XG5cdFx0XHQvLyBcdFx0XHR0aGlzLiRlbC5hcHBlbmQoJChcIjxhPlwiLCB7XG5cdFx0XHQvLyBcdFx0XHRcdGhyZWY6IGZvcm1hdHRlZFVybCxcblx0XHRcdC8vIFx0XHRcdFx0dGl0bGU6IGZvcm1hdHRlZE5hbWUsXG5cdFx0XHQvLyBcdFx0XHRcdHRhcmdldDogXCJfYmxhbmtcIlxuXHRcdFx0Ly8gXHRcdFx0fSkudGV4dChmb3JtYXR0ZWROYW1lKSk7XG5cdFx0XHQvLyBcdFx0XHR0aGlzLmRlbGVnYXRlRXZlbnRzKCk7XG5cdFx0XHQvLyBcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdC8vIFx0XHR9XG5cdFx0XHQvLyBcdH0pXG5cdFx0XHR9XG5cdFx0XTtcblxuXHRcdC8vIEluaXRpYWxpemUgYSBuZXcgR3JpZCBpbnN0YW5jZVxuXHRcdHZhciBncmlkID0gbmV3IEJhY2tncmlkLkdyaWQoe1xuXHRcdFx0Y29sdW1uczogY29sdW1ucyxcblx0XHRcdGNvbGxlY3Rpb246IHRlcnJpdG9yaWVzXG5cdFx0fSk7XG5cblx0XHQvLyBSZW5kZXIgdGhlIGdyaWQgYW5kIGF0dGFjaCB0aGUgcm9vdCB0byB5b3VyIEhUTUwgZG9jdW1lbnRcblx0XHQkZWxUYXJnZXQuYXBwZW5kKGdyaWQucmVuZGVyKCkuJGVsKTtcblxuXHRcdC8vIEluaXRpYWxpemUgdGhlIHBhZ2luYXRvclxuXHRcdHZhciBwYWdpbmF0b3IgPSBuZXcgQmFja2dyaWQuRXh0ZW5zaW9uLlBhZ2luYXRvcih7XG5cdFx0XHRjb2xsZWN0aW9uOiB0ZXJyaXRvcmllc1xuXHRcdH0pO1xuXG5cdFx0Ly8gUmVuZGVyIHRoZSBwYWdpbmF0b3Jcblx0XHQkZWxUYXJnZXQuYXBwZW5kKHBhZ2luYXRvci5yZW5kZXIoKS4kZWwpO1xuXG5cblx0XHQvLyBJbml0aWFsaXplIGEgY2xpZW50LXNpZGUgZmlsdGVyIHRvIGZpbHRlciBvbiB0aGUgY2xpZW50XG5cdFx0Ly8gbW9kZSBwYWdlYWJsZSBjb2xsZWN0aW9uJ3MgY2FjaGUuXG5cdFx0dmFyIGZpbHRlciA9IG5ldyBCYWNrZ3JpZC5FeHRlbnNpb24uQ2xpZW50U2lkZUZpbHRlcih7XG5cdFx0XHR0YWdOYW1lOiBcImZpZWxkc2V0XCIsXG5cdFx0XHRwbGFjZWhvbGRlcjogXCJLZXl3b3JkIFNlYXJjaFwiLFxuXHRcdFx0Y29sbGVjdGlvbjogdGVycml0b3JpZXMuZnVsbENvbGxlY3Rpb24sXG5cdFx0XHRmaWVsZHM6IFsnbmFtZSddXG5cdFx0fSk7XG5cblx0XHQkZWxUYXJnZXQucHJlcGVuZChmaWx0ZXIucmVuZGVyKCkuJGVsKTtcblxuXHRcdC8vIEZldGNoIHNvbWUgY291bnRyaWVzIGZyb20gdGhlIHVybFxuXHRcdHRlcnJpdG9yaWVzLmZldGNoKHtyZXNldDogdHJ1ZX0pO1xuXG5cblx0fVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwbGljYXRpb247XG4iXX0=
;