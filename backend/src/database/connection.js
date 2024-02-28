const { set, connect } = require('mongoose');

set('strictQuery', true);

connect(process.env.DB_URL)
	.then(() => console.log('[DATABASE] Connected to Mongo...'))
	.catch(error => console.error(error));
