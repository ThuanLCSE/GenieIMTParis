module.exports = function(app,StoreDB) {
	app.post('/store/findStore', function(req, res) {
		if (req.body.pcode !== undefined) {
			let postCodeRegex = new RegExp("^" + req.body.pcode.substring(0,2))
	  		StoreDB.find({"code": postCodeRegex}).toArray((error, result) => {
		        if(error) {
		        	console.log(error)
		            return res.status(500).send(error);
		        } else 
		        	res.send(result);
		    })
			//https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port&postcode=80000&limit=1
		} else {
			return res.status(400).send({"message":"Postal code missing."});
		}
	}); 
	app.post('/store/addUnknow', function(req, res) {
		StoreDB.insertOne({
	    	code : req.body.pcode,
	    	address: req.body.inpStoreAdress,
	    	name: "unknow",
	    	brand: "unknow"
	    }, function(err,insertStore){ 
	    	if (err) {
	        	console.log(error)
	            return res.status(500).send(error);
	    	} else {
	    		req.session.storeId = insertStore.insertedId;
	  			res.send(insertStore);
	    	} 
		});  
	});
};