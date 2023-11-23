module.exports = function(app,contact) {
	app.post('/contact', function(req, res) {
		try {
		    contact.insertOne(req.body);
		    var text = `Je vous remercie beaucoup. <a href='https://bonjourcourses.fr/'>
            Click ici pour revenir a Bonjour, Course</a>` 
	        res.send(text);

		} catch (e) {
        	console.log(error)
            return res.status(500).send(error);
		}
		//https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port&postcode=80000&limit=1
	});
};