var ObjectID = require('mongodb').ObjectID;
const mailjet = require ('node-mailjet')
    .connect('e28ca7fcc9515cb6b0f3d6412ca17d37', '9a8043b3bb9267ffd50a69ccbc62fe17')
const braintree = require ('braintree')
function makeCode(length) {
   var result           = '';
   var characters       = '0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
} 
module.exports = function(app,demandDB,storeDB,addressDB) {
	
	app.post('/guest/toBuy', function(req, res) {
  		req.session.tobuys = req.body.tobuys   
  		return res.status(200).send({"message":"OK"})
	});
	app.get('/guest/toBuy', function(req, res) {
  		console.log(req.session)  
  		return res.status(200).send(req.session.tobuys?req.session.tobuys:null)
	});
  	
	app.post('/guest/buyWithCode', function(req, res) {
  		console.log(req.session)  
  		console.log(req.body.tobuys)
  		storeDB.findOne({_id: ObjectID(req.session.storeId)})
	  	.then(result => {
		    if(result) {
		      	try {
				    demandDB.insertOne({
				    	tobuys : req.body.tobuys,
				    	phone : req.session.telephone,
				    	address: req.session.address,
				    	code: req.body.code ? req.body.code : makeCode(4),
				    	email: req.body.email? req.body.email: req.session.email,
				    	name: req.body.name ? req.body.name :req.session.userFullName,
						store: result,
						userId : req.session.userId,
				    	paid: false,
				    	status: "waiting",
				    	sharing: "share",
				    	time: Date.now()
				    }, function(err,returnDemand){ 
				    	req.session.tobuys = []
				    	console.log("Insert succes "+ returnDemand.insertedId)
			        	res.send({id : returnDemand.insertedId});	
					});
				} catch (error) {
		        	console.log(error)
		            return res.status(500).send(error);
				}
		    } else { 
	            return res.status(500).send("No document matches the provided query.");
		    } 
	  	})
	  	.catch(err => console.error(`Failed to find document: ${err}`)); 
	});
	app.post('/demand/makeOrder', function(req, res) {
  		console.log(req.session)  
  		console.log(req.body.tobuys)  
  		addressDB.findOne({_id: ObjectID(req.body.addressId)})
	  	.then(foundAddress => {
	  		delete foundAddress.userId
			delete foundAddress.phone
	  		storeDB.findOne({_id: ObjectID(req.session.storeId)})
		  	.then(foundStore => {
			    if(foundStore) {
			      	try {
					    demandDB.insertOne({
					    	tobuys : req.body.tobuys,
					    	address: foundAddress, 
					    	email: req.session.email,
					    	name: req.session.userFullName,
					    	userId : req.session.userId,
					    	store: foundStore,
					    	paid: false,
					    	wishedDate: req.body.wishedDate, 
					    	sharing: req.body.sharing,
					    	code: makeCode(4),
					    	status: "waiting",
				    		time: Date.now()
					    }, function(err,returnDemand){ 
					    	req.session.tobuys = []
					    	console.log("Insert succes "+ returnDemand.insertedId)
				        	res.send({id : returnDemand.insertedId});	
						});
					} catch (error) {
			        	console.log(error)
			            return res.status(500).send(error);
					}
			    } else { 
		            return res.status(500).send("No document matches the provided query.");
			    } 
		  	})
		  	.catch(err => console.error(`Failed to find storeDB: ${err}`)); 
	  	})
	  	.catch(err => console.error(`Failed to find addressDB: ${err}`)); 
	});  
	
	app.post('/demand/setStore', function(req, res) {
	  	req.session.storeId = req.body.storeId;
	  	console.log(req.session)
	 	res.send({'message':"OK"});
	});  
	app.post('/guest/setPaid', function (req,res) {
		demandDB.updateOne(
		    { "_id" : ObjectID(req.body.id) }, // specifies the document to update
		    {
		      $set: {  "paid" : req.body.paid },
		      $currentDate: { "lastModified": true }
		    }
		)
		res.send('T es le meilleur');
	} );
	app.post('/demand/detail', function (req,res) {
		demandDB.findOne({_id: ObjectID(req.body.id)})
		  .then(result => {
		    if(result) { 
		    	return res.status(200).send(result)
		    } else { 
	            return res.status(400).send("No demand matches the provided query.");
		    } 
		})
		.catch(err => console.error(`Failed to find document: ${err}`));
	});
	app.post('/demand/update', function(req, res) {
		let fields = req.query.f.split(',')
		var newField = {}
		if (fields.includes("tobuys")) {
			newField.tobuys = req.body.tobuys
		} else if (fields.includes("sharing")) {
			newField.sharing = req.body.sharing
		}  
		console.log(newField)
		demandDB.findOneAndUpdate( {_id: ObjectID(req.body.id)},
			{ $set: newField }) 
  	 	.then(updateDocument => {
		    if(updateDocument.value) {
				console.log(`Successfully updated document that had the form: ${updateDocument.value}.`)
				return res.send(updateDocument.value)
		    } else {
		      	console.log("No document matches the provided query.")
				return res.status(500).send({"mess":"No document matches the provided query"})
		    }
	  	}).catch(err => console.error(`Failed to UserDB findOneAndUpdate : ${err}`))
 
	});
	app.post('/guest/demand/allAround', function (req, res) {
		console.log(req.body) 
		if (req.body.pcode !== undefined) {
			let postCodeRegex = new RegExp("^" + req.body.pcode.substring(0,2))
	  		demandDB.find({"store.code": postCodeRegex, status: "waiting", sharing: "share"}).sort( { time: -1 } ).toArray()
		  	.then(result => { 
		        return res.send(result);
		  	})
		  	.catch(err => console.error(`Failed to find document: ${err}`)); 
		  } else {
		  	 return res.status(400).send({"message":"Postal code missing."});
		  }
	});
	app.post('/guest/demand/matchTrajet', function (req, res) {
		console.log(req.body.address) 
		var round  = 0.004
  		demandDB.find({ "address.x": {$gt : req.body.address.x - round, $lt : req.body.address.x + round},
	  		"address.y": {$gt : req.body.address.y - round, $lt : req.body.address.y + round},
	  		status: "waiting", sharing: "share"}).sort( { time: -1 } ).toArray()
	  	.then(result => { 
	        return res.send(result);
	  	})
	  	.catch(err => console.error(`Failed to find document: ${err}`)); 
		  
	});

	app.post('/demand/delWthCode', function (req, res) { 
		demandDB.findOneAndDelete( {_id: ObjectID(req.body.id), code : req.body.code}) 
	  	 .then(deletedDocument => {
		    if(deletedDocument.value) {
				console.log(`Successfully deleted document that had the form: ${deletedDocument.value}.`)
				return res.status(200).send("OK removed")
		    } else {
		      	console.log("No document matches the provided query.")
				return res.status(500).send("No document matches the provided query")
		    }
		  })
		  .catch(err => console.error(`Failed to find and delete document: ${err}`))
	});
	app.post('/demand/setDone', function (req, res) {  
		if (req.body.code.length === 4){
			demandDB.findOneAndUpdate( {_id: ObjectID(req.body.id), code : req.body.code},
				{ $set: { status: "done" } }) 
		  	 .then(updatedDoc => { 
			    if(updatedDoc.value) {
					console.log(`Successfully updated document that had the form: ${updatedDoc.value}.`)
					return res.status(200).send("OK done")
			    } else { 
					return res.status(400).send("No document matches the provided query")
			    }
			  })
			  .catch(err => console.error(`Failed to find and delete document: ${err}`))
		} else {
			demandDB.findOneAndUpdate( {_id: ObjectID(req.body.id), userId : req.session.userId},
				{ $set: { status: "done" } }) 
		  	 .then(updatedDoc => { 
			    if(updatedDoc.value) {
					console.log(`Successfully updated document that had the form: ${updatedDoc.value}.`)
					return res.status(200).send("OK done")
			    } else { 
					return res.status(400).send("No document matches the provided query")
			    }
			  })
			  .catch(err => console.error(`Failed to find and delete document: ${err}`))
		}
	});
	app.post('/demand/findpcsingorder', function (req,res){ 
		demandDB.findOne({ 
			$or: [ 
				{ shopperId: req.session.userId, userId  : req.body.userId }, 
				{ shopperId: req.body.userId, userId  : req.session.userId } ] , 
			status: "processing"
		}).then(result => {
		    if(result) { 
		    	return res.status(200).send(result)
		    } else { 
	            return res.status(400).send("No demand matches the provided query.");
		    } 
		})
		.catch(err => console.error(`Failed to find document: ${err}`));
	})
	app.post('/demand/process', function (req, res) { 
		if (req.body.demandId) {
			demandDB.findOneAndUpdate( {_id: ObjectID(req.body.demandId), userId: { $ne: req.session.userId }},
				{ $set: { status: "processing",
				shopperId : req.session.userId,
				shopperName : req.session.userFullName,
				time: Date.now() } }) 
	  		.then(updatedDoc => { 
			    if(updatedDoc.value) {
					console.log(`Successfully updated demandDB that had the form: ${updatedDoc.value}.`)  
					return res.status(200).send(updatedDoc.value)
			    } else {
			      	console.log("No demandDB matches the provided query.")
					return res.status(400).send("No demandDB matches the provided query")
			    }
			  }).catch(err => console.error(`Failed to find document: ${err}`))
		} else {
			return res.status(400).send("No Id found")
		} 
	});
	app.post('/demand/valid', function (req, res) { 
		if (req.session.userId && req.body.demandId && req.body.code) {
			demandDB.findOneAndUpdate( {_id: ObjectID(req.body.demandId), code: req.body.code},
				{ $set: { status: "done", 
				time: Date.now() } }) 
	  		.then(updatedDoc => { 
			    if(updatedDoc.value) {
					console.log(`Successfully updated demandDB that had the form: ${updatedDoc.value}.`)
					return res.status(200).send(updatedDoc.value)
			    } else {
			      	console.log("No demandDB matches the provided query.")
					return res.status(400).send("No demandDB matches the provided query")
			    }
			  }).catch(err => console.error(`Failed to find and delete document: ${err}`))
		} else {
			return res.status(400).send("Body missing")
		} 
	});


	app.post('/demand/sendCode', function (req,res) {
		demandDB.findOne({_id: ObjectID(req.body.id)})
		  .then(result => {
		    if(result) {  
				const request = mailjet
				    .post("send", {'version': 'v3.1'})
				    .request({
				        "Messages":[{
				            "From": {
				                "Email": "contact@bonjourcourses.fr",
				                "Name": "Bonjour, Courses"
				            },
				            "To": [{
				                "Email": result.email,
				                "Name": "client"
				            }],
				            "Subject": "Ton code de securite",
				            "TextPart": "Dear " + result.name,
				            "HTMLPart": "<h3>Ton code : </h3><br />" + result.code
				        }]
				    })
				request
				    .then((mailResult) => {
				        console.log(mailResult.body)
				        return res.status(200).send(result.email);
				    })
				    .catch((err) => {
				        console.log(err.statusCode)
				        return res.status(500).send(err);
				    }) 
		    } else { 
	            return res.status(500).send("No demand matches the provided query.");
		    } 
		})
		.catch(err => console.error(`Failed to find document: ${err}`));
	} );
	app.get('/demand/allme', function (req, res) { 
  		demandDB.find({"userId": req.session.userId}).sort( { time: -1 } ).toArray()
	  	.then(result => { 
	        return res.send(result);
	  	})
	  	.catch(err => console.error(`Failed to find document: ${err}`)); 
   
	}); 

	app.get('/demand/process/me', function (req, res) { 
  		demandDB.find({ 
			$or: [ 
				{ "shopperId": req.session.userId}, 
				{ userId: req.session.userId, status  : { $ne: "waiting" } } ]
		}).sort( { time: -1 } ).toArray()
	  	.then(result => { 
	        return res.send(result);
	  	})
	  	.catch(err => console.error(`Failed to find document: ${err}`)); 
	}); 

	app.get('/demand/allshopped', function (req, res) { 
  		demandDB.find({"shopperId": req.session.userId}).sort( { time: -1 } ).toArray()
	  	.then(result => { 
	        return res.send(result);
	  	})
	  	.catch(err => console.error(`Failed to find document: ${err}`)); 
   
	}); 
	app.get("/client_token", function (req, res) {
		var gateway = braintree.connect({
		  accessToken: 'access_token$production$km7tg7wvt93342wm$f6769db58ec61fd08fba8998047a6526'
		});
	  gateway.clientToken.generate({}, function (err, response) {
	    res.send(response.clientToken);
	  });
	});  
	/*app.get("/credit", function (req, res) {
		
		gateway.transaction.credit({
		  paymentMethodToken: "aToken",
		  amount: "100.00"
		}, function (err, result) {
		});
	});*/
};