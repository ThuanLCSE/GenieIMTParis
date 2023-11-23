const jwt = require('jsonwebtoken');
var ObjectID = require('mongodb').ObjectID; 

module.exports = function(app,TransactionDB,CreditDB,UserDB,FinanceDB) { 

	app.post('/trans/add', function(req, res) {
		TransactionDB.insertOne({
	    	userId : ObjectID(req.body.userId),
	    	amount : req.body.amount,
	    	time : req.body.time,
	    	description: req.body.description
	    }).then(insertResult => {
		    if(insertResult) { 
        		CreditDB.findOneAndUpdate( {userId: ObjectID(req.body.userId)},
					{ $inc: {"amount": +req.body.amount } }) 
		  	 	.then(updateDocument => {
			  	 	console.log(updateDocument)
				    if(updateDocument.value) {
						console.log(`Successfully updated CreditDB that had the form: ${updateDocument.value}.`)
						req.session.userFullName  = updateDocument.value.name
						return res.status(200).send({
							a : updateDocument.value.amount,
							c: updateDocument.value.currency
						})
				    } else {
				      	console.log("No CreditDB matches the provided query.")
						return res.status(500).send("No CreditDB matches the provided query")
				    }
			  	}).catch(err => res.status(500).send(err))
		    } else {
		      	res.status(500).send({ message: 'TransactionDB died, insertResult null' })
		    } 
		  })
		  .catch(err => res.status(500).send(err));
	});
	app.post('/trans/bank', function(req, res) {
		UserDB.findOne({phone: req.body.phone, password: req.body.password})
    	.then(foundUser => {
		 	if (foundUser) {
				TransactionDB.insertOne({
			    	userId : ObjectID(req.body.userId),
			    	amount : req.body.amount,
			    	time : req.body.time,
			    	description: req.body.description
			    }).then(insertResult => {
				    if(insertResult) { 
		        		CreditDB.findOneAndUpdate( {userId: ObjectID(req.body.userId)},
							{ $inc: {"amount": +req.body.amount } }) 
				  	 	.then(updateDocument => {
					  	 	console.log(updateDocument)
						    if(updateDocument.value) {
						    	FinanceDB.insertOne({
							    	userId : ObjectID(req.body.userId),
							    	amount : req.body.amount,
							    	time : req.body.time,
							    	rib: req.body.rib
							    }).
								console.log(`Successfully updated CreditDB that had the form: ${updateDocument.value}.`)
								req.session.userFullName  = updateDocument.value.name
								return res.status(200).send({
									a : updateDocument.value.amount,
									c: updateDocument.value.currency
								})
						    } else {
						      	console.log("No CreditDB matches the provided query.")
								return res.status(500).send("No CreditDB matches the provided query")
						    }
					  	}).catch(err => res.status(500).send(err))
				    } else {
				      	res.status(500).send({ message: 'TransactionDB died, insertResult null' })
				    } 
				})
				.catch(err => res.status(500).send(err));
		 		
		 	} else {
		 		res.status(400).send({ message: 'password not match' })
		 	}
		})

	});
};