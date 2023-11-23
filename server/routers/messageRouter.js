var ObjectID = require('mongodb').ObjectID;
let RainbowSDK = require("rainbow-node-sdk");

let options = {
    "rainbow": {
        "host": "sandbox"
    },
    "credentials": {
        "login": "cong-thuan.luong@al-enterprise.com", 
        "password": "6[e779)YYq<9"  
    }, 
    "application": {
        "appID": "76dbc140d4a011e9a94d7f03d54868e7",
        "appSecret": "gol2gKAx89jumFx17p1eMlcj6nhWlAlWazhmvxKECLDkHpdDWnYfu8N8MGVEvRcB"
    }, 
    "logs": {
        "enableConsoleLogs": false
    }, 
    "im": {
        "sendReadReceipt": false
    }
};

let rainbowSDK = new RainbowSDK(options);

rainbowSDK.start();

rainbowSDK.events.on('rainbow_onready', function() {
    console.log('done rainbow_onready')
});
rainbowSDK.events.on('rainbow_onerror', function(err) {
    console.log('rainbow_onerror', err)
});
module.exports = function(app,rbaccountDB) {  
	app.post('/rb/login', function(req, res) {
		rbaccountDB.findOne({userId: ObjectID(req.session.userId)})
	  	.then(account => {
            console.log(account)
		    if(account) {
	      	  	rainbowSDK.admin.askTokenOnBehalf(account.email, account.password).then((token) => {
			    	rbaccountDB.findOne({userId: ObjectID(req.body.toUserId)})
			    	.then(chatAccount => {
				    	delete token.loggedInApplication;
				    	delete token.loggedInUser;
				    	token.chatEmail = chatAccount.email
				    	return res.status(200).send(token); 
			    	}).catch((err) => {
						console.log(err)
			    		return res.status(400).send({'message':'error findOne'}); 
					});

				}).catch((err) => {
					console.log(err)
		    		return res.status(400).send({'message':'error askTokenOnBehalf'}); 
				});
		    } else {
	            //user supposed to be created in RB before
                console.error(`Err: ${account}`)
                return res.status(400).send({'message':'user supposed to be created in RB before    '}); 
		    } 
	  	})
	  	.catch(err =>{
        	console.log(`Failed to find rbaccountDB: ${err}`)
        	return res.status(400).send({'message':'rbaccountDB findOne'}); 
        });
	});
	app.post('/rb/create', (req,res) => {
		var email = req.session.userFullName + req.session.userPhone.substring(4,11) + "@al-enterprise.com"
        var firstname = req.session.userFullName  
        var lastname = "bjrC"
        rbaccountDB.insertOne( {
        	email: email,
        	password: "Default01*",
        	userId : ObjectID(req.session.userId)
        }).then(insertResult => {
        	rainbowSDK.admin.createUserInCompany(email, "Default01*", firstname, lastname).then((user) => { 
		    	return res.status(200).send(user); 
			}).catch((err) => {
				console.log(err)
		    	return res.status(400).send({'message':'error createUserInCompany'}); 
			});
        }).catch(err =>  {
        	console.error("rbaccountDB insertOne",err)
        	return res.status(400).send({'message':'rbaccountDB insertOne'}); 
        });
	})
};
