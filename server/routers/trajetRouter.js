var ObjectID = require('mongodb').ObjectID;
const mailjet = require ('node-mailjet')
    .connect('021e06f469c299326722a20ef507e8cd', '7bc5d13eb94b270eb8b155c637068b6e')


module.exports = function(app,TrajetDB,storeDB,addressDB) {
	app.post('/trajet/create', function(req, res) {
		
		addressDB.findOne({_id: ObjectID(req.body.sltAddressId)})
  	 	.then(foundAddress => {
  	 		if (foundAddress){
		    	storeDB.findOne({_id: ObjectID(req.body.storeId)})
			  	.then(result => {
				    if(result) {
				      	try {
						    TrajetDB.insertOne( {
						    	name: req.session.userFullName ? req.session.userFullName : req.body.inpName,
						    	phone : req.body.inpPhone,
						    	timesOfDay: req.body.inpTimeOfDay,
						    	date : req.body.inpDate,
						    	address : foundAddress,
						    	brand : req.body.sltStoreBrand,
						    	store: result,
						    	time: Date.now(),
						    	uId: req.session.userId? ObjectID(req.session.userId) : "guest"
						    }).then(insertResult => {
						    	console.log(insertResult)
						    	res.redirect('/detailTrajet.html?id=' + insertResult.insertedId )
						  	})
						  	.catch(err => console.error("TrajetDB insertOne",err));
						} catch (error) {
				        	console.log(error)
				            return res.status(500).send(error);
						}
				    } else { 
			            return res.status(500).send("No document matches the provided query.");
				    } 
			  	})
			  	.catch(err => console.error(`Failed to find storeDB: ${err}`));  

  	 		} else {
  	 			res.status(400).send({"message":"AddressDB not found "})
  	 		}
	  	}).catch(err => console.error(`Failed to AddressDB findOne : ${err}`)) 
	});
	app.post('/trajet/createwithaddress', function(req, res) {
		var newAddress = {
	    	userId : req.session.userId? ObjectID(req.session.userId): null,
	    	line1 : req.body.inpAddress1, 
	    	line2 : req.body.inpAddress2,
	    	x : parseFloat(req.body.x),
	    	y : parseFloat(req.body.y),
	    	extra : req.body.inpExtra,
	    	phone : req.body.oldPhone? req.session.userPhone : req.body.inpPhoneAddr,
	    	postCode : req.body.inpPostCode,
	    	country : "FR", 
	    };
	    console.log(newAddress)
		addressDB.insertOne(newAddress).then(insertAddress => {
			console.log('AddressDB add success')
			newAddress._id = insertAddress.insertedId;
			storeDB.findOne({_id: ObjectID(req.body.storeId)})
		  	.then(result => {
			    if(result) {
			      	try {
					    TrajetDB.insertOne( { 
					    	timesOfDay: req.body.inpTimeOfDay,
					    	date : req.body.inpDate,
					    	address : newAddress, 
					    	store: result,
					    	time: Date.now(),
					    	uId: req.session.userId? ObjectID(req.session.userId) : "guest"
					    }).then(insertResult => {
					    	console.log(insertResult)
					    	res.redirect('/detailTrajet.html?id=' + insertResult.insertedId )
					  	})
					  	.catch(err => console.error("TrajetDB insertOne",err));
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
		.catch(err => console.error('AddressDB insertOne',err)); 

		
	});
	app.post('/trajet/delWthCode', function (req, res) { 
		console.log(req.body)
		TrajetDB.findOneAndDelete( {_id: ObjectID(req.body.id), code : req.body.code}) 
  	 	.then(deletedDocument => {
  	 		console.log(deletedDocument.value)
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
	
	app.post('/trajet/detail', function (req,res) {
		TrajetDB.findOne({_id: ObjectID(req.body.id)})
		  .then(result => {
		    if(result) { 
		    	return res.status(200).send(result)
		    } else { 
	            return res.status(500).send("No trajet matches the provided query.");
		    } 
		})
		.catch(err => console.error(`Failed to find document: ${err}`));
	} ); 
	app.post('/trajet/allAround', function (req, res) {
		console.log("trajet/allAround",req.body) 
		if (req.body.pcode !== undefined) {
			let postCodeRegex = new RegExp("^" + req.body.pcode.substring(0,2)) 
	  		TrajetDB.find({"store.code": postCodeRegex}).sort( { time: -1 } ).toArray()
		  	.then(result => {
			    if(result) { 
			        return res.send(result);
			    } else {
			      	return res.send([]);
			    }
		  	})
		  	.catch(err =>  res.status(500).send(err)); 
	  	} else {
		  	 return res.status(400).send({"message":"Postal code missing."});
	  	}
	});
	app.post('/trajet/sendCode', function (req,res) {
		TrajetDB.findOne({_id: ObjectID(req.body.id)})
		  .then(result => {
		    if(result) {  
				const request = mailjet
				    .post("send", {'version': 'v3.1'})
				    .request({
				        "Messages":[{
				            "From": {
				                "Email": "bonjourcourses.noreply@gmail.com",
				                "Name": "Bonjour, Courses - No reply"
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
	            return res.status(500).send("No trajet matches the provided query.");
		    } 
		})
		.catch(err => console.error(`Failed to find document: ${err}`));
	} );
};