const MongoClient = require('mongodb').MongoClient;
//mongodb+srv://thuan:nhocring@cluster0.qkatq1d.mongodb.net/?retryWrites=true&w=majority
const uri = "mongodb+srv://admin:root@cluster0-nvr3y.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology : true});
client.connect(err => {
  const collection = client.db("test").collection("devices");
 	console.log('DB COllection created')
  // perform actions on the collection object
	require('./models/store.js');
  client.close();
  
});