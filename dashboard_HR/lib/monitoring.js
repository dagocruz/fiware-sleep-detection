const moment = require('moment');

/* global SOCKET_IO */

function monitor(type, message, payload) {
	//SOCKET_IO.emit(type, moment().format('LTS') + ' - ' + message);

	if (payload && Object.keys(payload).length !== 0) {
		SOCKET_IO.emit('payload', payload);
	}
	//SOCKET_IO.emit(type,{date:moment().format('LTS'),message: message, payload:payload});
}

module.exports = monitor;
