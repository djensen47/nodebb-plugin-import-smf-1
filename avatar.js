var exporter = require('./index');
var async = require('async');
var fs = require('fs-extra');

async.series([
	function(next) {
		exporter.setup({
			dbhost: '127.0.0.1',
			dbport: 3306,
			dbname: 'smf',
			dbuser: 'admin',
			dbpass: 'password',
			tablePrefix: 'smf_'
		}, next);
	},
	function(next) {
		exporter.copyAvatars(next);	
	}
], (err, results) => {
	fs.writeFileSync('./tmp.json', JSON.stringify(results, undefined, 2));
	process.exit(err ? 1 : 0);
});

