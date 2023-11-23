const jwt = require('jsonwebtoken');
var ObjectID = require('mongodb').ObjectID;
var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = function(app,UserDB,CreditDB,AddressDB) {
	app.post('/users/login',function (req, res) {
    	UserDB.findOne({phone: req.body.phone})
    	.then(foundUser => {
    		bcrypt.compare(req.body.password, foundUser.password, function (err, result) {
		        if (result == true) {
			        var userData = { 
		        		'id' : foundUser._id
		        	} 
			    	jwt.sign({ phone: req.body.username }, 'secret string for me', { algorithm: 'HS256'}, function(err, token) { 
			        	req.session.token = token; 
			        	req.session.userId = foundUser._id
			        	req.session.email = req.body.email
			        	req.session.userFullName  = foundUser.name
			        	req.session.userPhone = foundUser.phone
		            	console.log(req.session)
			        	res.send({ 'token': token, 
			        		'user' : userData
				        })
					}); 
		        } else {
			        console.log(req.body)
		    		res.status(400).send({ message: 'Username or password is incorrect' })
		        }
	      	}); 
		})
        .catch(err => res.status(400).send(err));
	});

	app.post('/users/register', function(req, res) {
		UserDB.findOne( { $or: [ { email: req.body.email }, { phone: req.body.phone } ] } )
		.then(foundUser => {
	        console.log(foundUser)
    		if (foundUser === null) {
		     	//not found continue
		     	bcrypt.hash(req.body.password, saltRounds, function (err,   hash) { 
			 		if (err) return res.status(400).send({ message: 'encrypt die', err: err })
		 			else {
						UserDB.insertOne({
					    	phone : req.body.phone,
					    	password : hash, 
					    	email : req.body.email,
					    	name: req.body.name,
					    	transactionCurrent : 0,
					    	transactionTotal : 0
					    }).then(insertResult => {
						    if(insertResult) {
						    	//init credit store DB
						    	CreditDB.insertOne({
							    	userId : insertResult.insertedId,
							    	amount : 15.0, 
							    	currency : "EUR"
							    }).then(insertResult => {
						    		console.log('CreditDB success')
						    	})
								.catch(err => console.error('CreditDB',err));
						    	console.log(insertResult)
						    	var userData = { 
					        		'id' : insertResult.insertedId
					        	} 
						    	jwt.sign({ phone: req.body.phone }, 'secret string for me', { algorithm: 'HS256'}, function(err, token) { 
						        	req.session.token = token;
						        	req.session.userPhone = req.body.phone
						        	req.session.email = req.body.email
						        	req.session.userId = insertResult.insertedId
						        	res.send({ 'token': token, 
						        		'user' : userData
							        })
								}); 
						    } else {
						      	res.status(400).send({ message: 'UserDB.insertOne died' })
						    } 
						}).catch(err => console.error('UserDB.insertOne',err));
					}
				}); 
    		} else if (foundUser.email === req.body.email) {
	    		res.status(400).send({ message: 'Email_exist' })
    		} else  if (foundUser.phone === req.body.phone) {
		    	res.status(400).send({ message: 'Phone_exist' })
    		} 
		})
		.catch(err => res.status(400).send(err))
	});
	app.post('/users/update', function(req, res) {
		let fields = req.query.f.split(',')
		var newField = {}
		if (fields.includes("name")) {
			newField.name = req.body.name
		} else if (fields.includes("password")) {
			newField.password = req.body.password
		} else if (fields.includes("email")) {
			newField.email = req.body.email
		} else if (fields.includes("phone")) {
			newField.phone = req.body.phone
		}  
		console.log(newField)
		UserDB.findOneAndUpdate( {_id: ObjectID(req.body.id)},
			{ $set: newField }) 
  	 	.then(updateDocument => {
	  	 	console.log(updateDocument)
		    if(updateDocument.value) {
				console.log(`Successfully updated document that had the form: ${updateDocument.value}.`)
				req.session.userFullName  = updateDocument.value.name
				return res.status(200).send("OK done")
		    } else {
		      	console.log("No document matches the provided query.")
				return res.status(500).send("No document matches the provided query")
		    }
	  	}).catch(err => console.error(`Failed to UserDB findOneAndUpdate : ${err}`))
 
	});
	//consult amount of creadit
	app.post('/users/getcredit', function(req, res) { 
		CreditDB.findOne({userId: ObjectID(req.body.id)})
  	 	.then(result => {
  	 		if (result){
		    	res.status(200).send({ 
		    		"a" : result.amount,
		    		"c" :result.currency
		    	})
  	 		} else {
  	 			res.status(400).send({ message: 'Credit not found' })
  	 		}
	  	}).catch(err => console.error(`Failed to CreditDB findOne : ${err}`))
	});
	//consult saved address of userId
	app.get('/users/getaddress', function(req, res) {
		var userId = req.params.uid? req.params.uid: req.session.userId
		console.log(userId)
		AddressDB.find({userId: ObjectID(userId)}).toArray()
  	 	.then(result => {
  	 		if (result){
		    	res.status(200).send(result)
  	 		} else {
  	 			res.status(200).send([])
  	 		}
	  	}).catch(err => console.error(`Failed to AddressDB findOne : ${err}`))
	});
	//consult saved address of userId
	app.get('/users/get', function(req, res) {
		if (req.session.userId == null) {
			res.status(400).send({ message: 'Unauthorized' })
		} else {  
			UserDB.findOne({_id: ObjectID(req.session.userId)})
	  	 	.then(result => {
	  	 		if (result){
			    	res.status(200).send(result)
	  	 		} else {
	  	 			res.status(200).send({})
	  	 		}
		  	}).catch(err => console.error(`Failed to AddressDB findOne : ${err}`))
		}
	
	});
	//consult saved address of user
	app.post('/users/addaddress', function(req, res) { 
		console.log(req.session)
		if (req.session.userId) {
			//by default of 1st Phase, country is  France
			AddressDB.insertOne({
		    	userId : ObjectID(req.session.userId),
		    	line1 : req.body.line1, 
		    	line2 : req.body.line2,
		    	x : parseFloat(req.body.x),
		    	y : parseFloat(req.body.y),
		    	extra : req.body.extra,
		    	phone : req.body.newPhone? req.session.userPhone : req.body.phone,
		    	postCode : req.body.postCode,
		    	country : "FR", 
		    }).then(insertResult => {
				console.log('AddressDB add success')
				res.status(200).send( { ...req.body, 
					"id" : insertResult.insertedId} )
			})
			.catch(err => console.error('AddressDB insertOne',err)); 
		} else {
			res.status(400).send( { "message":" user session not valid "} )
		} 
	});
	app.post('/guest/checkEmailPhone', (req, res) => {
		UserDB.findOne( { $or: [ { email: req.body.email }, { phone: req.body.phone } ] } )
		.then(foundUser => {
			        console.log(foundUser)
    		if (foundUser.email === req.body.email) {
	    		res.status(400).send({ message: 'Email_exist' })
    		} else  if (foundUser.phone === req.body.phone) {
		    	res.status(400).send({ message: 'Phone_exist' })
    		} else {
		    	res.status(200).send({ message: 'OK' })
    		}
		})
		.catch(err => res.status(400).send(err))
	})
}