const mailjet = require ('node-mailjet')
    .connect('021e06f469c299326722a20ef507e8cd', '7bc5d13eb94b270eb8b155c637068b6e')

module.exports = function(app) {
	var name = "Dove"
	var code ="1234"
	app.get('/mail/send', function(req, res) {
		const request = mailjet
	    .post("send", {'version': 'v3.1'})
	    .request({
	        "Messages":[{
	            "From": {
	                "Email": "bonjourcourses.noreply@gmail.com",
	                "Name": "Bonjour, Courses - No reply"
	            },
	            "To": [{
	                "Email": "thuanluong.aidev@gmail.com",
	                "Name": "thuanluong"
	            }],
	            "Subject": "Code de ta demande",
	            "TextPart": "Dear, ",
	            "HTMLPart": "<h3>C'est le code de ta demande </h3><br />" + code
	        }]
	    })
	request
	    .then((result) => {
	        console.log(result.body)
	        return res.status(200).send(result.body);
	    })
	    .catch((err) => {
	        console.log(err.statusCode)
	        return res.status(500).send(err);
	    })
	});
};