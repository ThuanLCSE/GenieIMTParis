const express = require('express');
const path = require('path');
var unless = require('express-unless');
// const config = require('./server/config.js')
var bodyParser = require('body-parser')
var session = require('express-session')
var cookieParser = require('cookie-parser');
const cors = require('cors'); 
const jwt = require('express-jwt');
const errorHandler = require('./server/services/error-handler');  

var app = express()
var static = express.static(path.join(__dirname, 'client'));
static.unless = unless;

app.use(static.unless({ method: 'OPTIONS' })); 
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
 
app.use(jwt({ 
  secret: 'secret string for me',
  algorithm: 'HS256',
  credentialsRequired: false,
  getToken: function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }})
.unless({
  path: [ 
      '/users/login',  
      '/demand/allAround',
      '/users/register', 
      new RegExp('/store.*/', 'i')  ,
      new RegExp('/trajet.*/', 'i')  ,
      new RegExp('/guest.*/', 'i')  
  ]
}))
// app.use('/users', require('./server/routers/usersController'));
app.use(errorHandler);

app.use(session({
  secret: 'ring is the best',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
})) 
app.get('/sessionalive', function(req, res) {
  req.session.userId ? res.status(200).send(req.session): res.status(400).send({'message':'sesison die'})
});
app.get('/sessionremove', function(req, res) {
  req.session.destroy();
  res.status(200).send({'message':'session all cleared'});
});

app.post('/guest/setAddress', function(req, res) { 
	req.session.address = req.body.address;
  req.session.codePostal = req.body.codePostal;
	req.session.telephone = req.body.telephone;
  console.log(req.session)
	res.status(200).send({'message':'done'});
});
 
 const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 3003;
 
app.listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`);

	const uri = "mongodb+srv://admin:root@cluster0-nvr3y.gcp.mongodb.net/test?retryWrites=true&w=majority";
	const client = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology : true});
	client.connect(err => {
    if(err) {
        throw err;
    }
    database = client.db('bjrcourses');
    store = database.collection("store");
    contactSiteMessage = database.collection("contactSiteMessage");
    demand = database.collection("demand");
    user = database.collection("user");
    credit = database.collection("credit");
    views = database.collection("views");
    trajets = database.collection("trajets");
    address = database.collection("address");
    rbaccountDB = database.collection("rbaccount");
    notificationDB = database.collection("notification");
    transactionDB = database.collection("transaction");
    finance = database.collection("finance");
    //transfer MongoDB to router
    console.log('connected to MongoDB Atlas')
    require('./server/routers/mailRouter.js')(app);
    require('./server/routers/messageRouter.js')(app,rbaccountDB);
    require('./server/routers/trajetRouter.js')(app,trajets,store,address);
    require('./server/routers/viewRouter.js')(app,views);
    require('./server/routers/userRouter.js')(app,user,credit,address);
    require('./server/routers/storeRouter.js')(app,store);
    require('./server/routers/contactRouter.js')(app,contactSiteMessage);
    require('./server/routers/demandRoute.js')(app,demand,store,address); 
    require('./server/routers/notificationRouter.js')(app,notificationDB); 
		require('./server/routers/transactionRouter.js')(app,transactionDB,credit,user,finance); 

		// client.close()
    });
}); 