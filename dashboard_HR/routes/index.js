var express = require('express');
var router = express.Router();
const monitor = require('../lib/monitoring');
const _ = require('lodash');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Fiware' });
});

// If an subscription is recieved emit socket io events
// using the attribute values from the data received to define
// who to send the event too.
function broadcastEvents(req, item, types) {
	const message = req.params.type + ' received';
	_.forEach(types, type => {
		if (item[type]) {
			//monitor(item[type], message);
			monitor('Msg',message);
		}
	});
}

// Whenever a subscription is received, display it on the monitor
// and notify any interested parties using Socket.io
router.post('/subscription/:type', (req, res) => {
	monitor('notify', req.params.type + ' received', req.body.data);
	/*_.forEach(req.body.data, item => {
		broadcastEvents(req, item, ['refStore', 'refProduct', 'refShelf', 'type']);
	});*/
	res.status(204).send();
});

module.exports = router;
