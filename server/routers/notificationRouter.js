var ObjectID = require('mongodb').ObjectID; 

module.exports = function(app,NotiDB) { 
	app.post('/noti/update', function (req,res) {	
		NotiDB.findOneAndUpdate( {conversationId: req.body.conversationId,
		 	userId: req.body.userId  },
			{ $set:  {  "status" : "new",
			'content' : req.body.content,
			'demandId': req.body.demandId,
			'time' : req.body.time } }) 
  	 	.then(updateDocument => {
		    if(updateDocument.value) {
				console.log(`Successfully updated document that had the form: ${updateDocument.value}.`)
				req.session.userFullName  = updateDocument.value.name
				return res.status(200).send({"message":"OK done"})
		    } else {
		      	NotiDB.insertOne({
			    	'userId': req.body.userId,
				    'fromUserId': req.body.fromUserId,
				    'content' : req.body.content,
				    'time' : req.body.time,
				    'demandId': req.body.demandId,
				    'status': "new",
				    'conversationId' : req.body.conversationId
			    }).then(insertResult => {
					return res.status(200).send({"message":"OK done"})
		    	}).catch(err => next(err));
		    }
		}).catch(err => next(err));
	} );
	app.post('/noti/read/conversation', function (req,res) {	
		console.log(req.body)
		NotiDB.findOneAndUpdate( {
			demandId: req.body.demandId,
		 	userId: req.body.userId  },
			{ $set:  {  "status" : "read" } }) 
  	 	.then(updateDocument => {
		    if(updateDocument.value) {
				console.log(`Successfully updated document that had the form: ${updateDocument.value}.`)
				req.session.userFullName  = updateDocument.value.name
				return res.status(200).send({"message":"OK done"})
		    } else {
				return res.status(200).send({"message":"Notification not created yet"})
		    }
		}).catch(err => next(err));
	} );
	app.post('/noti/allnew',(req,res) => {
		NotiDB.find({status: "new", userId: req.body.userId}).sort({time:1}).limit(+req.body.limit).toArray()
		.then(notis => {
		    return res.status(200).send(notis)
		}).catch(err => next(err));
	})
};