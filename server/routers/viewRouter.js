const jwt = require('jsonwebtoken');
module.exports = function(app,ViewDB) { 

	app.post('/views/add', function(req, res) {
		ViewDB.insertOne({
	    	ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
	    }).then(insertResult => {
		    if(insertResult) { 
	        		res.status(200).send({ message: 'Haa' })
		    } else {
		      	res.status(400).send({ message: 'Database died' })
		    } 
		  })
		  .catch(err => console.error(err));
	});
};