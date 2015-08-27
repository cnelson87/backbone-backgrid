
/**
 * concat
 * Concatenate files.
 */

module.exports = function (grunt) {

	// list all vendor libs
	var vendorLibs = [
		'<%= sourceVendor %>/modernizr.custom.min.js',
		'<%= sourceVendor %>/jquery.min.js',
		'<%= sourceVendor %>/jquery.touchSwipe.min.js',
		'<%= sourceVendor %>/picturefill.min.js',
		'<%= sourceVendor %>/underscore.min.js',
		'<%= sourceVendor %>/lunr.min.js',
		'<%= sourceVendor %>/moment.min.js',
		'<%= sourceVendor %>/backbone.min.js',
		'<%= sourceVendor %>/backbone-super.min.js',
		'<%= sourceVendor %>/backbone-paginator.min.js',
		'<%= sourceVendor %>/backgrid.min.js',
		'<%= sourceVendor %>/backgrid-moment-cell.min.js',
		'<%= sourceVendor %>/backgrid-filter.min.js',
		'<%= sourceVendor %>/backgrid-paginator.min.js',
		'<%= sourceVendor %>/backgrid-xtensions.js',
		'<%= sourceVendor %>/class.js',
		'<%= sourceScripts %>/shims/classList.js'
	];

	return {

		options: {
			separator: '\n\n'
		},

		devlibs: {
			src: vendorLibs,
			dest: '<%= localScripts %>/vendor.js'
		},

		distlibs: {
			src: vendorLibs,
			dest: '<%= publicScripts %>/vendor.js'
		}

	};

};